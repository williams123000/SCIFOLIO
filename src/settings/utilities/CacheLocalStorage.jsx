const setCache = (key, data, ttl) => {
    const now = new Date();
    const item = {
        data: data,
        expiry : now.getTime() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
}

const getCache = (key) => {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }

    return item.data;
}

export { setCache, getCache };