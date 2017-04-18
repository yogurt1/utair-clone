import * as React from 'react'
import * as R from 'ramda'
import * as PropTypes from 'prop-types'
import { List, ListItem } from 'material-ui/List'

const SECONDARY_TEXT = 'Все аэропорты'
export const cityShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired
})

const CityItem = ({ city }) => (
  <ListItem
    primaryText={city.name}
    secondaryText={SECONDARY_TEXT}
  />
)

CityItem.propTypes = {
  city: cityShape.isRequired,
  onSelect: PropTypes.func.isRequired
}

const renderCity = R.curry(
  (onSelect, city) => (
    <CityItem
      key={city.id}
      city={city}
      onTouchTap={() => onSelect(city)}
    />
  )
)

const CityList = ({ cities, onSelect }) => (
  <List>
    {R.map(renderCity(onSelect), cities)}
  </List>
)

CityList.propTypes = {
  onSelect: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(cityShape).isRequired
}

export default CityList
