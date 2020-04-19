import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt from 'jsonwebtoken'
import localStorage from 'store'
import registerServiceWorker from './registerServiceWorker'
import setAuthorizationToken from './utils/setAuthorizationToken'
import { setCurrentUser } from './actions/globalAction'
import store from './store'
import history from './history'
import App from './App'
import './styles/main.scss'

// import setAuthorizationToken from './utils/setAuthorizationToken';
// import { setCurrentUser } from './actions/userActions';

const app = props => <App {...props}/>;

function render(options = {}){
  ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        {app()}
      </Router>
    </Provider>),
    document.getElementById('root')
  );
}

var token = localStorage.get('jwt');
if(token){
  setAuthorizationToken(token);
  store.dispatch(setCurrentUser(jwt.decode(token)));
  render();
}
else{
  render();
}

registerServiceWorker();
export default render;
