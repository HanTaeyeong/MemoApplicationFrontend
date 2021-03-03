import React from 'react';
import { Route } from 'react-router-dom';

import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';

function App() {
  return (
    <div>
      <Route path={["/","/login"]} component={LoginPage} exact/>
      <Route path="/register" component={RegisterPage} />
      <Route path='/postListPage' component={PostListPage} exact />
      <Route path="/write" component={WritePage} />
    </div>
  );
}

export default App;
