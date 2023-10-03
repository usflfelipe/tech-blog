const formatDate = date => {
    const theDate = new Date(date);
    return `${theDate.getMonth() + 1}/${theDate.getDate()}/${theDate.getFullYear()}`;
}

const formatPlural = (str, qty) => {
    if (qty === 1) {
        return str;
    } else {
        // really should check if the pluralization needs 's' or 'es' added, but for
        // this exercise, we know we'll only need 's'
        return `${str}s`;
    }
}

module.exports = { formatDate, formatPlural }