import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'babel-polyfill' ;
// import { render } from 'react-dom';  
// import { Router, browserHistory } from 'react-router';
// import routes from './routes';
// import { Provider } from 'react-redux';
// import configureStore from './store/configureStore';

// const store = configureStore()

// render(  
//   <Provider store={store}>
//     {/* <Router routes={routes} history={browserHistory} /> */}
//   </Provider>,
//  document.getElementById('main')
// );

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

