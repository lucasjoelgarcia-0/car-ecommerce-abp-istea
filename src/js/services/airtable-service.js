import {AIRTABLE_API_URL, AIRTABLE_API_TOKEN, AIRTABLE_BASE_ID} from "./airtable-envs.js";
import {formatNumber} from "../utils/vehicle-utils.js";

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
        // return data.records;
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

function createInit(method, token) {
    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    }
}