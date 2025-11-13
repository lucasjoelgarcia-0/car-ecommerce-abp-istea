export function searchVehicleService(vehicles = [], searchTerms) {
    return vehicles.filter(vehicle => {
        return searchTerms.some(term => vehicle.brand.toLowerCase().includes(term.toLowerCase()) || vehicle.model.toLowerCase().includes(term.toLowerCase()));
    })
}