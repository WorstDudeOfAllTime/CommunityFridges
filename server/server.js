const express = require('express');
const port = 3000;
const app = express();
const {initializeApp} = require('firebase/app')
const {getDatabase, ref, onValue} = require('firebase/database')

const firebaseConfig = {
  apiKey: "AIzaSyDGnVuqWnl2Mxby5s2BkdUgTps9Sgcopt8",
  authDomain: "philly-fridge-locator.firebaseapp.com",
  databaseURL: "https://philly-fridge-locator-default-rtdb.firebaseio.com",
  projectId: "philly-fridge-locator",
  storageBucket: "philly-fridge-locator.appspot.com",
  messagingSenderId: "591935696558",
  appId: "1:591935696558:web:dc8082e85fd0b37c07073f"
};
const fireApp = initializeApp(firebaseConfig);
const db = getDatabase(fireApp);


app.listen(port, ()=> {
  const fridgeCount = ref(db, 'fridges');
  onValue(fridgeCount, (snapshot) => {
    const data = snapshot.val();
    console.log(data[2]);
  })
  console.log('we are listening...')
})