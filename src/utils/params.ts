
const combineParams = (url: string, params: Record<string, string>) => {
  const queryString = '?' + Object.entries(params)
      .filter(([key, value]) => key != null && value !== null && value !== undefined) // Filter out null/undefined values
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`) // Encode key-value pairs
      .join('&');  // Join with &
  const fullUrl = url + queryString;
  return fullUrl;
}

export default combineParams;