import React, { Suspense } from "react";
import './i18n';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './store'
import styles from './index.css'
import App from './App';
import 'antd/dist/antd.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Provider store = {store}>
        <Suspense fallback={<div>Loading...</div>}>
            <App className={styles['app']}/>
        </Suspense>
    </Provider>,
document.getElementById('root')
);
