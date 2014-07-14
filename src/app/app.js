/**
 * Add all your dependencies here.
 *
 * @require animation.js
 */

var popup = new ol.Overlay({
  element: $('#popup')
});

var teamSource = new ol.source.GeoJSON({
  url: 'boundlesslocations.geojson'
});

var map = new ol.Map({
  overlays: [popup],
  target: 'map',
  layers: [
    new ol.layer.Vector({
      source: new ol.source.TopoJSON({
        url: 'world-110m.json'
      }),
      style: new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgb(32, 156, 114)'
        })
      })
    }),
    new ol.layer.Vector({
      source: teamSource,
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 1],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: 'src/css/pin_lime.png'
        })
      })
    })
  ],
  // initial center and zoom of the map's view
  view: new ol.View({
    center: [0, 0],
    minZoom: 2,
    projection: 'EPSG:4326',
    zoom: 2
  })
});

var animations = [
  'pan', 'elastic', 'bounce', 'spin', 'fly', 'spiral'
];

window.setInterval(function() {
  var features = teamSource.getFeatures();
  if (features) {
    var feature = features[Math.round(Math.random() * (features.length - 1))];
    var people = feature.get('people').split('\n');
    var person = people[Math.round(Math.random() * (people.length - 1))];
    $('#popup').tooltip('destroy');
    var location = feature.getGeometry().getCoordinates();
    var animation = animations[Math.round(Math.random() * 5)];
    window.setTimeout(function() {
      popup.setPosition(location);
      $('#popup').tooltip({
        title: person + '<br>' + feature.get('location'),
        html: true,
        placement: 'bottom'
      });
      $('#popup').tooltip('show');
    }, 2000);
    app.animation[animation](map, map.getView().getCenter(), location);
  }
}, 5000);

