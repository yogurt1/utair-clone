import * as React from 'react'
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import RaisedButton from 'material-ui/RaisedButton';

@inject('appState')
@observer
export default class Counter extends React.Component {
  @computed get counter() {
    return this.props.appState.counter;
  }

  handleIncrementButtonClick = () => {
    this.props.appState.increment()
  }

  render() {
    return (
      <div>
        <h2>Counter: {this.counter}</h2>
        <RaisedButton
          primary={false}
          onTouchTap={this.handleIncrementButtonClick}>
          Increment
        </RaisedButton>
      </div>
    )
  }
}
