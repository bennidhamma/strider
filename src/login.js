import firebase from 'firebase'
import firebaseui from 'firebaseui'
import Typography from 'material-ui/es/Typography/Typography'
import React from 'react'
import { FirebaseAuth } from 'react-firebaseui'

console.log('firebase auth: ', firebase.auth())

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  callbacks: {
    signInSuccess: function (currentUser, credential, redirectUrl) {
      // Do something.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      console.log('signin success', currentUser, credential, redirectUrl)
      return false
    },
  },
    // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Required to enable one-tap sign-up credential helper.
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
}

export default () => <div>
  <Typography variant="display1">Sign in</Typography>
  <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
</div>
