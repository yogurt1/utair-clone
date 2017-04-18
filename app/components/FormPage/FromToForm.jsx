import * as React from 'react'
import * as PropTypes from 'prop-types'
import { reaction, computed, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import CitySelectButton from './CitySelectButton'

@inject('appState')
@observer
export default class FromToForm extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  @observable from = 'from'
  @observable to = 'To'
  disposeReaction

  @computed get fromTo() {
    const { from, to } = this
    return { from, to }
  }

  componentWillMount() {
    this.disposeReaction = reaction(
      () => this.fromTo,
      (fromTo) => this.props.onChange(fromTo)
    )
  }

  componentWillUnmount() {
    this.disposeReaction()
  }

  handleStateChange() {
    this.props.onChange(this.fromTo)
  }

  handleFromSelect = (city) => {
    this.from = city
  }

  handleToSelect = (city) => {
    this.to = city
  }

  render() {
    return (
      <div>
        <label>From:</label>
        <CitySelectButton onSelect={this.handleFromSelect} />
        <br />
        <label>To:</label>
        <CitySelectButton onSelect={this.handleToSelect} />
      </div>
    )
  }
}
