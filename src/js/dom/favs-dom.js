import {getFavorites, removeFavorites} from "../services/favorites-service.js";
import {getVehicles} from "../services/airtable-service.js";
import {parseToPrice} from "../utils/vehicle-utils.js";

async function init() {
    const favorites = getFavorites();
     console.log('favorites', favorites);
     await renderFavoritesVehiclesCards(favorites);
     removeFavButtonListeners();
}

async function renderFavoritesVehiclesCards(favorites) {

    if (favorites.length === 0) {
        return;
    }
    const vehicles = await getVehicles();
    console.log(vehicles);

    const favoritesContainer = document.querySelector('.favs-card-container');
    vehicles.forEach(vehicle => {
        if (favorites.includes(vehicle.id)) {
            favoritesContainer.innerHTML += createFavsComponent(vehicle);
        }
    })
}

function createFavsComponent(vehicle) {
    const vehicleId = vehicle.id;
    const brand = vehicle.brand;
    const model = vehicle.model;
    const price = vehicle.price;
    const photoUrl = vehicle.photoUrl;

    return `<div class="vehicle-fav-card" data-vehicle-id="${vehicleId}">
                <img src="${photoUrl}" alt="ford">
                <div class="vehicle-in-fav-info">
                    <p>${brand} ${model}</p>
                    <p>${parseToPrice(price)}</p>
                 </div>
                 <button class="remove-fav-button">
                    <img src="img/icons/trash.svg" alt="trash">
                </button>
            </div>`
}

function removeFavButtonListeners() {
    const removeFavButtons = document.querySelectorAll('.remove-fav-button');
    removeFavButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const card = e.currentTarget.closest('.vehicle-fav-card');
            const id = e.currentTarget.closest('.vehicle-fav-card').dataset.vehicleId;
            card.remove();
            removeFavorites(id);
        })
    })
}

await init();