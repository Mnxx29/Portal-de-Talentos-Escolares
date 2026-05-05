
function validarFormulario() {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;

    if (nombre.trim() === '') {
        alert('Por favor, ingrese su nombre. Este campo es obligatorio.');
        console.log('Validación fallida: El campo nombre está vacío.');
        return false; 
    }

    console.log('Validación exitosa. Enviando formulario de: ' + nombre + ' ' + apellido);
    return true; 
}