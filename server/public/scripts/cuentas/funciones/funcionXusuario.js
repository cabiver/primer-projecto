'use strict'
let canDelete = true
function actualizarDelete () {
  const arrayAllDelete = document.querySelectorAll('.deleteListener')
  for (let index = 0; index < arrayAllDelete.length; index++) {
    arrayAllDelete[index].addEventListener('click', async e => {
      if (canDelete) {
        canDelete = false
        const formdata = new FormData()
        formdata.set('parametros', e.target.attributes.referen.nodeValue)

        const element = await axios.post('/deleteimagen' + location.pathname, formdata)
        if (element.statusText === 'OK') {
          window.location.reload()
        } else {
          console.log('ocurrio un fallo al eliminar')
        }
      }
    })
  }
}
