exports.GetDate = function (date){
    const display = "[" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " | " + date.getHours() + ":" +
        date.getMinutes() + ":" + date.getSeconds() + "]";
    return display;
} 
