import qs from 'qs'
import getJson from '../lib/getJson'

const OPENWEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/forecast'
const OPENWEATHER_APP_ID = 'b1b15e88fa797225412429c1c50c122a1'

export default new class ForecastService {
  buildUrl(cityName, countryCode) {
    const query = qs.stringify({
      q: `${cityName},${countryCode}`,
      appId: OPENWEATHER_APP_ID
    })

    return `${OPENWEATHER_API_URL}?${query}`
  }

  /**
   * @param {String} cityName City name. Ex: London
   * @param {String} countryCode ISO county code (2 letters). Ex: US
   * @return {Array} Forecast list for 5 days by 3 hours
   */
  async getForecast(cityName, countryCode) {
    const json = await getJson(this.buildUrl(cityName, countryCode))
    const { list, cod } = json

    if (cod !== '200') {
      throw new Error('bad response')
    }

    return list
      .reduce(
        (acc, el) => {
          return [...acc, el]
        },
        []
      )
  }
}
