// Funcion para mostra el formulario y esconder el catalogo
function mostrarFormulario() {
    // Envolve el formulario visible y el catalogo invisible 
    document.getElementById("form-visibility").style.display = 'block';
    document.getElementById('mr').style.display = 'none';  // Esconde el catálogo
}

// Detecta cuando cambia la visibilidad de la página
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Cuando se oculte la página, oculte el formulario y vuelva a mostrar el catálogo
        document.getElementById("form-visibility").style.display = 'none';
        document.getElementById('mr').style.display = 'block'; // Mostrar o catálogo novamente
    } else {
        // Cuando la página es visible, asegurarse de que el catálogo es visible
        // Ejemplo lógico: si no se muestra el formulario, mostrar el catálogo
        if (document.getElementById("form-visibility").style.display === 'none') {
            document.getElementById('mr').style.display = 'block'; // Exibe o catálogo
        }
    }
});