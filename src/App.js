import * as React from 'react';
import { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Marker.css';
import './App.css';
import fridge from './IMG_0366.jpg';
import instagram from './icons8-instagram-50.png';
import website from './icons8-website-48.png';
const MAPBOX_TOKEN =
  'pk.eyJ1Ijoid29yc3RkdWRlb2ZhbGwiLCJhIjoiY2w1ZzVydndyMWk2MDNiczBnNTNjeHJncSJ9.8c2Pkbc8f5WLoJFjgLBq2A';
const data = require('./fridges.json');

function App() {
  const [status, setStatus] = useState(false);
  const [currentFridge, setCurrentFridge] = useState('');
  const [selectedFridge, setSelectedFridge] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: 39.952,
    longitude: -75.165,
    zoom: 12,
  });

  return (
    <div className="container">
      <div className="overlay-box">
        <h1>PHILADELPHIA COMMUNITY FRIDGES</h1>
        {status ? <h2>{currentFridge}</h2> : <h2>No Fridge Selected</h2>}
      </div>
      <Map
        {...viewState}
        style={{ height: '100vh', width: '100vw' }}
        onMove={evt => setViewState(evt.viewState)}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v9"
      >
        {data.features.map((fridge, index) => {
          return (
            <Marker
              key={index}
              className="marker"
              longitude={fridge.geometry.coordinates[0]}
              latitude={fridge.geometry.coordinates[1]}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
              color="black"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelectedFridge(fridge);
                setViewState({...viewState, 
                  latitude: fridge.geometry.coordinates[1],
                  longitude: fridge.geometry.coordinates[0],
                });
              }}
            ></Marker>
          );
        })}

        {selectedFridge && (
          <Popup
            longitude={Number(selectedFridge.geometry.coordinates[0])}
            latitude={Number(selectedFridge.geometry.coordinates[1])}
            anchor="bottom"
            style={{background: 'black'}}
            onClose={() => setSelectedFridge(null)}
          >
            <div className="pop-up-box">
              <h3>{selectedFridge.properties.title}</h3>
              <img class="fridge-pic"
                src={fridge}
                style={{ height: '275px', width: '180px' }}
                alt="fridge"
              />
              <p>{selectedFridge.properties.description}</p>
              <a href={selectedFridge.properties.instagram}>
                <img
                  src={instagram}
                  style={{ height: '40px', width: '40px' }}
                ></img>
              </a>
              <a href={selectedFridge.properties.website}>
                <img
                  src={website}
                  style={{ height: '40px', width: '40px' }}
                ></img>
              </a>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default App;
