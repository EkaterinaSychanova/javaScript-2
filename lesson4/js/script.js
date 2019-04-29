let validate = (form) => {
    let regName = /^[A-zА-я]+$/i,
        regPhone = /^\+7\(\d{3}\)\d{3}-\d{4}$/,
        regEmail = /^[\w._-]+@\w+\.[a-z]{2,4}$/i;
    if (form.name.value.search(regName) == -1) {
        form.name.style.borderColor = 'red';
        form.messageName.innerHTML = 'Ошибка!';
    } else {
        form.name.style.borderColor = '#85c799';
        form.messageName.innerHTML = '';
    }
    if (form.number.value.search(regPhone) == -1) {
        form.number.style.borderColor = 'red';
        form.messageNumber.innerHTML = 'Ошибка!';
    } else {
        form.number.style.borderColor = '#85c799';
        form.messageNumber.innerHTML = '';
    }
    if (form.email.value.search(regEmail) == -1) {
        form.email.style.borderColor = 'red';
        form.messageEmail.innerHTML = 'Ошибка!';
    } else {
        form.email.style.borderColor = '#85c799';
        form.messageEmail.innerHTML = '';
    }
};


document.getElementById('form').onsubmit = function (event) {
    event.preventDefault();
    var form = {
            name : document.getElementById('form__input-name'),
            number : document.getElementById('form__input-phone'),
            email : document.getElementById('form__input-email'),
            textArea : document.getElementById('form__text'),
            messageName : document.getElementById('form__message-name'),
            messageNumber : document.getElementById('form__message-phone'),
            messageEmail : document.getElementById('form__message-email')
        };
    validate(form);
};