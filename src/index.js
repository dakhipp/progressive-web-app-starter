import React from 'react'
import ReactDOM from 'react-dom'

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { green100, green500, green700 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Route } from 'react-router'


import createHistory from 'history/createBrowserHistory'

import {routerReducer, routerMiddleware/*, push*/ } from 'react-router-redux'

import reducers from './reducers' // Or wherever you keep your reducers

import ConnectedRouter from './components/ConnectedRouter'

import DefaultLayout from './components/DefaultLayout'
import Home from './components/Home'
import About from './components/About'

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green100,
  },
}, {
  avatar: {
    borderColor: null,
  },
  // userAgent: req.headers['user-agent'] // needed for server rendering,
});

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
    	<MuiThemeProvider muiTheme={muiTheme}>
	      <div>
	      	<DefaultLayout>
		        <Route exact path="/" component={Home} />
		        <Route path="/about" component={About} />
		      </DefaultLayout>
	      </div>
	    </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)