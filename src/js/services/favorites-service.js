const KEY = "favsVehicle";

export function getFavorites() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function addFavorites(vehicleId) {
    const favs = getFavorites();

    if (!favs.includes(vehicleId)) {
        favs.push(vehicleId);
        localStorage.setItem(KEY, JSON.stringify(favs));
    }
}

export function removeFavorites(vehicleId) {
    const favs = getFavorites().filter(id => id !== vehicleId);
    localStorage.setItem(KEY, JSON.stringify(favs));
}