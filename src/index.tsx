import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import history from './history';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './store';
import { checkAsync } from './store/auth';
import { getItem, removeItem } from './lib/localStorageRequest';
import axios from 'axios';

require('dotenv').config();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

console.log(navigator.language);

const persister = persistStore(store);

export async function loadUser() {
  try {
    const username = getItem('username');
    const accessToken = getItem('access-token');

    if (!username || !accessToken) {
      removeItem('username');
      removeItem('access-token');
      return;
    }

    await checkAsync(() => { });

  } catch (e) { console.log(e) }
}

loadUser();

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
