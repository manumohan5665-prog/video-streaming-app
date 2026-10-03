export function getStorage(key) {
    const data = localStorage.getItem(key);

    if (!data) {
        return [];
    }

    try {
        return JSON.parse(data);
    } catch {
        return [];
    }
}


export function setStorage(key, data) {
    localStorage.setItem(
        key,
        JSON.stringify(data)
    );
}