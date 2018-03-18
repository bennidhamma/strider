/**
 * Data object to be written to Firebase.
 */
var data = {
  sender: null,
  timestamp: null,
  lat: null,
  lng: null
};

/**
 * Creates a map object with a click listener and a heatmap.
 */
export function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 3,
    streetViewControl: false,
  });

  // Create the DIV to hold the control and call the makeInfoBox() constructor
  // passing in this DIV.
  var infoBoxDiv = document.createElement('div');
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);

  // Listen for clicks and add the location of the click to firebase.
  map.addListener('click', function(e) {
    data.lat = e.latLng.lat();
    data.lng = e.latLng.lng();
    console.log('map clicked', data)
    //addToFirebase(data);
  });

//  initAuthentication(initFirebase.bind(undefined, heatmap));
}

/**
 * Set up a Firebase with deletion on clicks older than expirySeconds
 * @param {!google.maps.visualization.HeatmapLayer} heatmap The heatmap to
 * which points are added from Firebase.
 */
function initFirebase(heatmap) {

  // 10 minutes before current time.
  var startTime = new Date().getTime() - (60 * 10 * 1000);

  // Reference to the clicks in Firebase.
  var clicks = firebase.child('clicks');

  // Listener for when a click is added.
  clicks.orderByChild('timestamp').startAt(startTime).on('child_added',
    function(snapshot) {

      // Get that click from firebase.
      var newPosition = snapshot.val();
      var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
      var elapsed = new Date().getTime() - newPosition.timestamp;

      // Add the point to  the heatmap.
      heatmap.getData().push(point);

      // Requests entries older than expiry time (10 minutes).
      var expirySeconds = Math.max(60 * 10 * 1000 - elapsed, 0);
      // Set client timeout to remove the point after a certain time.
      window.setTimeout(function() {
        // Delete the old point from the database.
        snapshot.ref().remove();
      }, expirySeconds);
    }
  );

  // Remove old data from the heatmap when a point is removed from firebase.
  clicks.on('child_removed', function(snapshot, prevChildKey) {
    var heatmapData = heatmap.getData();
    var i = 0;
    while (snapshot.val().lat != heatmapData.getAt(i).lat()
    || snapshot.val().lng != heatmapData.getAt(i).lng()) {
      i++;
    }
    heatmapData.removeAt(i);
  });
}

/**
 * Updates the last_message/ path with the current timestamp.
 * @param {function(Date)} addClick After the last message timestamp has been updated,
 *     this function is called with the current timestamp to add the
 *     click to the firebase.
 */
function getTimestamp(addClick) {
  // Reference to location for saving the last click time.
  var ref = firebase.child('last_message/' + data.sender);

  ref.onDisconnect().remove();  // Delete reference from firebase on disconnect.

  // Set value to timestamp.
  ref.set(Firebase.ServerValue.TIMESTAMP, function(err) {
    if (err) {  // Write to last message was unsuccessful.
      console.log(err);
    } else {  // Write to last message was successful.
      ref.once('value', function(snap) {
        addClick(snap.val());  // Add click with same timestamp.
      }, function(err) {
        console.warn(err);
      });
    }
  });
}

/**
 * Adds a click to firebase.
 * @param {Object} data The data to be added to firebase.
 *     It contains the lat, lng, sender and timestamp.
 */
function addToFirebase(data) {
  getTimestamp(function(timestamp) {
    // Add the new timestamp to the record data.
    data.timestamp = timestamp;
    var ref = firebase.child('clicks').push(data, function(err) {
      if (err) {  // Data was not written to firebase.
        console.warn(err);
      }
    });
  });
}