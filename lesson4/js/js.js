const correction = (string) => {
    let value = string.replace(/'/gi,'"');
    let str = value.match(/\S+"\S+/gi);
    for (let i = 0; i < str.length; i++) {
        str[i] = str[i].replace(/"/gi,"'");
        value = value.replace(/\S+"\S+/gi,str[i]);
    }
    return value;
};

document.querySelector('.form').onsubmit = (event) => {
    event.preventDefault();
    let textArea = document.querySelector('.form__text');
    textArea.value = correction(textArea.value);
};