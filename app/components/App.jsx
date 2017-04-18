import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Provider, observer } from 'mobx-react'
import { GatewayProvider } from 'react-gateway'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Router, Switch, Route } from 'react-router'
import SubmitPage from './SubmitPage'
import FormPage from './FormPage'
import Layout from './Layout'
import theme from '../theme'
import { appStateShape } from '../stores/AppState'

@observer
export default class App extends React.Component {
  static propTypes = {
    appState: appStateShape,
    history: PropTypes.object
  }

  render() {
    const { appState, history } = this.props
    return (
      <Provider appState={appState}>
        <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
          <GatewayProvider>
            <Layout>
              <Router history={history}>
                <Switch>
                  <Route exact path="/" component={FormPage} />
                  <Route path="/submit" component={SubmitPage} />
                </Switch>
              </Router>
            </Layout>
          </GatewayProvider>
        </MuiThemeProvider>
      </Provider>
    )
  }
}
