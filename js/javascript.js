$(document).ready(function() {
    console.log("Documento listo. Inicializando validaciones de formularios...");

    $('#formularioPostulacion').submit(function(event) {
        console.log("--- Iniciando validación del Formulario de Postulación ---");
        let esValido = true;
        
        // Limpiar mensajes de error previos
        $('.error-msg').remove();

        // Función para agregar el mensaje de error debajo del input y mostrar en consola
        function mostrarError(elemento, mensaje) {
            $(elemento).after('<span class="error-msg" style="color: #dc3545; font-size: 0.85em; display: block; margin-top: -10px; margin-bottom: 10px;">' + mensaje + '</span>');
            console.log("❌ Error de validación en campo:", $(elemento).attr('id') || $(elemento).attr('name'), "-", mensaje);
        }

        // Función auxiliar para validar campos de texto (Solo letras y tamaño mínimo)
        function validarCampoTextoLetras(id, nombreCampo) {
            let elemento = $('#' + id);
            let valor = elemento.val().trim();
            const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

            if (valor === '') {
                mostrarError(elemento, 'El campo ' + nombreCampo + ' es obligatorio.');
                esValido = false;
            } else if (valor.length < 3) {
                mostrarError(elemento, 'El campo ' + nombreCampo + ' debe tener al menos 3 caracteres.');
                esValido = false;
            } else if (!regexLetras.test(valor)) {
                mostrarError(elemento, 'El campo ' + nombreCampo + ' solo debe contener letras.');
                esValido = false;
            } else {
                console.log("✅ Validación exitosa para:", nombreCampo);
            }
        }

        // Función auxiliar para validar RUT
        function validarRut(id) {
            let elemento = $('#' + id);
            let valor = elemento.val().trim();
            
            // Limpiar puntos y guión para validar solo números y K
            let rutLimpio = valor.replace(/[^0-9kK]/g, '').toUpperCase();

            if (valor === '') {
                mostrarError(elemento, 'El RUT es obligatorio.');
                esValido = false;
                return;
            }

            if (rutLimpio.length < 2) {
                mostrarError(elemento, 'RUT inválido. Debe contener al menos el dígito verificador.');
                esValido = false;
                return;
            }

            let cuerpo = rutLimpio.slice(0, -1);
            let dv = rutLimpio.slice(-1);

            if (!/^[0-9]+$/.test(cuerpo)) {
                mostrarError(elemento, 'RUT inválido. Formato incorrecto.');
                esValido = false;
                return;
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
                esValido = false;
            } else {
                console.log("✅ Validación exitosa para: RUT");
            }
        }

        // Función auxiliar para validar Email
        function validarEmail(id) {
            let elemento = $('#' + id);
            let valor = elemento.val().trim();
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (valor === '') {
                mostrarError(elemento, 'El Email es obligatorio.');
                esValido = false;
            } else if (!regexEmail.test(valor)) {
                mostrarError(elemento, 'Por favor, ingrese un Email válido.');
                esValido = false;
            } else {
                console.log("✅ Validación exitosa para: Email");
            }
        }

        // Función auxiliar para validar Teléfono (solo números)
        function validarTelefono(id) {
            let elemento = $('#' + id);
            let valor = elemento.val().trim();
            const regexTelefono = /^[0-9]{8,15}$/; // Entre 8 y 15 dígitos numéricos

            if (valor === '') {
                mostrarError(elemento, 'El Teléfono es obligatorio.');
                esValido = false;
            } else if (!regexTelefono.test(valor)) {
                mostrarError(elemento, 'El Teléfono debe contener entre 8 y 15 dígitos numéricos.');
                esValido = false;
            } else {
                console.log("✅ Validación exitosa para: Teléfono");
            }
        }

        // Validar todos los campos paso a paso
        console.log("Validando RUT...");
        validarRut('rut');

        console.log("Validando Nombre...");
        validarCampoTextoLetras('nombre', 'Nombre');

        console.log("Validando Apellido...");
        validarCampoTextoLetras('apellido', 'Apellido');

        console.log("Validando Email...");
        validarEmail('email');

        console.log("Validando Teléfono...");
        validarTelefono('telefono');

        console.log("Validando Campus...");
        let campusVal = $('#campus').val();
        if (!campusVal) {
            mostrarError($('#campus'), 'Debe seleccionar un campus.');
            esValido = false;
        } else {
            console.log("✅ Validación exitosa para: Campus");
        }

        console.log("Validando Área de Interés (Radio Buttons)...");
        if ($('input[name="area_interes"]:checked').length === 0) {
            $('.formulario-radio-grupo').after('<span class="error-msg" style="color: #dc3545; font-size: 0.85em; display: block; margin-top: 5px; margin-bottom: 10px;">Debe seleccionar un área de interés.</span>');
            console.log("❌ Error de validación en campo: area_interes - Debe seleccionar un área de interés.");
            esValido = false;
        } else {
            console.log("✅ Validación exitosa para: Área de Interés");
        }

        console.log("Validando Especialidad...");
        let elementoEspecialidad = $('#especialidad');
        if (elementoEspecialidad.val().trim() === '') {
            mostrarError(elementoEspecialidad, 'La Especialidad es obligatoria.');
            esValido = false;
        } else if (elementoEspecialidad.val().trim().length < 3) {
            mostrarError(elementoEspecialidad, 'La Especialidad debe tener al menos 3 caracteres.');
            esValido = false;
        } else {
            console.log("✅ Validación exitosa para: Especialidad");
        }

        // Si el formulario no es válido, prevenir el envío
        if (!esValido) {
            console.warn("⚠️ El formulario tiene errores de validación y no se enviará.");
            event.preventDefault(); // Evita que se envíe el formulario
        } else {
            console.log("🎉 El formulario es válido. Enviando datos...");
            // Mensaje de éxito si todo está correcto
            alert('Felicidades, has postulado exitosamente');
        }
    });
});
