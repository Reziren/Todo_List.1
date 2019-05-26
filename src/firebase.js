import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

let config = {
  apiKey: "AIzaSyC8CrTLEZxKsbQ15IP7JrOhSspUNQ3DuRk",
  authDomain: "demo.firebaseapp.com",
  databaseURL: "https://fir-a7958.firebaseio.com",
  projectId: "fir-a7958"
};
firebase.initializeApp(config);

const db = firebase.firestore();
export default db;
