// sk.eyJ1IjoianVrZWpjIiwiYSI6ImNqMGJtYmo4bTAzNXozMm8yN3lyaGhxN2kifQ.SVFlHJfAgqN-3Ouvi0T8Eg




// 'use strict';

// import React from 'react';

// export default class Map extends React.Component {
//   render() {

//     const mapStyle = {
//         display: 'block',
//         position: 'relative',
//         margin: '0px auto',
//         width: '50%',
//         padding: '10px',
//         border: 'none',
//         borderRadius: '3px',
//         fontSize: '12px',
//         textAlign: 'center',
//         color: '#222',
//         background: '#fff',
//     }

//     mapboxgl.accessToken = 'pk.eyJ1IjoianVrZWpjIiwiYSI6ImNqMGJseTBzZDAzd2EycWwzajR3aHp4MmMifQ.JV5KAQF5LHWktAtvcTTzfw';
//     var map = new mapboxgl.Map({
//       container: 'map', // container id
//       style: 'mapbox://styles/mapbox/streets-v9',
//       center: [-74.50, 40], // starting position
//       zoom: 9 // starting zoom
//     });

//     map.on('mousemove', function (e) {
//     document.getElementById('info').innerHTML =
//       // e.point is the x, y coordinates of the mousemove event relative
//       // to the top-left corner of the map
//       JSON.stringify(e.point) + '<br />' +
//           // e.lngLat is the longitude, latitude geographical position of the event
//       JSON.stringify(e.lngLat);
//     });


//     return (
//       <div>
//         <div id='map' style={mapStyle}></div>
//         <pre id='info'></pre>
//       </div>
//     );
//   }
// }
