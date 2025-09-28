const menu = document.querySelector('.side-menu');
const vehicleCards = document.querySelectorAll('.vehicle-card');
const vehicleDetailModal = document.querySelector('section.vehicle-details .vehicle-detail-modal');

function closeSideMenu() {
    console.log('Se va a cerrar el menú lateral');
    menu.style.display = 'none';
}

function openSideMenu() {
    console.log('Se va a abrir el menú lateral');
    menu.style.display = 'block';
}

function closeVehicleDetailsModal() {
    vehicleDetailModal.style.display = 'none';
    vehicleDetailModal.classList.remove('show');
    document.documentElement.style.overflowY = 'auto';
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