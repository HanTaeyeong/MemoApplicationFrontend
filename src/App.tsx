import React from 'react';
import { Route } from 'react-router-dom';

import IntroPage from './pages/IntroPage';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';

import Navigation from './containers/navigation/Navigation';

function App() {
  return (
    <div role='app'>
      <Route path={["/navigation"]} component={Navigation}/>

      <Route path={["/home"]} component={IntroPage} />
      <Route path={["/", "/login"]} component={LoginPage} exact />
      <Route path="/register" component={RegisterPage} exact />
      <Route path='/postListPage' component={PostListPage} exact />
      <Route path="/write" component={WritePage} exact />
    </div>
  );
}

export default App;
