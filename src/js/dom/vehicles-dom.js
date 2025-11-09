import {getBrandById, getVehicleInfoById, getVehiclesRecords} from "../services/airtable-service.js";
import {parseToPercent, parseToPrice} from "../utils/vehicle-utils.js";
import {states} from "./states.js";

const vehiclesCatalogContainer = document.querySelector('.vehicles-catalog-container');
const vehicleDetailModal = document.querySelector('section.vehicle-details .vehicle-detail-modal');

async function renderVehiclesCard() {
    const records = await getVehiclesRecords();
    states.vehicles = records.map(vehicle => vehicle);

    for (const vehicle of states.vehicles) {
        vehiclesCatalogContainer.innerHTML += await createVehicleBrand(vehicle);
    }

    await addVehicleCardsListeners();
}

async function createVehicleBrand(vehicle) {
    const id = vehicle.id;
    const brand = await getBrandById(vehicle.fields.brand[0])
    const offer = parseToPercent(vehicle.fields.offer);
    const photoUrl = vehicle.fields.photo_url;
    const model = vehicle.fields.model;
    const price = parseToPrice(vehicle.fields.price);

    return `<div class="vehicle-content">
                <a class="vehicle-card" data-vehicle-id="${id}">
                    <div class="vehicle-card-header">
                        <div class="vehicle-offer">
                            <p>${offer} OF</p>
                        </div>
                        <button class="add-favorite-button">
                            <img src="img/icons/heart.svg" alt="heart">
                        </button>
                    </div>
                    <div class="vehicle-card-image">
                        <img src="${photoUrl}">
                    </div>
                </a>
                <div class="vehicle-info">
                    <h2>${brand}</h2>
                    <p>${price}</p>
                    <p>${model}</p>
                </div>
            </div>`;
}

async function addVehicleCardsListeners() {
    const vehicleCards = document.querySelectorAll('.vehicle-card');

    vehicleCards.forEach(card => {
        card.addEventListener('click', async (e) => {
            console.log('clicked', card);
            const vehicleId = card.dataset.vehicleId;

            if (!vehicleDetailModal.classList.contains('show')) {
                vehicleDetailModal.classList.add('show');
                vehicleDetailModal.style.display = 'block';
                document.documentElement.style.overflowY = 'hidden';

                await renderVehicleInfoInModal(vehicleId);

                const closeDetailsModalButton = document.querySelector('.vehicle-details-close-button');
                closeDetailsModalButton.addEventListener('click', closeVehicleDetailsModal);

            }
        });
    })

}

async function renderVehicleInfoInModal(vehicleId) {
    const modalContent = document.querySelector('.vehicle-details-content');

    const {
        id,
        brand,
        model,
        fuelType,
        kilometers,
        color,
        transmission,
        engine,
        more,
        phone
    } = await getVehicleInfoById(vehicleId);

    modalContent.innerHTML = renderVehicleModalCloseButton();

    const modalHeader = document.createElement('h2');
    const fuelTypeElement = document.createElement('p');
    const kilometersElement = document.createElement('p');
    const colorElement = document.createElement('p');
    const transmissionElement = document.createElement('p');
    const engineElement = document.createElement('p');
    const moreElement = document.createElement('p');

    modalHeader.textContent = `${brand} ${model}`;
    modalContent.appendChild(modalHeader);

    fuelTypeElement.textContent = `Tipo de combustible: ${fuelType}`;
    modalContent.appendChild(fuelTypeElement);

    kilometersElement.textContent = `Kilometros: ${kilometers}`;
    modalContent.appendChild(kilometersElement);

    colorElement.textContent = `Color: ${color}`;
    modalContent.appendChild(colorElement);

    transmissionElement.textContent = `Transmisión: ${transmission}`;
    modalContent.appendChild(transmissionElement);

    engineElement.textContent = `Motor: ${engine}`
    modalContent.appendChild(engineElement);

    moreElement.textContent = `Más: ${more}`;
    modalContent.appendChild(moreElement);

    modalContent.innerHTML += redirectToWhatsAppButton(phone);
}

function renderVehicleModalCloseButton() {
    return `<button class="vehicle-details-close-button">
                    <img src="img/icons/close.svg" alt="close">
                </button>`
}

function closeVehicleDetailsModal() {
    const modalContent = document.querySelector('.vehicle-details-content');

    vehicleDetailModal.style.display = 'none';
    vehicleDetailModal.classList.remove('show');
    document.documentElement.style.overflowY = 'auto';

    while (modalContent.firstChild) {
        modalContent.removeChild(modalContent.firstChild);
    }
}

function redirectToWhatsAppButton(phone) {
    return `<a href="https://api.whatsapp.com/send?phone=${phone}&text=Hola%20vi%20tu%20anuncio%20quiero..." class="vehicle-contact-button" target="_blank">
                <img src="img/icons/whatsapp.svg" alt="whatsapp">
                Consultar
            </a>`
}


await renderVehiclesCard();
