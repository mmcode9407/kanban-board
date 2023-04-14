const formatText = (unit) => (`0${unit}`.length > 2 ? unit : `0${unit}`);

const getTodayDate = () => {
    const date = new Date();
    const day = formatText(date.getDate());
    const month = formatText(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = formatText(date.getHours());
    const minutes = formatText(date.getMinutes());

    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export default getTodayDate;
