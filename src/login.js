import { connect } from 'react-redux'
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import Dialog, { DialogTitle, DialogContent, DialogContentText } from 'material-ui/Dialog'
import React from 'react'
import { FirebaseAuth } from 'react-firebaseui'

function writeUser(user)
{
  const u = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoUrl: user.photoUrl,
  }
  localStorage.user = JSON.stringify(u)
}
// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  callbacks: {
    signInSuccess: function (user, credential, redirectUrl) {
      // Do something.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      window.store.dispatch({ type: 'AUTH_CHANGE', user })
      console.log('signin success', user, credential, redirectUrl)
      writeUser(user)
      return false
    },
  },
    // We will display Google and Facebook as auth providers.
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      authMethod: 'https://accounts.google.com',
      clientId: '333241283114-v0tte8vqvknrvlbs0tuercb0jh6fu9vh.apps.googleusercontent.com'
    },
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Required to enable one-tap sign-up credential helper.
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
}

class SignIn extends React.Component {
  render() {
    const { user, dispatch } = this.props
    return <Dialog open={!user}>
      <DialogTitle>Sign in {user && user.uid}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Welcome to Safety Tracker. Go ahead and sign in to get started. We'll add anonymous sign in
          too later if that's more your jam.
        </DialogContentText>
        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </DialogContent>
    </Dialog>
  }
}

export default connect((state) => ({
  user: state.user,
}))(SignIn)
