document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("miformulario");

    //Function generica que debe mostrar los alerts en el campo
    function mostrarErro(campo, mensagem, color) {
        const inputField = document.getElementById(campo);
        let alerta = inputField.nextElementSibling;

        // Se o alerta já existe, reutilize-o
        if (!alerta || !alerta.classList.contains("alert")) {
            alerta = document.createElement("div");
            alerta.className = `alert alert-${color}`;
            alerta.role = "alert";
            inputField.insertAdjacentElement("afterend", alerta);
        }
        alerta.textContent = mensagem;

        // Adiciona a classe 'is-invalid' no campo
        inputField.classList.add("is-invalid");
    }

    //function para limpiar errores
    function limparErro(campo) {
        const inputField = document.getElementById(campo);
        const alerta = inputField.nextElementSibling;

        inputField.classList.remove("is-invalid", "is-valid");
        inputField.classList.add("is-valid");

        // Remove o alerta, se existir
        if (alerta && alerta.classList.contains("alert")) {
            alerta.remove();
        }
    }

    // Function para verificar si la data es un final de semana
    function esFinDeSemana(fecha) {
        const dia = fecha.getDay();
        return dia === 6 || dia === 0; // 6 = Sábado, 0 = Domingo
    }
    
    formulario.addEventListener("submit", function (event){
        event.preventDefault();

        // Capturar os valores dos campos

        let valid = true;

        // Captura dos campos
        const camposObrigatorios = [
            "email", "nombre", "apellido", "dni", "telefono",
            "direccion", "dpto", "fecha", "tarjeta", 
            "nombreyapellido", "num_tarjeta", "mes", "ano",
            "cuotas", "codigo", "dnicomprador"
        ];


        // Validação de NOMBRE
        const nombre = document.getElementById("nombre").value.trim();
        const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!regexLetras.test(nombre)) {
            mostrarErro("nombre", "El campo 'Nombre' debe contener solo letras.", "danger");
            valid = false;
        } else {
            limparErro("nombre");
        }

        // Vali de APELLIDO
        const apellido = document.getElementById("apellido").value.trim();
        if (!regexLetras.test(apellido)) {
            mostrarErro("apellido", "El campo 'Apellido' debe contener solo letras.", "danger");
            valid = false;
        } else {
            limparErro("apellido");
        }

        // Validacion de EMAIL
        const email = document.getElementById("email").value.trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            mostrarErro("email", "El campo 'Email' debe ser un correo válido.", "primary");
            valid = false;
        } else {
            limparErro("email");
        }

        // Validacion de NUMEROS: DNI, TELEFONE
        const dni = document.getElementById("dni").value.trim();
        const regexNumeros = /^[0-9]+$/;
        if (!regexNumeros.test(dni)) {
            mostrarErro("dni", "El campo 'DNI' debe contener solo números.", "danger");
            valid = false;
        } else {
            limparErro("dni");
        }

        const telefono = document.getElementById("telefono").value.trim();
        if (!regexNumeros.test(telefono)) {
            mostrarErro("telefono", "El campo 'Teléfono' debe contener solo números.", "warning");
            valid = false;
        } else {
            limparErro("telefono");
        }
        // Valida se os campos estão vazios
        camposObrigatorios.forEach(campo => {
            const valor = document.getElementById(campo).value.trim();
            if (valor === "" || valor === "Seleccione el tipo de tarjeta" || valor === "Mes de vencimento" || valor === "Año de vencimento" || valor === "Seleccione la cantidad de cuotas") {
                mostrarErro(campo, "Este campo es obligatorio.", "danger");
                valid = false;
            } else {
                limparErro(campo);
            }
        });

        // Validação específica para fecha de envio
        const fechaEnvio = document.getElementById("fecha").value;
        if (fechaEnvio) {
            const fecha = new Date(fechaEnvio);
            if (esFinDeSemana(fecha)) {
                mostrarErro("fecha", "La fecha de envío no puede ser un fin de semana.", "warning");
                valid = false;
            } else {
                limparErro("fecha");
            }
        }

        // Validação do número da tarjeta
        const numTarjeta = document.getElementById("num_tarjeta").value.trim();
        if (!/^\d+$/.test(numTarjeta)) {
            mostrarErro("num_tarjeta", "El número de tarjeta debe contener solo números.", "primary");
            valid = false;
        } else {
            limparErro("num_tarjeta");
        }

        // Validação do ANO DE VENCIMENTO
        const anoTarjeta = parseInt(document.getElementById("ano").value.trim());
        const anoAtual = new Date().getFullYear();
        if (anoTarjeta <= anoAtual || isNaN(anoTarjeta)) {
            mostrarErro("ano", "El año de vencimiento no puede ser menor o igual al actual.", "warning");
            valid = false;
        } else {
            limparErro("ano");
        }

        // Validação do código de segurança
        const codigoSeguridad = document.getElementById("codigo").value.trim();
        if (!/^\d{3}$/.test(codigoSeguridad)) {
            mostrarErro("codigo", "El 'Código de seguridad' debe tener 3 números.", "danger");
            valid = false;
        } else {
            limparErro("codigo");
        }

        // Validação final para submissão
        if (valid) {
            console.log("Formulario enviado exitosamente");
            formulario.submit();
            clearCart();
        }
    });
});

// Função para calcular o total
function calcularTotal() {
    let total = 0;
    // Aqui você pode usar seu array de "carrito" para calcular o total
    for (const productoId in carrito) {
        const item = carrito[productoId];
        const itemTotal = item.price * item.cantidad;
        total += itemTotal;
    }
    return total;
}

// Função para atualizar o valor total a pagar
function atualizarTotalPagar() {
    const totalPagarElement = document.getElementById("totalPagar");
    if (totalPagarElement) {
        const total = calcularTotal();
        // Atualizando o conteúdo do span com o valor total
        totalPagarElement.textContent = `U$${total.toFixed(2)}`; // Formato monetário
    }
}

// Função para calcular o total
function calcularTotal() {
    let total = 0;
    // Aqui você pode usar seu array de "carrito" para calcular o total
    for (const productoId in carrito) {
        const item = carrito[productoId];
        const itemTotal = item.price * item.cantidad;
        total += itemTotal;
    }
    return total;
}

// Função para atualizar o valor total a pagar
function atualizarTotalPagar() {
    const totalPagarElement = document.getElementById("totalPagar");
    if (totalPagarElement) {
        const total = calcularTotal();
        // Atualizando o conteúdo do span com o valor total
        totalPagarElement.textContent = `U$${total.toFixed(2)}`; // Formato monetário
    }
}

// Função para exibir as parcelas
function exibirParcelas() {
    const total = calcularTotal();
    const cuotasSelect = document.getElementById("cuotas");
    const cuotasDetalhe = document.getElementById("cuotasDetalle");
    const cuotasValue = cuotasSelect.value;
    const tarjetaValue = document.getElementById("tarjeta").value;

    // Limpar o conteúdo anterior
    while (cuotasDetalhe.firstChild) {
        cuotasDetalhe.removeChild(cuotasDetalhe.firstChild);
    }

    // Verifica se o tipo de tarjeta é "Crédito" e se foi selecionada uma quantidade de cuotas
    if (tarjetaValue === "2" && cuotasValue !== "0") {
        let numCuotas;
        switch (cuotasValue) {
            case "1":
                numCuotas = 1;
                break;
            case "2":
                numCuotas = 3;
                break;
            case "3":
                numCuotas = 6;
                break;
            default:
                numCuotas = 0;
        }

        const cuotaValor = total / numCuotas;

        // Criando elementos de texto para exibir as informações sobre as parcelas
        const cuotasText = document.createElement("p");
        cuotasText.textContent = `La cantidad de cuotas seleccionada es: ${numCuotas} cuota(s).`;
        cuotasDetalhe.appendChild(cuotasText);

        const cuotaValorText = document.createElement("p");
        cuotaValorText.textContent = `El valor por cuota es: U$${cuotaValor.toFixed(2)}`;
        cuotasDetalhe.appendChild(cuotaValorText);

        // Exibe a seção de cuotas
        cuotasDetalhe.style.display = "block";
    } else {
        // Oculta a seção de cuotas se a tarjeta não for "Crédito" ou não for selecionada uma quantidade de cuotas
        cuotasDetalhe.style.display = "none";
    }
}

// Função para atualizar tanto o total quanto as parcelas
function atualizarValores() {
    atualizarTotalPagar();
    exibirParcelas();
}

// Adicionando os ouvintes de eventos para os selects
document.getElementById("tarjeta").addEventListener("change", atualizarValores);
document.getElementById("cuotas").addEventListener("change", atualizarValores);

// Inicializando os valores
atualizarValores();
