const Voice = {}

var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition
var recognition, isListening, isHearing, hearingTimeout, freezeVoiceInput


module.exports.isSupported = () => {
  return !!Recognition
}

var $voiceButton = null
var onTranscriptUpdate = null
module.exports.toggleOn = (voiceButtonSelector, _onTranscriptUpdate) => {
  
  var $newVoiceButton = $(voiceButtonSelector)
  if(!$voiceButton || $newVoiceButton[0] == $voiceButton[0]) {
    if(isListening)
      Voice.stopListening()
    else
      Voice.startListening()
  }
  else {
    if($voiceButton)
      cleanRender()
    Voice.stopListening()
    recognition = null
    Voice.startListening()
  }

  $voiceButton = $newVoiceButton
  onTranscriptUpdate = _onTranscriptUpdate
  renderVoice()
}

module.exports.startListening = Voice.startListening = () => {
  if(!recognition)
    newRecognition()
  recognition.start();
}

module.exports.stopListening = Voice.stopListening = () => {
  if(recognition && isListening)
    recognition.stop();
  else
    freezeVoiceInput = false
}

module.exports.freeze = Voice.freeze = () => {
  freezeVoiceInput = true
}

module.exports.unfreeze = Voice.unfreeze = () => {
  freezeVoiceInput = false
}

function newRecognition() {
  clearTimeout(hearingTimeout)
  recognition = null
  isListening = false
  isHearing = false
  hearingTimeout = null
  freezeVoiceInput = false


  if(Recognition) {
    recognition = new Recognition();
    recognition.lang = 'ja-JP';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    [
     'onstart',
     'onend',
     'onerror',
     'onresult',
     // 'onsoundstart',
     // 'onsoundend',
     // 'onspeechend',
     // 'onaudiostart',
     // 'onaudioend',
     // 'onnomatch',
    ].forEach(function(eventName) {
        recognition[eventName] = function(e) {
            console.log(eventName, e);

            if(eventName == 'onstart') {
              isListening = true
            }

            if(eventName == 'onend') {
              isListening = false
              freezeVoiceInput = false
            }

            if(eventName == 'onresult') {
              if(freezeVoiceInput)
                return

              const results = e.results
              // console.log('numResults', results.length)
              isHearing = true
              clearTimeout(hearingTimeout)
              hearingTimeout = setTimeout(() => {
                isHearing=false
                renderVoice()
              }, 500)

              var transcript = ''
              for(var i=0; i<results.length; i++) {
                var result = results[i]
                // console.log('alternatives', result.length)
                var alt = result[0] //assume only 1 alternative
                transcript += alt.transcript
              }


              // const result0 = results[results.length-1]
              // console.log('alternatives', result0.length)
              // var bestConfidence = -1
              // var bestTranscript = null
              // for(var i=0; i<result0.length; i++) {
              //   const alt = result0[i]
              //   console.log(i + ': ' + alt.transcript + ' (' + alt.confidence + ')')
              //   if(alt.confidence > bestConfidence) {
              //     bestConfidence = alt.confidence
              //     bestTranscript = alt.transcript
              //   }
              // }
              // console.log('----------------')
              onVoiceHeard(transcript)
            }

            if(eventName == 'onerror') {
              console.log('onerror', e)
              isListening = false
              Voice.stopListening()
            }

            renderVoice()
        };
    });
  }
}

function onVoiceHeard(transcript) {
  onTranscriptUpdate(transcript)
  // $('#message-input').val(transcript)
}

function renderVoice() {
  if(isListening) {
    $voiceButton.addClass('btn-success')
    if(isHearing)
      $voiceButton.addClass('pulsing')
    else
      $voiceButton.removeClass('pulsing')
  }
  else {
    cleanRender()
  }
}

function cleanRender() {
  $voiceButton.removeClass('btn-success')
  $voiceButton.removeClass('pulsing')
}


//----------------------------------------------------------------------

var japaneseVoice = null

//init voice
// window.speechSynthesis.onvoiceschanged = function() {
//   var voices = window.speechSynthesis.getVoices()
//   for(var voice of voices) {
//     //android chrome was 'ja_JP'
//     if(voice.lang.toLowerCase() == 'ja-jp' || voice.lang.toLowerCase() == 'ja_jp') { 
//       japaneseVoice = voice
//       break
//     }
//   }
// }


function ensureJapaneseVoice() {
  if(japaneseVoice)
    return

  var voices = window.speechSynthesis.getVoices()
  for(var voice of voices) {
    //android chrome was 'ja_JP'
    if(voice.lang.toLowerCase() == 'ja-jp' || voice.lang.toLowerCase() == 'ja_jp') { 
      japaneseVoice = voice
      break
    }
  }
}

module.exports.speak = (msg) => {
  ensureJapaneseVoice()
  if(!japaneseVoice) {
    console.log('no voice to speak')
    return
  }
  var utterThis = new SpeechSynthesisUtterance(msg)
  utterThis.voice = japaneseVoice
  window.speechSynthesis.speak(utterThis)
}

module.exports.speakWith = (msg, langCode='ja-JP') => {
  var voices = window.speechSynthesis.getVoices()
  for(var voice of voices) {
    if(voice.lang == langCode) {
      var utterThis = new SpeechSynthesisUtterance(msg)
      utterThis.voice = voice
      window.speechSynthesis.speak(utterThis)
      break
    }
  }
}
// window.speakWith = module.exports.speakWith