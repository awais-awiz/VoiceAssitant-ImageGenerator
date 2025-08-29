const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// One-shot speech recognition (no silent timeout)
export const startBasicRecognition = (onResult, onError = null) => {

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const spokenText = event.results[0][0].transcript;
    onResult(spokenText); // call your callback with the text
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    if (onError) onError(event.error);
    else alert('Speech recognition error occurred.');
  };


  recognition.start();
};

// Text-to-speech (unchanged)
export const speak = (text) => {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  synth.speak(utter);
};