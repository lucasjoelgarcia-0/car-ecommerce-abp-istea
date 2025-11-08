import {getBrandById, getVehiclesRecords} from "../services/airtable-service.js";
import {parseToPercent, parseToPrice} from "../utils/vehicle-utils.js";

const vehiclesCatalogContainer = document.querySelector('.vehicles-catalog-container');
const vehicleCards = document.querySelectorAll('.vehicle-card');
const vehicleDetailModal = document.querySelector('section.vehicle-details .vehicle-detail-modal');
const closeDetailsModalButton = document.querySelector('.vehicle-details-close-button');


async function renderVehiclesCard() {
    const records = await getVehiclesRecords();
    const vehicles = records.map(vehicle => vehicle);

    for (const vehicle of vehicles) {
        vehiclesCatalogContainer.innerHTML += await createVehicleBrand(vehicle);
    }
}

async function createVehicleBrand(vehicle) {
    const brand = await getBrandById(vehicle.fields.brand[0])
    const offer = parseToPercent(vehicle.fields.offer);
    const photoUrl = vehicle.fields.photo_url;
    const model = vehicle.fields.model;
    const price = parseToPrice(vehicle.fields.price);

    return `<div class="vehicle-content">
                <a class="vehicle-card">
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

vehicleCards.forEach(card => {
    card.addEventListener('click', (e) => {
        console.log('clicked', card);

        if (!vehicleDetailModal.classList.contains('show')) {
            vehicleDetailModal.classList.add('show');
            vehicleDetailModal.style.display = 'block';
            document.documentElement.style.overflowY = 'hidden';
        }
    });
})

closeDetailsModalButton.addEventListener('click', closeVehicleDetailsModal);

function closeVehicleDetailsModal() {
    vehicleDetailModal.style.display = 'none';
    vehicleDetailModal.classList.remove('show');
    document.documentElement.style.overflowY = 'auto';
}


renderVehiclesCard();