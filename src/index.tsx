import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import rootReducer from './store';
import { tempSetUser, checkAsync, TEMP_SET_USER } from './store/auth';

const store = createStore(rootReducer, applyMiddleware(thunk));
//https://stackoverflow.com/questions/50059724/how-do-i-resolve-actions-must-be-plain-objects-use-custom-middleware-for-async/54066862

const persister = persistStore(store);

async function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return;

    store.dispatch({ type: TEMP_SET_USER, payload: user });
    await checkAsync(() => { });

    if (store.getState().auth.checkError) {
      localStorage.removeItem('user');
    }
  } catch (e) { console.log(e) }
}

loadUser();

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <Router history={history} >
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
