import * as React from 'react'
import * as PropTypes from 'prop-types'
import { action, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router'
import Divider from 'material-ui/Divider'
import FromToForm from './FromToForm'
import { appStateShape } from '../../stores/AppState'

@withRouter
@inject('appState')
@observer
export default class FormPage extends React.Component {
  static propTypes = {
    appState: appStateShape,
    history: PropTypes.object
  }

  @observable fromTo = {}

  handleFromToFormChange = (fromTo) => {
    this.fromTo = fromTo
  }

  handleFindButtonClick = () => {
    this.props.appState.fromTo = this.fromTo
    this.props.history.pushState({
      pathname: '/submit'
    })
  }

  render() {
    return (
      <div>
        <FromToForm onChange={this.handleFromToFormChange} />
        <Divider />
        {/* <ReverseBlock /> */}
        {/* <PeopleSelect /> */}
        {/* <FindFlyButton onClick={this.handleFindButtonClick} /> */}
      </div>
    )
  }
}
