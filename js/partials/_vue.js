// jshint -W117
var app = new Vue({
  el: '#app',
  data: {
    device: '',
    browser: '',
    sidebarVisible: false,
    addToHomescreen: false,
    shareScreen: false,
    tipLabel: 'Cosmo Sex Tip',
    backgroundImages: [
      'bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','bg6.jpg','bg7.jpg','bg8.jpg','bg9.jpg'
    ],
    secondaryImage: false,
    primaryImage: {
      backgroundImage:'url(img/bg1.jpg)'
    },
    imageLoading: false,
    tipNumber: 0,
    tipsDisplayed: 0,
    currentTip: '',
    tips: sexTips,
    names: fakeNames
  },
  methods: {
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // GENERATE NEW SEX TIP
    generateSexTip: function() {
      var self = this;
      //console.log(self.tips['sexActs'][0]);
      var r = Math.floor(Math.random()*(self.tips.sexActs.length));
      self.currentTip = '';
      self.tipNumber = Math.floor(Math.random()*(99999))+1;
      
      self.tips.sexActs[r].forEach(function(k) {
        //console.log(typeof k);
        if (typeof k == "object") {
          //console.log(k)
          var z = Math.floor(Math.random()*(k.length));
          
          if (typeof k[z] == "object") {
            k[z].forEach(function(a) {
              if (typeof a == "object") {
                self.currentTip += a[(Math.floor(Math.random()*(a.length)))];
              } else {
                self.currentTip += a;
              }
            });
          } else {
            self.currentTip += k[z];
          }
        } else {
          self.currentTip += k;
        }
        
      });
      self.tipsDisplayed++;
      
      if (self.tipsDisplayed % 4 === 0) {
        self.newBackgroundImage();
      }
      
    },
    
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Swap the background image
    newBackgroundImage: function() {
      var self = this;
      var i = 'url(img/'+randomFrom(self.backgroundImages)+')';
      if (self.primaryImage.backgroundImage == i) {
        self.newBackgroundImage();
      } else {
        self.primaryImage = {
          backgroundImage:i,
        };
      }
    },
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Generate an image.
    generatePicture: function() {
      var self = this;
      
      var node = document.getElementById('CurrentTip');

      domtoimage.toJpeg(node)
        .then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          document.getElementById('ShareImageWrapper').innerHTML="";
          document.getElementById('ShareImageWrapper').appendChild(img);
          self.shareScreen = true;
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });      
      
    },
    
    swapBackgroundRegenerateImage: function() {
      var self = this;
      self.newBackgroundImage();
      self.imageLoading = true;
      setTimeout(function(){ 
        self.generatePicture();
        self.imageLoading = false;
      }, 300);
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
  
  computed: {
    tipNumberFormatted: function() {
      return '#' + addCommas(this.tipNumber);
    }
  },
  
  mounted: function () {
    var self = this;
    self.generateSexTip();
    self.checkBrowser();
  }
});