// jshint -W117

function addCommas(intNum) {
  return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

function randomFrom(array) {
  return array[Math.floor(Math.random()*(array.length))];
}

function sendEvent(c, a, l, v) {
  if (v) {
    //ga('send', 'event', { eventCategory: c, eventAction: a, eventLabel: l, eventValue:v });
    console.log('CATEGORY: '+c+', ACTION:'+a+', LABEL:'+l+', VALUE:'+v);
  } else if (l) {
    //ga('send', 'event', { eventCategory: c, eventAction: a, eventLabel: l });
    console.log('CATEGORY: '+c+', ACTION:'+a+', LABEL:'+l);
  } else {
    //ga('send', 'event', { eventCategory: c, eventAction: a });
    console.log('CATEGORY: '+c+', ACTION:'+a);
  }
}



var shareOptions = {
  message: 'Dance moves to make your man melt: Play a recording of your economics course lecture and drop to the floor and do the worm. Get intimate at the end by teasing your boobs and putting more clothes on.', // not supported on some apps (Facebook, Instagram)
  subject: 'Great Sex Tip #69,557', // fi. for email
  files: ['', ''], // an array of filenames either locally or remotely
  url: 'https://greatsex.tips',
  chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
}

var onShareSuccess = function(result) {
  alert.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
  alert.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
}
 
var onShareError = function(msg) {
  alert.log("Sharing failed with message: " + msg);
}