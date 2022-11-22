import * as React from 'react';
import './App.css';
import MapBox from './components/MapBox';
import Layout from './components/Layout';

function App() {
  return (
    <div className="container">
    <Layout>
      <MapBox/>
    </Layout>
    </div>
  );
}

export default App;
