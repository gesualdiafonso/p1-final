// Dados das imagens e IDs associados
const banners = {
    vr: { src: 'assets/banners/banner_rvp.jpg', id: 10 },
    ar: { src: 'assets/banners/banner_RAP-1.jpg', id: 3 },
    mr: { src: 'assets/banners/banner_RMP.jpg', id: 4 }
};

let timeoutId = null;

// Função para obter uma categoria aleatória
function getRandomCategory() {
    const keys = Object.keys(banners);
    return keys[Math.floor(Math.random() * keys.length)];
}

// Função para exibir o banner
function showBanner(category) {
    const publicidadDiv = document.getElementById('publicidad');

    // Limpar o conteúdo atual
    publicidadDiv.innerHTML = '';

    // Verificar se a categoria existe
    if (!banners[category]) {
        console.error('Categoria não encontrada:', category);
        return;
    }

    // Obter o banner e o ID associado
    const banner = banners[category];

    // Criar elementos DOM para o banner
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

    // Adicionar evento de clique para abrir o modal com o ID associado
    bannerLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevenir a navegação padrão
        openModal(banner.id); // Chamar a função openModal com o ID do banner
    });

    // Configurar o timeout para remover o banner após 10 segundos
    timeoutId = setTimeout(() => {
        publicidadDiv.innerHTML = '';
    }, 10000);
}

// Função para aplicar filtros e exibir o banner
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
