import React from 'react'
import { render } from 'react-dom'
import Button from 'material-ui/Button'
import { getUsers } from './firebase'
import { withStyles } from 'material-ui'
import { initMap} from './map'

// getUsers()
window.initMap = initMap

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
      </div>
  );
}

const StyledApp = withStyles(styles)(App)

render(<StyledApp />, document.querySelector('#app'));
