import {updateVehicle} from "../services/airtable-service.js";

console.log("Edit Vehicle Form DOM")

document.addEventListener('DOMContentLoaded', () => {
    init();
    setInputValues();
});

function init() {
    const updateVehicleForm = document.querySelector('.vehicle-form');
    updateVehicleForm.addEventListener('submit', updateVehicleSubmitHandler);
}

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);

    return {
        id: params.get('id'),
        brand: params.get('brand'),
        model: params.get('model'),
        price: Number(params.get('price')),
        phone: params.get('phone'),
        fuelType: params.get('fuelType'),
        engine: params.get('engine'),
        transmission: params.get('transmission'),
        kilometers: Number(params.get('kilometers')),
        offer: Number(params.get('offer')),
        color: params.get('color'),
        more: params.get('more'),
        photoUrl: params.get('photoUrl')
    };
}

function setInputValues() {
    const {id, brand, model, price, phone, fuelType, engine, transmission, offer, color, kilometers, more, photoUrl} = getQueryParams();

    console.log("TRANSMISIÓN", transmission)
    console.log("OFERTA: ", offer)

    const transmissionValue = document.querySelector('#transmission').value = transmission;
    const engineValue = document.querySelector('#engine').value = engine;
    const offerValue = document.querySelector('#offer').value = offer;
    const fuelTypeValue = document.querySelector('#fuel_type').value = fuelType;

    const priceValue = document.querySelector('#price').value = price;
    const colorValue = document.querySelector('#color').value = color;
    const kilometersValue = document.querySelector('#kilometers').value = kilometers;
    const moreValue = document.querySelector('#more').value = more;
    const phoneValue = document.querySelector('#phone').value = phone;
    const photoUrlValue = document.querySelector('#photo_url').value = photoUrl;


    console.log({
        transmissionValue,
        engineValue,
        offerValue,
        fuelTypeValue,
        priceValue,
        colorValue,
        kilometersValue,
        moreValue,
        phoneValue,
        photoUrlValue
    })
}

async function updateVehicleSubmitHandler(e) {
    e.preventDefault();

    const updateVehicleForm = document.querySelector('.vehicle-form');
    const formData = new FormData(updateVehicleForm);

    const { id } = getQueryParams();

    const transmission = formData.get('transmission');
    const engine = formData.get('engine');
    const offer = formData.get('offer');
    const fuelType = formData.get('fuel_type');
    const price = formData.get('price');
    const color = formData.get('color');
    const kilometers = formData.get('kilometers');
    const more = formData.get('more');
    const phone = formData.get('phone');
    const photoUrl = formData.get('photo_url');

    const vehicle = {id, transmission, engine, offer, fuelType, price, color, kilometers, more, phone, photoUrl};

    await updateVehicle(vehicle);
}