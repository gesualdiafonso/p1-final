class Detalles {
    constructor(id, name, price, stock, categoria, descriptionUno, descriptionDos, porque, respuesta, features, imageBack, image1, image2, image3) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.categoria = categoria;
        this.descriptionUno = descriptionUno;
        this.descriptionDos = descriptionDos;
        this.porque = porque;
        this.respuesta = respuesta;
        this.features = features;
        this.imageBack = imageBack;
        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
    }

    // Método para inserir as informações do produto no modal
    toModalDOM() {
        // Criação do fundo do modal e o conteúdo
        const backgroundModal = document.createElement("div");
        backgroundModal.classList.add("modal-background");

        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content", "w-50", "px-3", "d-flex", "flex-column");

        // Cabeçalho do modal
        const modalHeader = document.createElement("div");
        modalHeader.classList.add("d-flex", "flex-row", "justify-content-between", "align-items-center", "w-100");

        const modalTitle = document.createElement("h3");
        modalTitle.textContent = "Detalles del Producto";

        const closeButton = document.createElement("button");
        closeButton.id = "closeModal";
        closeButton.type = "button";
        closeButton.classList.add("btn", "btn-primary");
        closeButton.textContent = "Cerrar";

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);

        // Linha divisória
        const hr = document.createElement("hr");

        // Corpo do modal
        const modalInfo = document.createElement("div");
        modalInfo.classList.add("modal-info", "w-100");

        // Imagem do produto
        const productoImageContainer = document.createElement("div");
        productoImageContainer.classList.add("w-100", "text-center");

        // Imagem principal
        const productoImage = document.createElement("img");
        productoImage.src = this.imageBack;
        productoImage.alt = this.name;
        productoImage.classList.add("img-fluid", "main-image"); // Imagem principal com classe 'main-image'
        productoImageContainer.appendChild(productoImage);

        // Galeria de imagens
        const galleryContainer = document.createElement("div");
        galleryContainer.classList.add("d-flex", "gap-2", "justify-content-center", "mt-3");

        const images = [this.imageBack, this.image1, this.image2, this.image3];
        images.forEach((imageSrc) => {
            const thumbnail = document.createElement("img");
            thumbnail.src = imageSrc;
            thumbnail.alt = this.name;
            thumbnail.classList.add("img-thumbnail", "gallery-image", "thumbnail"); // Miniatura com classe 'thumbnail'
            thumbnail.addEventListener("click", () => changeMainImage(imageSrc)); // Trocar imagem principal
            galleryContainer.appendChild(thumbnail);
        });

        // Função para trocar a imagem principal
        const changeMainImage = (src) => {
            productoImage.src = src;
        };

        // Descrição do produto
        const descriptionUno = document.createElement("p");
        descriptionUno.classList.add("w-100", "mt-5", "mb-2");
        descriptionUno.textContent = `${this.descriptionUno}`;

        const descriptionDos = document.createElement("p");
        descriptionDos.classList.add("w-100", "mt-1", "mb-4");
        descriptionDos.textContent = `${this.descriptionDos}`;

        // Características
        const productFeaturesContainer = document.createElement("div");
        productFeaturesContainer.classList.add("w-100", "bg-dark", "bg-gradient", "border", "border-1", "rounded-3", "text-white");

        const productFeatures = document.createElement("div");
        productFeatures.textContent = "Características";
        productFeaturesContainer.appendChild(productFeatures);

        if (this.features) {
            const caracteristicasTabla = document.createElement("table");
            caracteristicasTabla.classList.add("table", "table-striped", "text-white");
            const thead = document.createElement("thead");
            thead.innerHTML = `<tr><th>Característica</th><th>Valor</th></tr>`;
            const tbody = document.createElement("tbody");

            for (let [feature, value] of Object.entries(this.features)) {
                const row = document.createElement("tr");
                const featureCell = document.createElement("td");
                featureCell.textContent = feature;
                const valueCell = document.createElement("td");
                valueCell.textContent = value;
                row.appendChild(featureCell);
                row.appendChild(valueCell);
                tbody.appendChild(row);
            }

            caracteristicasTabla.appendChild(thead);
            caracteristicasTabla.appendChild(tbody);
            productFeatures.appendChild(caracteristicasTabla);
        }

        // Método de pagamento
        const divPago = document.createElement("div");
        divPago.classList.add("payment-info", "text-center", "my-4");

        const h4 = document.createElement("h4");
        h4.classList.add("fw-bold");
        h4.innerText = "Medios de Pago";
        const pInfo = document.createElement("p");
        pInfo.classList.add("mb-2");
        pInfo.textContent = "Aceptamos los siguientes medios de pago:";

        const divIcons = document.createElement("div");
        divIcons.classList.add("d-flex", "justify-content-center", "gap-3");

        // Adicionando ícones de pagamento
        const iconsHTML = [
            `<i class="bi bi-credit-card fs-3" title="Tarjeta de Crédito"></i>`,
            `<i class="bi bi-cash fs-3" title="Efectivo"></i>`,
            `<i class="bi bi-paypal fs-3" title="PayPal"></i>`,
            `<i class="bi bi-bank fs-3" title="Transferencia Bancaria"></i>`
        ];
        divIcons.innerHTML = iconsHTML.join(''); // Usando join() para inserir os ícones no container

        divPago.appendChild(h4);
        divPago.appendChild(pInfo);
        divPago.appendChild(divIcons);

        // Preço e botão de adicionar ao carrinho
        const priceAndButtonContainer = document.createElement("div");
        priceAndButtonContainer.classList.add("d-flex", "flex-column", "align-items-center", "mt-3");

        const productPrice = document.createElement("span");
        productPrice.classList.add("h2", "fw-bold");
        productPrice.textContent = `U$${this.price.toLocaleString()}`;

        const addToCartButton = document.createElement("button");
        addToCartButton.type = "button";
        addToCartButton.classList.add("btn", "btn-success", "mt-2");
        addToCartButton.textContent = "Adicionar ao Carrinho";
        
        // Adicionando a função de adicionar ao carrinho
        addToCartButton.addEventListener("click", () => agregarAlCarrito(this.id));

        priceAndButtonContainer.appendChild(productPrice);
        priceAndButtonContainer.appendChild(divPago); // Adicionando a seção de métodos de pagamento
        priceAndButtonContainer.appendChild(addToCartButton);

        // Adicionando os elementos ao modal
        modalInfo.appendChild(productoImageContainer);
        modalInfo.appendChild(galleryContainer); // Adicionando a galeria de imagens
        modalInfo.appendChild(descriptionUno);
        modalInfo.appendChild(descriptionDos);
        modalInfo.appendChild(productFeaturesContainer);
        modalInfo.appendChild(priceAndButtonContainer);

        modalContent.appendChild(modalHeader);
        modalContent.appendChild(hr);
        modalContent.appendChild(modalInfo);

        backgroundModal.appendChild(modalContent);
        document.body.appendChild(backgroundModal);

        // Exibe o modal
        setTimeout(() => backgroundModal.classList.add("show"), 10);

        // Fecha o modal
        closeButton.addEventListener("click", () => {
            backgroundModal.classList.remove("show");
            setTimeout(() => document.body.removeChild(backgroundModal), 300);
        });
    }
}


// Função para abrir o modal
function openModal(productId) {
    fetch("detalles.json")
        .then((response) => response.json())
        .then((data) => {
            const producto = data.find((item) => item.id == productId);

            if (producto) {
                const detallesProducto = new Detalles(
                    producto.id,
                    producto.name,
                    producto.price,
                    producto.stock,
                    producto.categoria,
                    producto.descriptionUno,
                    producto.descriptionDos,
                    producto.porque,
                    producto.respuesta,
                    producto.features,
                    producto.imageBack,
                    producto.image1,
                    producto.image2,
                    producto.image3
                );

                detallesProducto.toModalDOM();
            } else {
                console.error("Produto não encontrado!");
            }
        })
        .catch((error) => console.error("Erro ao carregar o JSON:", error));
}
