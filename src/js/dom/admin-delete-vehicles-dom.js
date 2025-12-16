import {deleteVehicleById, getVehicles} from "../services/airtable-service.js";
import {parseToPrice} from "../utils/vehicle-utils.js";

async function renderAvailableVehicles() {
    const vehicles = await getVehicles();
    const vehiclesContainer = document.querySelector('.available-vehicles-container');
    vehiclesContainer.innerHTML = vehicles.map(vehicle => availableVehicleCard(vehicle)).join('');

    console.log(vehicles);
}

function availableVehicleCard(vehicle) {
    console.log(vehicle, 'vehicle')
    const {id, brand, model, price, phone, photoUrl, fuelType, engine, transmission, offer, color, kilometers, more} = vehicle

    return `
        <div class="available-vehicle-card" data-vehicle-id="${id}">
            <img class="vehicle-img" src="${photoUrl}" alt="">
            <div class="vehicle-info">
                <p><b>${brand} ${model}</b></p>
                <p>Precio: ${parseToPrice(price)}</p>
                <p>Contacto titular: ${phone}</p>
            </div>
            <button class="delete-card-button">
                <img class="arrow-right" src="img/icons/trash.svg" alt="">
            </button>
        </div>
    `
}

function deleteButtonListeners() {
    const deleteButtons = document.querySelectorAll('.delete-card-button');

    deleteButtons.forEach(deleteButton => deleteButton.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log('delete button clicked', e.target);
        const card = e.target.closest('.available-vehicle-card');
        const id = card.dataset.vehicleId;

        await deleteVehicleById(id);

        card.remove();
    }))
}

await renderAvailableVehicles();
deleteButtonListeners()