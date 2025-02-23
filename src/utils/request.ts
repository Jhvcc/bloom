
export async function asyncRunSafe<T>(fn: Promise<T>): Promise<[Error] | [null, T]> {
  try {
    return [null, await fn]
  } catch (error: unknown) {
    if (error instanceof Error) {
      return [error]
    }
    return [new Error("unknown error")]
  }
}

export async function fetchWithRetry<T>(fn: Promise<T>, retries = 3): Promise<[Error] | [null, T]> {
  const [error, res] = await asyncRunSafe(fn)
  if (error) {
    if (retries > 0) {
      const res = await fetchWithRetry(fn, retries - 1)
      return res
    }
    else {
      if (error instanceof Error)
        return [error]
      return [new Error('unknown error')]
    }
  }
  else {
    return [null, res]
  }
}
