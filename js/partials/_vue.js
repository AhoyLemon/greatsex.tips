// jshint -W117
var app = new Vue({
  el: '#app',
  data: {
    device: '',
    browser: '',
    sidebarVisible: false,
    addToHomescreen: false,
    men: dumbMen,
    masks: [ 'heart-1', 'heart-2', 'heart-3', 'heart-4' ],
    filePath: 'img/men/squares/',
    raindrops: [],
    recentMen: []
  },
  methods: {
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // GENERATE NEW RAINDROP
    newRaindrop: function() {
      var self = this;
      var r = Math.floor(Math.random()*self.men.length);
      
      if (self.recentMen.includes(self.men[r].file)) {
        self.newRaindrop();
      } else {
        self.recentMen.push(self.men[r].file);
        if (self.recentMen.length > 22) {
          self.recentMen.shift();
        }
      }
      
      var dropClass = self.masks[Math.floor(Math.random()*self.masks.length)];

      var sizeDiff = ((Math.floor(Math.random() * 100) + 1) / 100);
      //alert(sizeDiff);
      
      var minSize = 0.05;
      var maxSize = 1.05;
      
      var s = minSize + (sizeDiff * (maxSize - minSize));
      var tX = (-40 + Math.floor(Math.random() * 80)) + 'vw';
      
      // Fall speed
      var minSpeed = 2;
      var maxSpeed = 18;
      var aD = maxSpeed - ((maxSpeed - minSpeed) * sizeDiff) + 's';
      
      var rot = (-35 + (Math.random() * 70)) + 'deg';
      var shd = Math.floor(30 * sizeDiff) + 'px';
      
      var drop = {
        file: self.men[r].file,
        class: dropClass,
        seconds: {
          animationDuration: aD,
          zIndex: (sizeDiff * 1000)
        },
        styleObject: {
          transform: 'translateX('+tX+') scale('+s+') rotate('+rot+')', 
          boxShadow: '0 0 '+shd+' rgba(0,0,0,0.5)'
        }
      };
      
      self.raindrops.push(drop);
      
      if (self.raindrops.length > 20) {
        $('#Raindrops .drop:first-child').remove();
      }
      
    },
    
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CHECK BROWSER
    checkBrowser: function() {
      var ua = navigator.userAgent.toLowerCase();
      //console.log(ua);
      if (ua.indexOf("android") > -1) {
        this.device = "android";
        if (ua.indexOf("firefox") > -1) {
          // Android Firefox
          this.browser="firefox";
        } else if (ua.indexOf("opr") > -1) {
          // Android Opera
          this.browser="opera";
        } else if (ua.indexOf("chrome") > -1) {
          // Android Chrome
          this.browser="chrome";
        }
      } else if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1) {
        this.device = "ios";
      } else if (ua.indexOf('windows') > -1) {
        this.device = "windows";
        if (ua.indexOf("edge") > -1) {
          this.browser = "edge";
        } else if (ua.indexOf("trident") > -1) {
          this.browser = "ie";
        } else if (ua.indexOf('firefox') > -1) {
          this.browser = "firefox";
        } else if (ua.indexOf('opr') > -1) {
          this.browser = "opera";
        } else if (ua.indexOf('vivaldi') > -1) {
          this.browser = "vivaldi";
        } else if (ua.indexOf('chrome') > -1) {
          this.browser = "chrome";
        }
      } else if (ua.indexOf('mac') > -1) {
        this.device = "mac";

        if (ua.indexOf('chrome') > -1) {
          this.browser = "chrome";
        } else if (ua.indexOf('safari') > -1) {
          this.browser = "safari";
        } else if (ua.indexOf('firefox') > -1) {
          this.browser = "firefox";
        }
      } else if (ua.indexOf('cros') > -1) {
        this.device = "chrome";
        this.browser = "chrome";
      }
    }
    
    
  },
  mounted: function () {
    var self = this;
    //self.newRaindrop();
    self.newRaindrop();
    function doSomething() {}

    (function loop() {
      var rand = Math.round(Math.random() * (1600  - 600)) + 600;
      setTimeout(function() {
        //alert('A');
        self.newRaindrop();
        loop();  
      }, rand);
    }());
  }
});