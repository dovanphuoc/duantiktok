import React from 'react';
import ReactDOM from 'react-dom';
import 'overlayscrollbars/css/OverlayScrollbars.css'
import axios from 'axios'

import App from '~/components/App';
import reportWebVitals from '~/reportWebVitals';
import '~/assets/styles/global.scss'

// Axios global config
axios.defaults.baseURL = 'https://tiktok.f8team.dev'

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response.data
}, function (error) {
    return Promise.reject(error)
});

// Các bạn không dùng Token này, hãy tự lấy token của bạn và thay vào!
axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
