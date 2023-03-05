import firebase from 'firebase/compat/app'

import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAqB6VCcCRnRvLXzzG5PkeGCT79VtM3-2w",
    authDomain: "nynepay.firebaseapp.com",
    projectId: "nynepay",
    storageBucket: "nynepay.appspot.com",
    messagingSenderId: "767335594620",
    appId: "1:767335594620:web:ef94a7349f12560fc5a7f9",
    measurementId: "G-7XGW0XEFRE"
  };

  firebase.initializeApp(firebaseConfig)

  const auth = firebase.auth();
  const fs = firebase.firestore();
  const storage = firebase.storage();

  export {auth,fs,storage}