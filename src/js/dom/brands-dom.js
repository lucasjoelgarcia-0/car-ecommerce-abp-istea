import {filterVehiclesByBrand} from "./filters-dom.js";
import {states} from "./states.js";
import {getBrandsRecords} from "../services/airtable-service.js";

async function renderBrandsButtons() {
    const brands = await getBrandsRecords();

    const brandsContainer = document.querySelector('.brands-container');

    brands.forEach(brand => brandsContainer.innerHTML += createBrandButton(brand.id, brand.fields.brand))
}

function createBrandButton(id, brand) {
    return `
        <button class="brand-button" data-brand="${id}">
            <img src="img/icons/brands/${brand}.svg" alt="${brand}">
        </button>
    `
}

function brandButtonListeners() {
    const brandButtons = document.querySelectorAll('.brand-button');
    brandButtons.forEach(button => button.addEventListener('click', (e) => {
        filterVehiclesByBrand(states.vehicles, e.currentTarget.dataset.brand);
    }))
}

function filterByBrand(brand) {
    console.log('Se va a filtrar por la marca', brand);
}

await renderBrandsButtons();
brandButtonListeners();