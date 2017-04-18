import * as React from 'react'
import * as PropTypes from 'prop-types'
import { GatewayDest } from 'react-gateway'

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  render() {
    return (
      <div>
        {this.props.children}
        <GatewayDest name='global' />
      </div>
    )
  }
}
