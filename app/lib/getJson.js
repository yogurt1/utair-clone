class HttpError extends Error {
  /**
   * Creates an intance of HttpError from response object
   *
   * @static
   * @param {Response} response
   * @returns {HttpError}
   *
   * @memberOf HttpError
   */
  static fromResponse(response) {
    return new this(response.status, response.statusText)
  }

  /**
   * Creates an instance of HttpError.
   * @param {Number} status
   * @param {String} statusText
   *
   * @memberOf HttpError
   */
  constructor(status, statusText) {
    super(statusText)
    this.status = status
    Error.captureStackTrace(this)
  }
}

/**
 * Fetch API wrapper
 * @param {String} url
 * @param {Object} [customHeaders]
 * @return {Object} JSON object
 * @throws {HttpError} HTTP Error
 */
const getJson = async (url, customHeaders) => {
  const headers = new Headers()
  headers.append('Access-Control-Allow-Origin', '*')
  headers.append('Accept', 'application/json')

  if (typeof customHeaders === 'object') {
    Object.entires(customHeaders)
      .map(([name, value]) => {
        headers.append(name, value)
      })
  }

  const request = new Request(url, {
    headers,
    mode: 'no-cors',
    method: 'GET'
  })

  const response = await fetch(request)

  if (!response.ok) {
    throw HttpError.fromResponse(response)
  }

  const json = await response.json()
  return json
}

export default getJson
