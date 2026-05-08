$(document).ready(function() {
    $('#formularioPostulacion').submit(function(event) {
        let esValido = true;
        
        // Limpiar mensajes de error previos
        $('.error-msg').remove();

        // Función para agregar el mensaje de error debajo del input
        function mostrarError(elemento, mensaje) {
            $(elemento).after('<span class="error-msg" style="color: #dc3545; font-size: 0.85em; display: block; margin-top: -10px; margin-bottom: 10px;">' + mensaje + '</span>');
        }

        // Función auxiliar para validar campos de texto
        function validarCampoTexto(id, nombreCampo) {
            let elemento = $('#' + id);
            let valor = elemento.val().trim();
            if (valor === '') {
                mostrarError(elemento, 'El campo ' + nombreCampo + ' está vacío.');
                esValido = false;
            }
        }

        // Validar los campos de texto
        validarCampoTexto('nombre', 'Nombre');
        validarCampoTexto('apellido', 'Apellido');
        validarCampoTexto('email', 'Email');
        validarCampoTexto('telefono', 'Teléfono');
        validarCampoTexto('especialidad', 'Especialidad');

        // Validar radio buttons (Área de Interés)
        if ($('input[name="area_interes"]:checked').length === 0) {
            $('.formulario-radio-grupo').after('<span class="error-msg" style="color: #dc3545; font-size: 0.85em; display: block; margin-top: 5px; margin-bottom: 10px;">Debe seleccionar un área de interés.</span>');
            esValido = false;
        }

        // Si el formulario no es válido, prevenir el envío
        if (!esValido) {
            event.preventDefault(); // Evita que se envíe el formulario
        } else {
            // Mensaje de éxito si todo está correcto
            alert('Felicidades, has postulado exitosamente');
        }
    });

    // Validación para el formulario ultra simple
    $("#formularioSimple").submit(function(event) {
        // Limpiar mensaje de error previo
        event.preventDefault();

        let nombre = $("#nombreSimple").val();
        let correo = $("#correo").val();
        if (nombre === '' || correo === '') {
            // Mostrar mensaje de error
            $("#mensaje").text('debes escribir un nombre y correo').css('color', 'red');
        } else {
            $("#mensaje").text('Formulario simple enviado con éxito').css('color', 'green');
        }
    });
});


