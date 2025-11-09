export function filterVehiclesByBrand(vehicles, brand) {
    return  vehicles.filter(vehicle => vehicle.fields.brand[0] === brand );
}