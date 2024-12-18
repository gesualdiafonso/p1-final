// Variável global para armazenar produtos
let productosGlobal = [];

// Classe Productos
class Productos {
    constructor(id, name, description, image, price, stock, categoria, other, features, image1, image2, image3, iframe) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.stock = stock;
        this.categoria = categoria;
        this.other = other
        this.features = features;
        this.image1 = image1;
        this.image2 = image2;
        this.image3 = image3;
        this.iframe = iframe;
    }

    // Método para convertir un producto en un elemento DOM
    toDOMElement() {
        const col = document.createElement("div");
        col.className = "col-12 col-md-6 col-lg-4";
        col.dataset.categoria = this.categoria;

        const card = document.createElement("div");
        card.className = "card h-auto card-hover h-100";

        const cardImg = document.createElement("div");
        cardImg.className = "card-img h-100 text-center";

        const img = document.createElement("img");
        img.src = this.image;
        img.alt = this.name;
        img.className = "img-fluid img-stl";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex flex-column";

        const title = document.createElement("h4");
        title.className = "card-title";
        title.textContent = this.name;

        const description = document.createElement("p");
        description.className = "card-text";
        description.textContent = this.description;

        const price = document.createElement("span");
        price.className = "h3 text-center fw-semibold my-lg-5";
        price.textContent = `U$${this.price.toLocaleString()}`;

        const buttonsContainer = document.createElement("div");
        buttonsContainer.className = "d-flex flex-row";

        const buyButton = document.createElement("button");
        buyButton.type = "button";
        buyButton.className = "btn btn-primary mt-lg-3 mx-auto";
        buyButton.textContent = "Comprar";
        buyButton.onclick = () => agregarAlCarrito(this.id);

        const moreInfoButton = document.createElement("button");
        moreInfoButton.type = "button";
        moreInfoButton.className = "btn btn-primary mt-lg-3 mx-auto";
        moreInfoButton.textContent = "Saber más";
        moreInfoButton.onclick = () => openModal(this.id);

        buttonsContainer.appendChild(buyButton);
        buttonsContainer.appendChild(moreInfoButton);

        cardImg.appendChild(img);
        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(price);
        cardBody.appendChild(buttonsContainer);
        card.appendChild(cardImg);
        card.appendChild(cardBody);
        col.appendChild(card);

        return col;
    }

    // Método estático para cargar los productos del JSON y renderizarlos en catálogo
    static renderCatalog(catalogoId, filtrarCategorias = "all", ordenarPorPrecio = null) {
        fetch("productos.json")
            .then((response) => response.json())
            .then((data) => {
                productosGlobal = data; // Armazena os produtos na variável global
                let productosFiltrados = data;

                // Filtro por categoria
                if (filtrarCategorias && filtrarCategorias !== "all") {
                    productosFiltrados = productosFiltrados.filter(
                        (producto) => producto.categoria === filtrarCategorias
                    );
                }

                // Ordenação por preço
                if (ordenarPorPrecio === "maxValor") {
                    productosFiltrados.sort((a, b) => b.price - a.price);
                } else if (ordenarPorPrecio === "minValor") {
                    productosFiltrados.sort((a, b) => a.price - b.price);
                }

                // Renderizar os produtos filtrados
                const catalogo = document.getElementById(catalogoId);
                catalogo.innerHTML = ""; // Limpa o conteúdo anterior

                productosFiltrados.forEach((item) => {
                    const producto = new Productos(
                        item.id,
                        item.name,
                        item.description,
                        item.image,
                        item.price,
                        item.stock,
                        item.categoria,
                        item.other,
                        item.features,
                        item.image1,
                        item.image2,
                        item.image3
                    );
                    catalogo.appendChild(producto.toDOMElement());
                });
            })
            .catch((error) => console.error("Erro ao carregar produtos:", error));
    }
}

// Carga y representación del catálogo al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    Productos.renderCatalog("catalogo");
});

// Filtros combinados
const categoriaSelect = document.getElementById("categoria");
const preciosSelect = document.getElementById("precios");

function aplicarFiltros() {
    const categoriaSeleccionada = categoriaSelect.value || "all";
    const precioSeleccionado = preciosSelect.value || null;

    if (precioSeleccionado === "clear") {
        preciosSelect.value = "";
        Productos.renderCatalog("catalogo", categoriaSeleccionada);
    } else {
        Productos.renderCatalog("catalogo", categoriaSeleccionada, precioSeleccionado);
    }
}

categoriaSelect.addEventListener("change", aplicarFiltros);
preciosSelect.addEventListener("change", aplicarFiltros);