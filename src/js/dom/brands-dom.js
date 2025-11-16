import {getBrandById, getBrandsRecords} from "../services/airtable-service.js";

async function init() {
    await renderBrandsButtons();
    await brandButtonListeners();
    activeSelectedBrand();
}

async function renderBrandsButtons() {
    const brands = await getBrandsRecords();

    const brandsContainer = document.querySelector('.brands-container');

    brands.forEach(brand => brandsContainer.innerHTML += createBrandButton(brand.id, brand.fields.brand))
}

function createBrandButton(id, brand) {
    return `
        <button class="brand-button" data-brand="${id}">
            <img src="img/icons/brands/${brand.toLowerCase()}.svg" alt="${brand}">
        </button>
    `
}

function brandButtonListeners() {
    const brandButtons = document.querySelectorAll('.brand-button');

    brandButtons.forEach(async button => button.addEventListener('click', async (e) => {
        if (e.currentTarget.classList.contains('active')) {
            e.currentTarget.classList.remove('active');
            window.location.href = 'index.html';

            return;
        }
        await setBrandParam(e.currentTarget.dataset.brand);
    }))
}

async function setBrandParam(brandId) {
    const brandName = await getBrandById(brandId);
    window.location.href = `?brand=${brandName.toLowerCase()}`;
}

function activeSelectedBrand() {
    const getParams = new URLSearchParams(window.location.search);
    const brandParam = getParams.get('brand');
    const brandButtons = document.querySelectorAll('.brand-button');

    brandButtons.forEach(async button => {
        const brandName = await getBrandById(button.dataset.brand);

        if (brandName.toLowerCase() === brandParam) {
            button.classList.add('active');
        }
    });
}

await init();