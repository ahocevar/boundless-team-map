/**
 * Add all your dependencies here.
 *
 * @require animation.js
 */

var popup = new ol.Overlay({
  element: $('#popup')
});

var map = new ol.Map({
  overlays: [popup],
  target: 'map',
  // initial center and zoom of the map's view
  view: new ol.View({
    center: [40.71448, -74.00598].reverse(),
    minZoom: 2,
    projection: 'EPSG:4326',
    zoom: 5
  })
});
map.getControls().removeAt(2);

var world = new ol.FeatureOverlay({
  map: map,
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: '#00A78D'
    })
  })
});

var team = new ol.FeatureOverlay({
  map: map,
  style: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      src: 'src/css/pin_lime.png'
    })
  })
});

var worldSource = new ol.source.TopoJSON({
  url: 'world-110m.json'
});
worldSource.once('change', function() {
  world.setFeatures(worldSource.getFeatures());
});

var teamSource = new ol.source.GeoJSON({
  url: 'boundlesslocations.geojson'
});
teamSource.once('change', function() {
  team.setFeatures(teamSource.getFeatures());
});

var animations = [
  'pan'
];

window.setInterval(function() {
  var features = team.getFeatures();
  if (features) {
    var feature = features[Math.round(Math.random() * (features.length - 1))];
    var people = feature.get('people').split('\n');
    var person = people[Math.round(Math.random() * (people.length - 1))];
    $('#popup').tooltip('destroy');
    var location = feature.getGeometry().getCoordinates();
    var animation = animations[Math.round(Math.random() * (animations.length - 1))];
    window.setTimeout(function() {
      popup.setPosition(location);
      $('#popup').tooltip({
        title: '<div class="person">' + person + '</div><div class="location">' + feature.get('location') + '</div>',
        html: true,
        placement: 'bottom'
      });
      $('#popup').tooltip('show');
    }, 2000);
    app.animation[animation](map, map.getView().getCenter(), location);
  }
}, 5000);

