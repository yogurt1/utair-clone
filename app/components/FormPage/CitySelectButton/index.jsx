import * as React from 'react'
import * as PropTypes from 'prop-types'
import { computed, action, observable } from 'mobx'
import { observer } from 'mobx-react'
import { Gateway } from 'react-gateway'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import CityList, { cityShape } from './CityList'
import CityService from '../../../services/CityService'

@observer
export default class CitySelectButton extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    city: cityShape
  }

  @observable showSearch = false
  @observable cities = []
  @observable city = this.props.city

  @computed get cityName() {
    return this.city
      ? this.city.name
      : void 0
  }

  async componentDidMount() {
    if (this.city) {
      this.cities = await CityService.getCities(this.city)
    }
  }

  @action handleCityNameChange = async (ev) => {
    const keyword = ev.target.value
    this.cities = await CityService.getCities(keyword)
  }

  @action handleSearchButtonClick = () => {
    this.showSearch = true
  }

  @action handleCitySelect = async (city) => {
    this.showSearch = false
    this.city = city
    this.props.onSelect(city)
  }

  renderSearch() {
    return (
      <div>
        <Gateway into='global'>
          <div>
            <TextField
              onChange={this.handleCityNameChange}
              placeholder={this.cityName || 'Search...'}
            />
            <Divider />
            {/*<CityList cities={this.cities} onSelect={this.handleCitySelect} />*/}
          </div>
        </Gateway>
      </div>
    )
  }

  renderButton() {
    const { city } = this
    return (
      <FlatButton
        onTouchTap={this.handleSearchButtonClick}>
        {city ? city.name : 'Pick a city'}
      </FlatButton>
    )
  }

  render() {
    return this.showSearch
      ? this.renderSearch()
      : this.renderButton()
  }
}
