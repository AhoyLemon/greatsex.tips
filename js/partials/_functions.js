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
  message: null, // not supported on some apps (Facebook, Instagram)
  subject: null, // fi. for email
  files: null, // an array of filenames either locally or remotely
  url: "https://greatsex.tips",
  chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
}

var onShareSuccess = function(result) {
  sendEvent('Share Tip', result.app);
}
 
var onShareError = function(msg) {
  sendEvent('Share Failure', msg);
}