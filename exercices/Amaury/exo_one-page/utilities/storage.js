export const getFromStorage = (key) => {
    let response = localStorage.getItem(key);
    return response != null ? JSON.parse(response) : [];
};

export const setToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};
