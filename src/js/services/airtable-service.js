import {AIRTABLE_API_URL, AIRTABLE_API_TOKEN, AIRTABLE_BASE_ID} from "./airtable-envs.js";

const AIRTABLE_TABLES = {
    brands: 'Brands',
    vehicles: 'Vehicles'
}

export async function getVehiclesRecords() {
    try {
        const vehiclesUrl = `${AIRTABLE_API_URL}${AIRTABLE_BASE_ID}/${AIRTABLE_TABLES['vehicles']}`;

        const response = await fetch(vehiclesUrl, createInit('GET', AIRTABLE_API_TOKEN));
        const data = await response.json();

        return data.records;
    } catch (error) {
        console.error('Error al obtener vehiculos desde Airtable:', error);
        throw error;
    }
}

export async function getBrandById(brandId) {
    const records = await getBrandsRecords();

    const record = records.find(record => record.id === brandId);

    return record.fields.brand;
}

async function getBrandsRecords() {
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

function createInit(method, token) {
    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    }
}