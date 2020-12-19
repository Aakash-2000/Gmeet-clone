import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCG5rYhx5Ixa6Z7P3nBRUJnezSggGD6mQA",
  authDomain: "webrtc-e4817.firebaseapp.com",
  projectId: "webrtc-e4817",
  storageBucket: "webrtc-e4817.appspot.com",
  messagingSenderId: "83297105814",
  appId: "1:83297105814:web:cc097b08375831cab44fb7"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth,provider };
export default  firebaseApp;