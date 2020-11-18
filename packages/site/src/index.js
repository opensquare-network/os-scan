import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store'
import { Provider } from 'react-redux'
import GlobalStyle from "./GlobalStyle";
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

