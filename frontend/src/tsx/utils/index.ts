export function formatFileSize(sizeInBytes: number): string {
    if (sizeInBytes < 1024) {
        return `${sizeInBytes} байт`;
    } else if (sizeInBytes < 1024 ** 2) {
        const sizeInKB = sizeInBytes / 1024;
        return `${sizeInKB.toFixed(2)} КБ`;
    } else if (sizeInBytes < 1024 ** 3) {
        const sizeInMB = sizeInBytes / (1024 ** 2);
        return `${sizeInMB.toFixed(2)} МБ`;
    } else {
        const sizeInGB = sizeInBytes / (1024 ** 3);
        return `${sizeInGB.toFixed(2)} ГБ`;
    }
}

export function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
}