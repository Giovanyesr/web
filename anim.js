// Sincronizar el mensaje con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

if (audio && lyrics) {
  let currentMessageIndex = -1; // Para evitar reescribir si el mensaje no ha cambiado
  let isTyping = false; // Bandera para controlar el efecto de escritura

  // Letras del mensaje y su tiempo de aparición
  var messageData = [
    {
      text: "A veces, la vida nos lleva por caminos distintos, pero hay algo que quiero que nunca olvides: siempre estaré aquí para ti",
      time: 10,
    },
    {
      text: "No importa cuánto tiempo pase ni qué tan lejos estemos, en los momentos difíciles es cuando más puedes contar conmigo",
      time: 20,
    },
    {
      text: "Hoy, en este 14 de febrero, te dedico estas flores y esta canción, la misma que una vez compartimos, porque hay sentimientos que el tiempo no borra",
      time: 35,
    },
    {
      text: "Aunque la distancia nos ponga a prueba y el destino nos haga tomar rumbos diferentes, mi presencia sigue intacta",
      time: 50,
    },
  ];

  function updateMessage() {
    let time = Math.floor(audio.currentTime);
    let nextMessageIndex = messageData.findIndex(
      (line) => time >= line.time && time < line.time + 8
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
