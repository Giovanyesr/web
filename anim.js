// Sincronizar el mensaje con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

if (audio && lyrics) {
  let currentMessageIndex = -1; // Para evitar reescribir si el mensaje no ha cambiado
  let isTyping = false; // Bandera para controlar el efecto de escritura

  // Letras del mensaje y su tiempo de aparición
  var messageData = [
    {
      text: "Cuando llega las 12",
      time: 17,
    },
    {
      text: "Y se apague la luz",
      time: 20,
    },
    {  
      text: "Cuando venga un recuerdo a mi mente quiero que seas tu",
      time: 24,
    },
    {
      text: "Quiero verme en tu mirada y cantarte a viva voz",
      time: 31,
    },
    {
      text: "El cumpleaños mas hermoso que existio",
      time: 37,
    },
    {
      text: "Un año mas de vida",
      time: 44,
    },
    {
      text: "Que te regala Dios",
      time: 47,
    },
    {
      text: "Que toda tu familia se pueda reunir hoy",
      time: 51,
    },
    {
      text: "Un año mas de vida",
      time: 57,
    },
    {
      text: "Para vivir mejor",
      time: 60,
    },
    {
      text: "Porque el mejor regalo es ver la luz de sol",
      time: 63,
    },
    {
      text: ".............................................",
      time: 69,
    },
  ];

  function updateMessage() {
    let time = Math.floor(audio.currentTime);
    let nextMessageIndex = messageData.findIndex(
      (line) => time >= line.time && time < line.time + 2
    );

    if (nextMessageIndex !== -1 && nextMessageIndex !== currentMessageIndex) {
      currentMessageIndex = nextMessageIndex;
      showMessage(messageData[nextMessageIndex].text);
    }

    requestAnimationFrame(updateMessage);
  }

  function showMessage(text) {
    if (isTyping) return;
    isTyping = true;

    lyrics.innerHTML = ""; // Limpiar el contenido
    let index = 0;

    function typeWriter() {
      if (index < text.length) {
        lyrics.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 50); // Velocidad de escritura
      } else {
        isTyping = false;
      }
    }
    typeWriter();
  }

  // Iniciar la actualización del mensaje cuando comience la canción
  audio.addEventListener("play", function () {
    updateMessage();
  });

  // Función para ocultar el título después de un tiempo
  function ocultarTitulo() {
    var titulo = document.querySelector(".titulo");
    if (titulo) {
      titulo.style.animation = "fadeOut 3s ease-in-out forwards";
      setTimeout(function () {
        titulo.style.display = "none";
      }, 3000);
    }
  }

  setTimeout(ocultarTitulo, 216000);
}
