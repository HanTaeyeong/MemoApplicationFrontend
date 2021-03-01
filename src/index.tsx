import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from './store';
import { tempSetUser, checkAsync, TEMP_SET_USER } from './store/auth';

const store = createStore(rootReducer, applyMiddleware(thunk));
//https://stackoverflow.com/questions/50059724/how-do-i-resolve-actions-must-be-plain-objects-use-custom-middleware-for-async/54066862

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

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
