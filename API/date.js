const date = new Date();
    const display = "[" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " | " + date.getHours() + ":" +
        date.getMinutes() + ":" + date.getSeconds() + "]";

module.exports = display