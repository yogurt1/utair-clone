import { PropTypes } from 'react'
import { observable, action, computed } from 'mobx'
import { serializable } from 'serializr'

export default class AppState {
  @serializable @observable counter = 0
  @computed get doubleCounter() {
    return this.counter * 2
  }

  @action async increment() {
    await new Promise(
      (resolve) => {
        setTimeout(resolve, 50)
      }
    )

    this.counter += 1
  }

  @observable cities = {

  }
}

export const appStateShape = PropTypes.instanceOf(AppState)
