export function generateFileName(id) {
    const date = new Date();
    return id + `_${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
}

export function generateSlug(sentence) {
    return sentence
        .toLowerCase() // Convert to lowercase
        .normalize("NFD") // Decompose accents into separate characters
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks (accents)
        .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters except spaces and hyphens
        .trim() // Remove leading and trailing spaces
        .replace(/\s+/g, "-"); // Replace spaces with hyphens
}