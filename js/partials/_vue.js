// jshint -W117
var app = new Vue({
  el: '#app',
  data: {
    device: '',
    browser: '',
    sidebarVisible: false,
    addToHomescreen: false,
    hideShareImage: true,
    shareScreen: false,
    tipLabel: 'Great Sex Tip',
    backgroundImages: [
      'bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','bg6.jpg','bg7.jpg','bg8.jpg','bg9.jpg','bg10.jpg'
    ],
    backgroundColors: [
      '#622927', '#150f4b', '#073615', '#230622', '#061e26', '#232405', '#210512'
    ],
    shareCoversheet: {
      backgroundColor: '#622927'
    },
    primaryImage: {
      backgroundImage:'url(img/bg1.jpg)'
    },
    canvas: false,
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
    // Function for when you click the "New Tip" button.
    newTip: function() {
      var self = this;
      self.generateSexTip();
      sendEvent('New Tip', self.currentTip);
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

    newBackgroundColor: function() {
      var self = this;
      var i = randomFrom(self.backgroundColors);
      if (self.shareCoversheet.backgroundColor == i) {
        self.newBackgroundColor();
      } else {
        self.shareCoversheet.backgroundColor = i;
      }
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Generate an image.
    generatePicture: function() {
      var self = this;
      self.hideShareImage = false;

      var node = document.getElementById('CurrentTip');
      
      /*

      domtoimage.toJpeg(node)
        .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.getElementById('ShareImageWrapper').innerHTML="";
        document.getElementById('ShareImageWrapper').appendChild(img);
        self.hideShareImage = true;
        self.shareScreen = true;
      })
        .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
      */
      
      html2canvas(node, {
        onrendered: function(canvas) {
          document.getElementById('ShareImageWrapper').innerHTML="";
          document.getElementById('ShareImageWrapper').appendChild(canvas);
          //self.hideShareImage = true;
          self.shareScreen = true;
          self.canvas = canvas;
          
          //self.downloadImage = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
          //var a = document.getElementById('DownloadImageButton');
          //document.getElementById('DownloadImageButton').href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
          //document.getElementById('DownloadImageButton').download = 'somefilename.jpg';
          
        }
      });
      
    },
    
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Share Image (PhoneGap only?)
    
    shareTipImage: function() {
      var self = this;
      window.plugins.socialsharing.share('Message, subject, image and link', 'The subject', 'https://www.google.nl/images/srpr/logo4w.png', 'http://www.x-services.nl');
    },
    
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Download
    downloadCanvas: function() {
      var self = this;
      Canvas2Image.saveAsPNG(self.canvas);
    },
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // When you click the "Share this tip!" button.    
    shareThisTip: function() {
      var self = this;
      self.generatePicture();
      sendEvent('Share this tip',self.currentTip);
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // When you click "Switch Background" on the share screen.
    switchBackground: function() {
      var self = this;
      self.newBackgroundImage();
      self.newBackgroundColor();
      self.imageLoading = true;
      setTimeout(function(){ 
        self.generatePicture();
        self.imageLoading = false;
      }, 300);
      sendEvent('Switch Background', self.currentTip);
    },
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // When you click the Info Drawer Toggle (? in circle)
    toggleDrawer: function() {
      var self = this;
      self.sidebarVisible = !self.sidebarVisible;
      if (self.sidebarVisible) {
        sendEvent('Info Drawer Opened', 'Drawer Open');
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