import {deleteContactById, getContacts} from "../services/airtable-service.js";

async function init() {
    await renderContactMessageCard();
    await deleteContactCardButtonListeners()
}

async function renderContactMessageCard() {
    const contactCardContainer = document.querySelector('.contacts-messages');
    const contacts = await getContacts();
    contacts.forEach(contact => {
        contactCardContainer.innerHTML += createContactCard(contact);
    })
}

function createContactCard(contact) {
    const {id, fields} = contact;
    const email = fields.email;
    const name = fields.name;
    const message = fields.message;

    console.log(contact);
    return `<div class="message-card" data-contact-id="${id}">
            <div class="message-card-content">
                <div class="message-card-user-info">
                    <p>From: ${name}</p>
                    <p>Email: ${email}</p>
                </div>
                <p>Message: ${message}</p>
            </div>

            <div class="message-card-buttton-container">
                <button class="delete-message-button">
                    <img src="img/icons/trash.svg" alt="delete">
                </button>
            </div>
        </div>`
}

function deleteContactCardButtonListeners() {
    const deleteContactButtons = document.querySelectorAll('.delete-message-button');
    deleteContactButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.stopPropagation();
            e.preventDefault();
            const card = e.currentTarget.closest('.message-card');
            const id = card.dataset.contactId;

            await deleteContactById(id);
            card.remove();
        })
    })
}

await init();