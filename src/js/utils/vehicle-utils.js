export function parseToPercent(mount) {
    return Number(mount) * 100 + "%";
}

export function parseToPrice(mount) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(mount)
}

export function formatNumber(number) {
    return new Intl.NumberFormat('es-AR').format(number);
}