// Dados de las imagens e IDs asociados
const banners = {
    vr: { src: 'assets/banners/banner_rvp.jpg', id: 10 },
    ar: { src: 'assets/banners/banner_RAP-1.jpg', id: 3 },
    mr: { src: 'assets/banners/banner_RMP.jpg', id: 4 }
};

let timeoutId = null;

// Funcion para obtener una categoria aleatoria
function getRandomCategory() {
    const keys = Object.keys(banners);
    return keys[Math.floor(Math.random() * keys.length)];
}

// Funcion para exibir el banner
function showBanner(category) {
    const publicidadDiv = document.getElementById('publicidad');

    // Limpar o conteúdo atual
    publicidadDiv.innerHTML = '';

    // Verificar se a categoria existe
    if (!banners[category]) {
        console.error('Categoria não encontrada:', category);
        return;
    }

    // Obtener el banner y el ID asociado
    const banner = banners[category];

    // Crear elementos DOM para el banner
    const bannerLink = document.createElement('a');
    bannerLink.href = '#'; // Não navegar para lugar algum
    bannerLink.target = '_blank';

    const bannerImage = document.createElement('img');
    bannerImage.src = banner.src;
    bannerImage.alt = `${category} banner`;
    bannerImage.className = 'w-100';

    // Atualizar o conteúdo do div
    bannerLink.appendChild(bannerImage);
    publicidadDiv.appendChild(bannerLink);

    // Añadir evento click para abrir el modal con el ID asociado
    bannerLink.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar la navegación por defecto
        openModal(banner.id); // Llama a la función openModal con el ID del banner
    });

    // Establecer el tiempo de espera para eliminar el banner después de 10 segundos
    timeoutId = setTimeout(() => {
        publicidadDiv.innerHTML = '';
    }, 10000);
}

// Función para aplicar filtros y mostrar la pancarta
function aplicarFiltros() {
    const categoriaSeleccionada = categoriaSelect.value || 'all';
    const precioSeleccionado = preciosSelect.value || null;

    // Atualizar catálogo com base nos filtros
    if (precioSeleccionado === 'clear') {
        preciosSelect.value = '';
        Productos.renderCatalog('catalogo', categoriaSeleccionada);
    } else {
        Productos.renderCatalog('catalogo', categoriaSeleccionada, precioSeleccionado);
    }

    // Exibir um banner aleatório
    clearTimeout(timeoutId);
    if (categoriaSeleccionada !== 'all') {
        const randomCategory = getRandomCategory();
        showBanner(randomCategory);
    } else {
        document.getElementById('publicidad').innerHTML = '';
    }
}

// Listeners
categoriaSelect.addEventListener('change', aplicarFiltros);
preciosSelect.addEventListener('change', aplicarFiltros);
