const menu = document.querySelector('.side-menu');

function closeSideMenu() {
    console.log('Se va a cerrar el menú lateral');
    menu.style.display = 'none';
}

function openSideMenu() {
    console.log('Se va a abrir el menú lateral');
    menu.style.display = 'block';
}