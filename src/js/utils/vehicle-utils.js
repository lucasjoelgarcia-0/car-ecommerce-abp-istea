export function parseToPercent(mount) {
    return Number(mount) * 100 + "%";
}

export function parseToPrice(mount) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(mount)
}