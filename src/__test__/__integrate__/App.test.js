import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../../App';
import rootReducer from '../../store';



const store = createStore(rootReducer, applyMiddleware(thunk));
const persister = persistStore(store);
const history = createBrowserHistory();

const renderApp = () => render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persister}>
                <Router history={history} >
                    <App />
                </Router>
            </PersistGate>
        </Provider>
    </React.StrictMode>
)


describe('Test App', () => {

    test('First App render should render LoginPage correctly', async () => {
        renderApp()
        expect(screen.getByRole('app')).toBeDefined();
        // expect(screen.getByRole('status')).toHaveTextContent('Loading...');
        expect(screen.getByRole('app')).toHaveTextContent(/Simple Memo/i);
        expect(screen.getByRole('app')).toHaveTextContent(/Login/i)
        expect(screen.getByRole('app')).toHaveTextContent(/Go to Register/i)
    });

    it('Clicking Login button without valid Id should render error message', () => {
        renderApp()
        const loginButton = screen.getByRole('button', { name: /Login/i });
        act(() => loginButton.click());
        expect(screen.getByText(/ID should consists of number and alphabet/i)).toBeTruthy();
    })

    it('Go to Register button redirects to ReigsterPage correctly and goTo Login Redirects correctly too', async () => {
        renderApp()
        const gotoRegisterButton = screen.getByRole('button', { name: /Go to Register/i });
        act(() => gotoRegisterButton.click());
        expect(screen.getByRole('button', { name: /Register/i })).toBeTruthy();

        const gotoLoginButton = screen.getByRole('button', { name: /Go to Login/i });
        act(() => gotoLoginButton.click());
        expect(screen.getByText(/Simple Memo/i)).toBeTruthy();
    })
});