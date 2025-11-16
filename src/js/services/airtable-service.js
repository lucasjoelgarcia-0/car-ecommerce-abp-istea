import {AIRTABLE_API_TOKEN, AIRTABLE_API_URL, AIRTABLE_BASE_ID} from "./airtable-envs.js";
import {formatNumber} from "../utils/vehicle-utils.js";

const AIRTABLE_TABLES = {
    brands: 'Brands',
    vehicles: 'Vehicles',
    contacts: 'Contacts'
}

export async function getVehicles() {
    try {
        const vehiclesUrl = `${AIRTABLE_API_URL}${AIRTABLE_BASE_ID}/${AIRTABLE_TABLES['vehicles']}`;

        const response = await fetch(vehiclesUrl, createInit('GET', AIRTABLE_API_TOKEN));
        const data = await response.json();
        const records = data.records.map(vehicle => vehicle);

        console.log('records', records);

        return await Promise.all(
            records.map(async (vehicle) => {
                return {
                    id: vehicle.id,
                    brand: await getBrandById(vehicle.fields.brand[0]),
                    color: vehicle.fields.color,
                    engine: vehicle.fields.engine,
                    fuelType: vehicle.fields.fuel_type,
                    kilometers: vehicle.fields.kilometers,
                    model: vehicle.fields.model,
                    more: vehicle.fields.more,
                    offer: vehicle.fields.offer,
                    phone: vehicle.fields.phone,
                    photoUrl: vehicle.fields.photo_url,
                    price: vehicle.fields.price,
                    transmission: vehicle.fields.transmission,
                };
            })
        );
    } catch (error) {
        console.error('Error al obtener vehiculos desde Airtable:', error);
        throw error;
    }
}

export async function getVehicleInfoById(vehicleId) {
    try {
        const vehicleByIdUrl = `${AIRTABLE_API_URL}${AIRTABLE_BASE_ID}/${AIRTABLE_TABLES['vehicles']}/${vehicleId}`;

        const response = await fetch(vehicleByIdUrl, createInit('GET', AIRTABLE_API_TOKEN));
        const data = await response.json();

        return {
            id: data.id,
            brand: await getBrandById(data.fields.brand),
            model: data.fields.model,
            fuelType: data.fields.fuel_type,
            color: data.fields.color,
            transmission: data.fields.transmission,
            engine: data.fields.engine,
            kilometers: formatNumber(data.fields.kilometers),
            more: data.fields.more,
            phone: data.fields.phone
        }
    } catch (error) {
        console.error('Error al obtener vehiculo por ID desde Airtable:', error);
        throw error;
    }
}

export async function getBrandById(brandId) {
    const brandByIdUrl = `${AIRTABLE_API_URL}${AIRTABLE_BASE_ID}/${AIRTABLE_TABLES['brands']}/${brandId}`;

    const response = await fetch(brandByIdUrl, createInit('GET', AIRTABLE_API_TOKEN));

    const data = await response.json();

    return data.fields.brand;
}

export async function getBrandsRecords() {
    try {
        const brandsUrl = `${AIRTABLE_API_URL}${AIRTABLE_BASE_ID}/${AIRTABLE_TABLES['brands']}`;

        const response = await fetch(brandsUrl, createInit('GET', AIRTABLE_API_TOKEN));

        const data = await response.json();

        return data.records;
    } catch (error) {
        console.error('Error al obtener marcas desde Airtable:', error);
        throw error;
    }
}

export async function getContacts() {
    try {
        const contactTableUrl = `${AIRTABLE_API_URL}${AIRTABLE_BASE_ID}/${AIRTABLE_TABLES['contacts']}`;

        const response = await fetch(contactTableUrl, createInit('GET', AIRTABLE_API_TOKEN));

        const data = await response.json();

        return data.records;
    } catch (error) {
        console.error('Error al obtener contactos desde Airtable:', error);
        throw error;
    }
}

export async function deleteContactById(contactId) {
    const contactTableUrl = `${AIRTABLE_API_URL}${AIRTABLE_BASE_ID}/${AIRTABLE_TABLES['contacts']}/${contactId}`;

    const response = await fetch(contactTableUrl, createInit('delete', AIRTABLE_API_TOKEN));

    return await response.json();
}

export async function sendContactInfo(name, surname, email, message) {
    const contactTableUrl = `${AIRTABLE_API_URL}${AIRTABLE_BASE_ID}/${AIRTABLE_TABLES['contacts']}`;

    const data = {
        records: [
            {
                fields: {
                    name,
                    surname,
                    email,
                    message
                }
            }
        ],
    };

    console.log("DATA AIRTABLE: ", data);

    try {
        const response = await fetch(contactTableUrl, createInit('POST', AIRTABLE_API_TOKEN, JSON.stringify(data)));

        const result = await response.json();
        console.log('RESULT INSERT', result);

    } catch (err) {
        console.error('Error al intentar insertar contactos', err);
    }
}


function createInit(method, token, body) {
    return {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: body !== null ? body : null
    }
}