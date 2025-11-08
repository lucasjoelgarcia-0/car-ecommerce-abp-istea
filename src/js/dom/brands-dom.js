
function renderBrandsButtons() {
    const brands = ['volkswagen', 'ford', 'chevrolet', 'peugeot', 'fiat'];
    const brandsContainer = document.querySelector('.brands-container');
    brands.forEach(brand => brandsContainer.innerHTML += createBrandButton(brand))
}

function createBrandButton(brand) {
    return `
        <button class="brand-button" data-brand="${brand}">
            <img src="img/icons/brands/${brand}.svg" alt="${brand}">
        </button>
    `
}

function brandButtonListeners() {
    const brandButtons = document.querySelectorAll('.brand-button');
    brandButtons.forEach(button => button.addEventListener('click', (e) => {
        filterByBrand(e.currentTarget.dataset.brand);
    }))
}

function filterByBrand(brand) {
    console.log('Se va a filtrar por la marca', brand);
}

renderBrandsButtons();
brandButtonListeners();