'use strict'
const botonDeAmistad = document.getElementById('main-another-cuenta.js-agregar_persona_amigo')
botonDeAmistad.addEventListener('click', async () => {
  const res = await axios.post(window.location.pathname)
  if (res.statusText === 'OK') {
    if (botonDeAmistad.innerHTML === 'dejar de segir') {
      botonDeAmistad.innerHTML = 'agregar a amigos'
    } else {
      botonDeAmistad.innerHTML = 'dejar de segir'
    }
  }
})
