import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';

if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Post/pages/PostListPage/PostListPage');
  require('./modules/Post/pages/PostDetailPage/PostDetailPage');
  require('./modules/Home/Home');
  require('./modules/About/About');
}

export default (
  <Route 
  	path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostListPage/PostListPage').default);
        });
      }}
    />
   <Route
   	path="/home"
   	getComponent={(nextState, cb) => {
   		require.ensure([], require => {
   			cb(null, require('./modules/Home/Home').default);
   		});
   	}}
   	/>
   	<Route
   	path="/about"
   	getComponent={(nextState, cb) => {
   		require.ensure([], require => {
   			cb(null, require('./modules/About/About').default);
   		});
   	}}
   	/>
    <Route
      path="/posts/:slug-:cuid"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostDetailPage/PostDetailPage').default);
        });
      }}
    />
  </Route>
);
