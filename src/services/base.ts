import { API_PREFIX } from "@/app/constant";
import { asyncRunSafe } from "@/utils/request";
import { removeAccessToken } from "@/utils/token";
import { refreshAccessTokenOrRelogin } from "./refresh-token";

const TIME_OUT = 100000

const ContentType = {
  json: 'application/json',
  stream: 'text/event-stream',
  audio: 'audio/mpeg',
  form: 'application/x-www-form-urlencoded; charset=UTF-8',
  download: 'application/octet-stream', // for download
  upload: 'multipart/form-data', // for upload
}

const baseOptions = {
  method: 'GET',
  mode: 'cors',
  credentials: 'include',
  headers: new Headers({
    'Content-Type': ContentType.json,
  }),
  redirect: 'follow',
}

export type IOtherOptions = {
  isPublicAPI?: boolean;
  bodyStringify?: boolean;
  needAllResponseContent?: boolean;
  deleteContentType?: boolean;
  silent?: boolean;

  getAbortController?: (abortController: AbortController) => void;
}

type FetchOptionType = Omit<RequestInit, 'body'> & {
  params?: Record<string, any>
  body?: BodyInit | Record<string, any> | null
}

type ResponseError = {
  code: string,
  message: string,
  status: number,
}

function requiredWebSSOLogin() {
  globalThis.location.href = `/webapp-signin?redirect_url=${globalThis.location.pathname}`
}

const getAccessToken = (isPublicAPI?: boolean) => {
  if (isPublicAPI) {
    const sharedToken = globalThis.location.pathname.split('/').slice(-1)[0]
    const accessToken = localStorage.getItem('token') || JSON.stringify({
      [sharedToken]: '',})
    let accessTokenJson = { [sharedToken]: '' }
    try {
      accessTokenJson = JSON.parse(accessToken)
    } catch (error) {
      console.error(error)
    }
    return accessTokenJson[sharedToken]
  } else {
    return localStorage.getItem('console_token') || ''
  }
}

const baseFetch = async<T = any>(
  url: string, 
  fetchOptions: FetchOptionType,
  {
    isPublicAPI = false,
    bodyStringify = true,
    needAllResponseContent,
    deleteContentType,
    getAbortController,
    silent,
  }: IOtherOptions,
): Promise<T> => {
  const options: typeof baseOptions & FetchOptionType = Object.assign({}, baseOptions, fetchOptions)
  if (getAbortController) {
    const abortController = new AbortController()
    getAbortController(abortController)
    options.signal = abortController.signal
  }
  const accessToken = getAccessToken()
  options.headers.set('Authorization', `Bearer ${accessToken}`)

  if (deleteContentType) {
    options.headers.delete('Content-Type')
  } else {
    const contentType = options.headers.get('Content-Type')
    if (!contentType) {
      options.headers.set('Content-Type', ContentType.json)
    }
  }

  const urlPrefix = API_PREFIX
  let urlWithPrefix = (url.startsWith('http://') || url.startsWith('https://')) ? url : `${urlPrefix}${url.startsWith('/') ? url : `/${url}`}`

  const { method, body, params } = options
  // handle query
  if (method === 'GET' && params) {
    const paramsArray: string[] = []
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined) {
        paramsArray.push(`${key}=${encodeURIComponent(params[key])}`)
      }
    })
    if (urlWithPrefix.search(/\?/) === -1) {
      urlWithPrefix += `?${paramsArray.join('&')}`
    } else {
      urlWithPrefix += `&${paramsArray.join('&')}`
    }

    delete options.params
  }

  if (bodyStringify && body) {
    options.body = JSON.stringify(body)
  }

  // handle timeout
  return Promise.race([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('request timeout'))
      }, TIME_OUT)
    }),
    new Promise((resolve, reject) => {
      globalThis.fetch(urlWithPrefix, options as RequestInit)
        .then((res) => {
          const resClone = res.clone()
          // error handler
          if (!/^(2|3)\d{2}$/.test(res.status.toString())) {
            const bodyJson = res.json()
            switch (res.status) {
              case 401:
                return Promise.reject(resClone)
              case 403:
                bodyJson.then((data: ResponseError) => {
                  if (!silent) {
                    // Toast.notify({ type: 'error', message: data.message })
                    console.error(data)
                  }
                  if (data.code === 'already_setup') {
                    globalThis.location.href = `${globalThis.location.origin}/signin`
                  }
                })
                break
              // fall through
              default:
                bodyJson.then((data: ResponseError) => {
                  if (!silent) {
                    // Toast.notify({ type: 'error', message: data.message })
                    console.error(data)
                  }
                })
            }
            return Promise.reject(resClone)
          }
          // handle delete api. Delete api not return content.
          if (res.status === 204) {
            resolve({ result: 'success' })
            return
          }
          // return data
          if (options.headers.get('Content-Type') === ContentType.download || options.headers.get('Content-Type') === ContentType.audio) {
            resolve(needAllResponseContent ? resClone : res.blob())
          } else {
            resolve(needAllResponseContent ? resClone : res.json())
          }
        })
        .catch((err) => {
          if (!silent) {
            // Toast.notify({ type: 'error', message: err })
            console.error(err)
          }
          reject(err)
        })
    })
  ]) as Promise<T>
}

export const request = async<T=any>(url: string, options = {}, otherOptions?: IOtherOptions) => {
  try {
    const otherOptionsForBaseFetch = otherOptions || {};
    const [err, resp] = await asyncRunSafe<T>(baseFetch(url, options, otherOptionsForBaseFetch))
    if (err === null) {
      return resp
    }
    const errResp: Response = err as any
    if (errResp.status === 401) {
      const [parseErr, errRespData] = await asyncRunSafe<ResponseError>(errResp.json())
      const loginUrl = `${globalThis.location.origin}/signin`
      if (parseErr) {
        globalThis.location.href = loginUrl
        return Promise.reject(err)
      }
      // special code
      const {code, message} = errRespData
      // webapp sso
      if (code === 'web_sso_auth_required') {
        requiredWebSSOLogin()
        return Promise.reject(err)
      }
      if (code === 'unauthorized_and_force_logout') {
        localStorage.removeItem('console_token')
        localStorage.removeItem('refresh_token')
        globalThis.location.reload()
        return Promise.reject(err)
      }
      const {
        isPublicAPI = false,
        silent,
      } = otherOptionsForBaseFetch
      if (isPublicAPI && code === 'unauthorized') {
        removeAccessToken()
        globalThis.location.reload()
        return Promise.reject(err)
      }
      // if (code === 'init_validate_failed' && IS_CE_EDITION && !silent) {
      //   Toast.notify({ type: 'error', message, duration: 4000 })
      //   return Promise.reject(err)
      // }
      // if (code === 'not_init_validated' && IS_CE_EDITION) {
      //   globalThis.location.href = `${globalThis.location.origin}/init`
      //   return Promise.reject(err)
      // }
      // if (code === 'not_setup' && IS_CE_EDITION) {
      //   globalThis.location.href = `${globalThis.location.origin}/install`
      //   return Promise.reject(err)
      // }
      // refresh token
      const [refreshErr] = await asyncRunSafe(refreshAccessTokenOrRelogin(TIME_OUT))
      if (refreshErr === null)
        return baseFetch<T>(url, options, otherOptionsForBaseFetch)
      if (location.pathname !== '/signin') {
        globalThis.location.href = loginUrl
        return Promise.reject(err)
      }
      if (!silent) {
        // Toast.notify({ type: 'error', message })
        return Promise.reject(err)
      }
      globalThis.location.href = loginUrl
      return Promise.reject(err)
    }
    return Promise.reject(err)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

// request methods
export const get = <T = any>(url: string, options = {}, otherOptions?: IOtherOptions) => {
  return request<T>(url, Object.assign({}, options, { method: 'GET' }), otherOptions)
}

// For public API
export const getPublic = <T = any>(url: string, options = {}, otherOptions?: IOtherOptions) => {
  return get<T>(url, options, { ...otherOptions, isPublicAPI: true })
}

export const post = <T = any>(url: string, options = {}, otherOptions?: IOtherOptions) => {
  return request<T>(url, Object.assign({}, options, { method: 'POST' }), otherOptions)
}

// For public API
export const postPublic = <T = any>(url: string, options = {}, otherOptions?: IOtherOptions) => {
  return post<T>(url, options, { ...otherOptions, isPublicAPI: true })
}

export const put = <T = any>(url: string, options = {}, otherOptions?: IOtherOptions) => {
  return request<T>(url, Object.assign({}, options, { method: 'PUT' }), otherOptions)
}

export const putPublic = <T = any>(url: string, options = {}, otherOptions?: IOtherOptions) => {
  return put<T>(url, options, { ...otherOptions, isPublicAPI: true })
}

export const del = <T = any>(url: string, options = {}, otherOptions?: IOtherOptions) => {
  return request<T>(url, Object.assign({}, options, { method: 'DELETE' }), otherOptions)
}

export const delPublic = <T = any>(url: string, options = {}, otherOptions?: IOtherOptions) => {
  return del<T>(url, options, { ...otherOptions, isPublicAPI: true })
}

export const patch = <T = any>(url: string, options = {}, otherOptions?: IOtherOptions) => {
  return request<T>(url, Object.assign({}, options, { method: 'PATCH' }), otherOptions)
}

export const patchPublic = <T = any>(url: string, options = {}, otherOptions?: IOtherOptions) => {
  return patch<T>(url, options, { ...otherOptions, isPublicAPI: true })
}
