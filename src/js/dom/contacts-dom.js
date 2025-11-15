import {sendContactInfo} from "../services/airtable-service.js";

console.log('DOM loaded in contacts.html');

const form = document.querySelector(".contact-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    await sendContactInfo(name, surname, email, message);
});
