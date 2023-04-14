/* eslint-disable no-undef */
const useStorage = (name) => {
    const setItem = (data) => {
        localStorage.setItem(name, JSON.stringify(data));
    };

    const getItem = () => JSON.parse(localStorage.getItem(name));

    return [setItem, getItem];
};

export default useStorage;
