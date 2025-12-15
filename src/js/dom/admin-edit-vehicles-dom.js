import {getVehicles} from "../services/airtable-service.js";
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
        <a href="edit-vehicle-form.html?id=${id}&brand=${brand}&model=${model}&price=${price}&phone=${phone}&fuelType=${fuelType}&engine=${engine}&transmission=${transmission}&offer=${offer}&color=${color}&more=${more}&kilometers=${kilometers}&photoUrl=${photoUrl}" class="available-vehicle-card" data-vehicle-id="1">
            <img class="vehicle-img" src="${photoUrl}" alt="">
            <div class="vehicle-info">
                <p><b>${brand} ${model}</b></p>
                <p>Combustible: ${fuelType}</p>
                <p>Motor: ${engine}</p>
                <p>Kilometros: ${kilometers}</p>
                <p>Transmisión: ${transmission}</p>
                <p>Precio: ${parseToPrice(price)}</p>
                <p>Contacto titular: ${phone}</p>
            </div>
            <img class="arrow-right" src="img/icons/right-arrow.svg" alt="">
        </a>
    `
}

await renderAvailableVehicles();