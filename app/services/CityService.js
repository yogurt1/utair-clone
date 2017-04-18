import qs from 'qs'
import getJson from '../lib/getJson'

const MEETUP_API_URL = 'http://api.meetup.com/2'
// const MEETUP_APP_ID = 'b1b15e88fa797225412429c1c50c122a1'

export default new class CityService {
  buildCitiesUrl(keyword) {
    const query = qs.stringify({
      query: keyword
    })

    return `${MEETUP_API_URL}/cities?${query}`
  }

  /**
   * @param {String} from From
   * @param {String} to To
   * @return {Object} data
   */
  async findFly(from, to) {
    const json = await getJson(this.buildUrl(from, to))

    return json
  }

  /**
   * @param {String} [keyword=''] Keyword to find
   * @return {Array} List of cities
   */
  async getCities(keyword = '') {
    const json = await getJson(this.buildCitiesUrl(keyword))
    const { results: cities } = json

    if (!cities) {
      throw new Error('no results')
    }

    debugger

    return cities
  }
}
