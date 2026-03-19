function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chatMessages");

  if (!input.value.trim()) return;

  const userText = input.value;

  // USER MESSAGE
  const userDiv = document.createElement("div");
  userDiv.className = "msg-user";
  userDiv.textContent = userText;
  chat.appendChild(userDiv);

  input.value = "";

  // BOT TYPING
  const botDiv = document.createElement("div");
  botDiv.className = "msg-bot";
  botDiv.textContent = "Typing...";
  chat.appendChild(botDiv);

  const replies = [
    "Use nitrogen fertilizer in early growth stage.",
    "Try neem oil spray for pest control.",
    "Rain expected — avoid irrigation.",
    "Use compost to improve soil health.",
    "Rotate crops next season for better yield."
  ];

  setTimeout(() => {
    const reply = replies[Math.floor(Math.random() * replies.length)];
    botDiv.textContent = reply;

    speak(reply);

    chat.scrollTop = chat.scrollHeight;
  }, 800);
}

// 🎤 VOICE INPUT
function startVoice() {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Voice not supported");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-IN";

  recognition.onresult = (event) => {
    document.getElementById("userInput").value =
      event.results[0][0].transcript;
  };

  recognition.start();
}

// 🔊 SPEAK
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-IN";
  window.speechSynthesis.speak(speech);
}