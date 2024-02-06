import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import store from './store'
import theme from './theme'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>chargement</div>} persistor={persistor}>
        <CssBaseline>
          <MuiThemeProvider theme={theme}>
            <App />
          </MuiThemeProvider>
        </CssBaseline>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
