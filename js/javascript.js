document.addEventListener("DOMContentLoaded", () => {
    const form = document.forms["Formulario"];
    
    if (form) {
        form.addEventListener("submit", function(event) {
            // Prevenir el envío real del formulario para evitar que la página se recargue
            event.preventDefault();
            
            // Mostrar la ventana emergente (pop-up)
            alert("¡Felicidades! Has postulado exitosamente.");
            
            // Reiniciar el formulario
            form.reset();
        });
    }
});
