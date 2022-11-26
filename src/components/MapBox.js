import 'mapbox-gl/dist/mapbox-gl.css';
import './../Marker.css';
import './../MapBox.css';
import { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import fridge from './../IMG_0366.jpg';
import instagram from './../icons8-instagram-50.png';
import website from './../icons8-website-48.png';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import mapboxgl from 'mapbox-gl';

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoid29yc3RkdWRlb2ZhbGwiLCJhIjoiY2w1ZzVydndyMWk2MDNiczBnNTNjeHJncSJ9.8c2Pkbc8f5WLoJFjgLBq2A';
const data = require('./../fridges.json');
const MapBox = () => {
  const [status, setStatus] = useState(false);
  const [selectedFridge, setSelectedFridge] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: 39.952,
    longitude: -75.165,
    zoom: 12,
  });
  return (
    <div className="mapHolder">
      <div className="overlay-box ">
        {status ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            <h2>{selectedFridge.properties.description}</h2>
            <h2>{selectedFridge.properties.address}</h2>
            <div className="socialBox">
              <a href={selectedFridge.properties.instagram}>
                <img
                  src={instagram}
                  style={{ height: '30px', width: '30px' }}
                ></img>
              </a>
              <a href={selectedFridge.properties.website} target="_blank">
                <img
                  src={website}
                  style={{ height: '30px', width: '30px' }}
                ></img>
              </a>
            </div>
          </div>
        ) : (
          <>
            <h1>No fridge has been selected</h1>
          </>
        )}
      </div>
      <Map
        {...viewState}
        style={{ height: '100%', width: '100%' }}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onClick={() => {
          setStatus(null);
        }}
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
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelectedFridge(fridge);
                setStatus(true);
                setViewState({
                  ...viewState,
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
            style={{ maxWidth: '430px' }}
            onClose={() => {
              setSelectedFridge(null);
              setStatus(null);
            }}
          >
            <div className="pop-up-box">
              <div className="popUpHalf">
                <img
                  class="fridge-pic"
                  src={fridge}
                  style={{ height: '180px', width: '100px' }}
                  alt="fridge"
                />
              </div>
              <div className="popUpHalf info">
                <h3 style={{ margin: '0' }}>
                  {selectedFridge.properties.title}
                </h3>
                <p>{selectedFridge.properties.description}</p>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapBox;
