import 'react-hot-loader/patch'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { AppContainer } from 'react-hot-loader'
import { serialize, deserialize } from 'serializr'
import App from './components/App'
import AppState from './stores/AppState'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()
const appState = new AppState()

const renderApp = (state) => {
  ReactDOM.render(
    <AppContainer>
      <App
        appState={state}
        history={history}
      />
    </AppContainer>,
    document.querySelector('#app')
  )
}

window.onload = () => {
  injectTapEventPlugin()
  renderApp(appState)
}

if (module.hot) {
  module.hot.accept(['./components/App', './theme'], () => {
    renderApp(appState)
  })

  module.hot.accept('./stores/AppState', () => {
    const json = serialize(appState)
    const nextAppState = deserialize(AppState, json)
    renderApp(nextAppState)
  })
}
