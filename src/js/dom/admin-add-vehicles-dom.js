import {addVehicle} from "../services/airtable-service.js";

console.log('DOM loaded in admin-add-vehicles.html');

const vehiclesForm = document.querySelector(".vehicle-form");

vehiclesForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("Submitted Venicles Form", e.target)

    const brand = e.target.elements['brand'].value;
    const transmission = e.target.elements['transmission'].value;
    const engine = e.target.elements['engine'].value;
    const offer = e.target.elements['offer'].value;
    const fuelType = e.target.elements['fuel_type'].value;

    const model = e.target.elements['model'].value;
    const price = e.target.elements['price'].value;
    const color = e.target.elements['color'].value;
    const kilometers = e.target.elements['kilometers'].value;
    const more = e.target.elements['more'].value;
    const phone = e.target.elements['phone'].value;
    const photoUrl = e.target.elements['photo_url'].value;

    const newVehicle = {
        brand,
        transmission,
        engine,
        offer,
        model,
        fuelType,
        price,
        color,
        kilometers,
        more,
        phone,
        photoUrl,
    };

    await addVehicle(newVehicle)
});
