// Função para mostrar o formulário e esconder o catálogo
function mostrarFormulario() {
    // Torna o formulário visível e o catálogo invisível
    document.getElementById("form-visibility").style.display = 'block';
    document.getElementById('mr').style.display = 'none';  // Esconde o catálogo
}

// Detecta quando a visibilidade da página muda
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Quando a página estiver oculta, esconder o formulário e mostrar o catálogo novamente
        document.getElementById("form-visibility").style.display = 'none';
        document.getElementById('mr').style.display = 'block'; // Mostrar o catálogo novamente
    } else {
        // Quando a página estiver visível, garantir que o catálogo esteja visível
        // Exemplo de lógica: se o formulário não foi mostrado, exibir o catálogo
        if (document.getElementById("form-visibility").style.display === 'none') {
            document.getElementById('mr').style.display = 'block'; // Exibe o catálogo
        }
    }
});