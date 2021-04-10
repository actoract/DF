import React from 'react';
import './i18n';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './store'
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Provider store = {store}>
        <App className="app"/>
    </Provider>,
document.getElementById('root')
);
