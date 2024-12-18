function createAlert() {
    // Criando o container principal para o alert
    const alertContainer = document.createElement("div");
    alertContainer.classList.add('custom-alert');
    alertContainer.style.display = 'none'; // Inicialmente o alert fica invisível

    // Criando a caixa de alert
    const alertBox = document.createElement('div');
    alertBox.classList.add('alert-box');

    // Criando a mensagem do alert
    const alertMensage = document.createElement('p');
    alertMensage.classList.add('alert-mens');

    // Criando a botonera de alert
    const alertConfirm = document.createElement('button');
    alertConfirm.classList.add("alert-confirm", "mx-4");
    alertConfirm.textContent = 'Confirmar';

    const alertCarrito = document.createElement('button');
    alertCarrito.classList.add('alert-direct', "mx-4");
    alertCarrito.textContent = 'Mirar carrito';

    // Adicionando os elementos ao DOM
    alertBox.appendChild(alertMensage);
    alertBox.appendChild(alertCarrito);
    alertBox.appendChild(alertConfirm);
    alertContainer.appendChild(alertBox);
    document.body.appendChild(alertContainer);

    // Função para exibir o alert
    function showAlert(mensage) {
        alertMensage.textContent = mensage;
        alertContainer.style.display = 'block'; // Exibe o alert quando chamado
    }

    // Função para fechar o alert
    function closeAlert() {
        alertContainer.style.display = 'none'; // Esconde o alert quando confirmado
    }

    alertConfirm.addEventListener('click', closeAlert);
    alertCarrito.addEventListener('click', openCarrito); // Substitua openCarrito com a função desejada
    alertCarrito.addEventListener('click', closeAlert)

    return showAlert;
}
