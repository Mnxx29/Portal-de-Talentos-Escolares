$(document).ready(function() {
    console.log("Documento listo. Inicializando validaciones de formularios...");

    // =====================================================
    // Funciones de validación reutilizables (retornan true/false)
    // =====================================================

    // Función para mostrar error debajo de un elemento
    function mostrarError(elemento, mensaje) {
        // Primero quitar error previo de este campo
        $(elemento).next('.error-msg').remove();
        $(elemento).after('<span class="error-msg" style="color: #dc3545; font-size: 0.85em; display: block; margin-top: -10px; margin-bottom: 10px;">' + mensaje + '</span>');
        console.log("❌ Error:", $(elemento).attr('id') || $(elemento).attr('name'), "-", mensaje);
    }

    // Función para limpiar error de un elemento
    function limpiarError(elemento) {
        $(elemento).next('.error-msg').remove();
    }

    // Validar campo de texto (solo letras, mínimo 3 caracteres)
    function validarCampoTextoLetras(id, nombreCampo) {
        let elemento = $('#' + id);
        let valor = elemento.val().trim();
        const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

        limpiarError(elemento);

        if (valor === '') {
            mostrarError(elemento, 'El campo ' + nombreCampo + ' es obligatorio.');
            return false;
        } else if (valor.length < 3) {
            mostrarError(elemento, 'El campo ' + nombreCampo + ' debe tener al menos 3 caracteres.');
            return false;
        } else if (!regexLetras.test(valor)) {
            mostrarError(elemento, 'El campo ' + nombreCampo + ' solo debe contener letras.');
            return false;
        }
        console.log("✅ Validación exitosa para:", nombreCampo);
        return true;
    }

    // Validar RUT chileno
    function validarRut(id) {
        let elemento = $('#' + id);
        let valor = elemento.val().trim();
        let rutLimpio = valor.replace(/[^0-9kK]/g, '').toUpperCase();

        limpiarError(elemento);

        if (valor === '') {
            mostrarError(elemento, 'El RUT es obligatorio.');
            return false;
        }
        if (rutLimpio.length < 2) {
            mostrarError(elemento, 'RUT inválido. Debe contener al menos el dígito verificador.');
            return false;
        }

        let cuerpo = rutLimpio.slice(0, -1);
        let dv = rutLimpio.slice(-1);

        if (!/^[0-9]+$/.test(cuerpo)) {
            mostrarError(elemento, 'RUT inválido. Formato incorrecto.');
            return false;
        }

        // Calcular Dígito Verificador (Módulo 11)
        let suma = 0;
        let multiplo = 2;
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma = suma + multiplo * cuerpo.charAt(i);
            if (multiplo < 7) {
                multiplo = multiplo + 1;
            } else {
                multiplo = 2;
            }
        }

        let dvEsperado = 11 - (suma % 11);
        let dvCalculado = (dvEsperado === 11) ? "0" : (dvEsperado === 10) ? "K" : dvEsperado.toString();

        if (dvCalculado !== dv) {
            mostrarError(elemento, 'El RUT ingresado no es válido (Dígito verificador incorrecto).');
            return false;
        }
        console.log("✅ Validación exitosa para: RUT");
        return true;
    }

    // Validar Email
    function validarEmail(id) {
        let elemento = $('#' + id);
        let valor = elemento.val().trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        limpiarError(elemento);

        if (valor === '') {
            mostrarError(elemento, 'El Email es obligatorio.');
            return false;
        } else if (!regexEmail.test(valor)) {
            mostrarError(elemento, 'Por favor, ingrese un Email válido.');
            return false;
        }
        console.log("✅ Validación exitosa para: Email");
        return true;
    }

    // Validar Teléfono
    function validarTelefono(id) {
        let elemento = $('#' + id);
        let valor = elemento.val().trim();
        const regexTelefono = /^[0-9]{8,15}$/;

        limpiarError(elemento);

        if (valor === '') {
            mostrarError(elemento, 'El Teléfono es obligatorio.');
            return false;
        } else if (!regexTelefono.test(valor)) {
            mostrarError(elemento, 'El Teléfono debe contener entre 8 y 15 dígitos numéricos.');
            return false;
        }
        console.log("✅ Validación exitosa para: Teléfono");
        return true;
    }

    // Validar Campus (select)
    function validarCampus() {
        let elemento = $('#campus');
        let valor = elemento.val();

        limpiarError(elemento);

        if (!valor) {
            mostrarError(elemento, 'Debe seleccionar un campus.');
            return false;
        }
        console.log("✅ Validación exitosa para: Campus");
        return true;
    }

    // Validar Área de Interés (radio buttons)
    function validarAreaInteres() {
        // Limpiar error previo del grupo de radio
        $('.formulario-radio-grupo').next('.error-msg').remove();

        if ($('input[name="area_interes"]:checked').length === 0) {
            $('.formulario-radio-grupo').after('<span class="error-msg" style="color: #dc3545; font-size: 0.85em; display: block; margin-top: 5px; margin-bottom: 10px;">Debe seleccionar un área de interés.</span>');
            console.log("❌ Error: area_interes - Debe seleccionar un área de interés.");
            return false;
        }
        console.log("✅ Validación exitosa para: Área de Interés");
        return true;
    }

    // Validar Especialidad
    function validarEspecialidad() {
        let elemento = $('#especialidad');
        let valor = elemento.val().trim();

        limpiarError(elemento);

        if (valor === '') {
            mostrarError(elemento, 'La Especialidad es obligatoria.');
            return false;
        } else if (valor.length < 3) {
            mostrarError(elemento, 'La Especialidad debe tener al menos 3 caracteres.');
            return false;
        }
        console.log("✅ Validación exitosa para: Especialidad");
        return true;
    }

    // =====================================================
    // Validación en tiempo real (al escribir / cambiar)
    // =====================================================

    $('#rut').on('input blur', function() {
        validarRut('rut');
    });

    $('#nombre').on('input blur', function() {
        validarCampoTextoLetras('nombre', 'Nombre');
    });

    $('#apellido').on('input blur', function() {
        validarCampoTextoLetras('apellido', 'Apellido');
    });

    $('#email').on('input blur', function() {
        validarEmail('email');
    });

    $('#telefono').on('input blur', function() {
        validarTelefono('telefono');
    });

    $('#campus').on('change blur', function() {
        validarCampus();
    });

    $('input[name="area_interes"]').on('change', function() {
        validarAreaInteres();
    });

    $('#especialidad').on('input blur', function() {
        validarEspecialidad();
    });

    // =====================================================
    // Validación final en el submit
    // =====================================================

    $('#formularioPostulacion').submit(function(event) {
        console.log("--- Iniciando validación final del Formulario de Postulación ---");

        // Ejecutar todas las validaciones
        let r1 = validarRut('rut');
        let r2 = validarCampoTextoLetras('nombre', 'Nombre');
        let r3 = validarCampoTextoLetras('apellido', 'Apellido');
        let r4 = validarEmail('email');
        let r5 = validarTelefono('telefono');
        let r6 = validarCampus();
        let r7 = validarAreaInteres();
        let r8 = validarEspecialidad();

        let esValido = r1 && r2 && r3 && r4 && r5 && r6 && r7 && r8;

        // Si el formulario no es válido, prevenir el envío
        if (!esValido) {
            console.warn("⚠️ El formulario tiene errores de validación y no se enviará.");
            event.preventDefault();
        } else {
            console.log("🎉 El formulario es válido. Mostrando éxito...");
            event.preventDefault(); // Evita el envío real para mostrar popup y no cambiar de página

            let nombrePostulante = $('#nombre').val().trim();

            // Mensaje de éxito estilizado con SweetAlert2
            Swal.fire({
                title: '¡Felicidades!',
                text: nombrePostulante + ', has postulado con éxito.',
                icon: 'success',
                confirmButtonColor: '#6c63ff',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                // Al cerrar el popup, limpiamos el formulario
                if (result.isConfirmed || result.isDismissed) {
                    $('#formularioPostulacion')[0].reset();
                    // Limpiar mensajes de error previos si quedaran
                    $('.error-msg').remove();
                }
            });
        }
    });
});
