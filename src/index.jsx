import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import Layout from './components/Layout/Layout';

ReactDOM.render(
  <Layout>
    <App />
  </Layout>,
  document.getElementById('root'),
);
