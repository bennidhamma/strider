import React from 'react'
import { render } from 'react-dom'
import Button from 'material-ui/Button'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { initMap} from './map'
import { getUsers } from './db'
import { withStyles } from 'material-ui'
import Login from './login'
import reducers from './reducers'

// getUsers()
var user = localStorage.user ? JSON.parse(localStorage.user) : null
window.initMap = initMap
window.store = createStore(reducers, {
  user
})

const styles = theme => ({
  '@global': {
    'html, body': {
      margin: 0,
      padding: 0,
    }
  },
  map: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    background: 'gray',
  },

})
function App({classes}) {
  return (
      <div>
        <div id="map" className={classes.map}/>
        <Button variant="raised" color="primary">
          Hello world 7
        </Button>
        <Login/>
      </div>
  );
}

const StyledApp = withStyles(styles)(App)

render(<Provider store={window.store}>
  <StyledApp />
</Provider>, document.querySelector('#app'));
