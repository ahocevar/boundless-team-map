if (!window.app) {
  window.app = {};
}
var app = window.app;

app.animation = (function() {

  // from https://github.com/DmitryBaranovskiy/raphael
  function bounce(t) {
    var s = 7.5625, p = 2.75, l;
    if (t < (1 / p)) {
      l = s * t * t;
    } else {
      if (t < (2 / p)) {
        t -= (1.5 / p);
        l = s * t * t + 0.75;
      } else {
        if (t < (2.5 / p)) {
          t -= (2.25 / p);
          l = s * t * t + 0.9375;
        } else {
          t -= (2.625 / p);
          l = s * t * t + 0.984375;
        }
      }
    }
    return l;
  }

  // from https://github.com/DmitryBaranovskiy/raphael
  function elastic(t) {
    return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
  }
  
  return {
    pan: function(map, source, destination) {
      var pan = ol.animation.pan({
        duration: 2000,
        source: source
      });
      map.beforeRender(pan);
      map.getView().setCenter(destination);
    },
    elastic: function(map, source, destination) {
      var pan = ol.animation.pan({
        duration: 2000,
        easing: elastic,
        source: source
      });
      map.beforeRender(pan);
      map.getView().setCenter(destination);
    },
    bounce: function(map, source, destination) {
      var pan = ol.animation.pan({
        duration: 2000,
        easing: bounce,
        source: source
      });
      map.beforeRender(pan);
      map.getView().setCenter(destination);
    },
    spin: function(map, source, destination) {
      var duration = 2000;
      var start = +new Date();
      var pan = ol.animation.pan({
        duration: duration,
        source: source,
        start: start
      });
      var rotate = ol.animation.rotate({
        duration: duration,
        rotation: 2 * Math.PI,
        start: start
      });
      map.beforeRender(pan, rotate);
      map.getView().setCenter(destination);
    },
    fly: function(map, source, destination) {
      var duration = 2000;
      var start = +new Date();
      var pan = ol.animation.pan({
        duration: duration,
        source: source,
        start: start
      });
      var bounce = ol.animation.bounce({
        duration: duration,
        resolution: 4 * map.getView().getResolution(),
        start: start
      });
      map.beforeRender(pan, bounce);
      map.getView().setCenter(destination);
    },
    spiral: function(map, source, destination) {
      var duration = 2000;
      var start = +new Date();
      var pan = ol.animation.pan({
        duration: duration,
        source: source,
        start: start
      });
      var bounce = ol.animation.bounce({
        duration: duration,
        resolution: 2 * map.getView().getResolution(),
        start: start
      });
      var rotate = ol.animation.rotate({
        duration: duration,
        rotation: -4 * Math.PI,
        start: start
      });
      map.beforeRender(pan, bounce, rotate);
      map.getView().setCenter(destination);
    }
  };
})();