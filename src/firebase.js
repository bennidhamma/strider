import firebase from 'firebase'
// Required for side-effects
import 'firebase/firestore'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAL7q2o2lmLys9M-xBRLZU8KQxxsQB5nLU",
  authDomain: "strider-964d1.firebaseapp.com",
  databaseURL: "https://strider-964d1.firebaseio.com",
  projectId: "strider-964d1",
  storageBucket: "strider-964d1.appspot.com",
  messagingSenderId: "333241283114"
}
if (!window.firebaseInitialized) {
  firebase.initializeApp(config)
  window.firebaseInitialized = true
  console.log('initialized firebase')
}
const db = firebase.firestore()

export function addUser() {
  // Add a second document with a generated ID.
  db.collection("users").add({
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id)
    })
    .catch(function (error) {
      console.error("Error adding document: ", error)
    })
}

export function getUsers() {
  db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
    })
  })
}
