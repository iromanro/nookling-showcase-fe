import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import history from './history';
import App from './App';
import './styles/main.scss';
import registerServiceWorker from './registerServiceWorker';

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

render();
// var userTkn = Cookies.get('tkn');
// if(userTkn){
//   // setAuthorizationToken(token);
//   // store.dispatch(setCurrentUser(userTkn));
//   render();
// }
// else{
//   render();
// }

registerServiceWorker();
export default render;
