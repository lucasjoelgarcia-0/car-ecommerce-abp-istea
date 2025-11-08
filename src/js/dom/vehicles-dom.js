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