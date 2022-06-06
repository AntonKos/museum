const hidden_form = document.querySelector('.hidden_div')

function openForm() {
    hidden_form.style.display = 'block'
}

function closeForm() {
    hidden_form.style.display = 'none'
}

const form = document.getElementsByTagName('form')[0];
const email = document.getElementById('email');
const emailError = document.querySelector('.error-email');
const phone = document.getElementById('phone');
const phoneError = document.querySelector('.error-phone');
const nameF = document.getElementById('name');
const nameFError = document.querySelector('.error-name');


email.addEventListener('input', function(event) {
    if (email.validity.valid) {
        // Если на момент валидации какое-то сообщение об ошибке уже отображается,
        // если поле валидно, удаляем сообщение
        emailError.textContent = ''; // Сбросить содержимое сообщения
        emailError.className = 'error'; // Сбросить визуальное состояние сообщения
    } else {
        // Если поле не валидно, показываем правильную ошибку
        showError(event.target.id);
    }
});
phone.addEventListener('input', function(event) {

    if (phone.validity.valid) {

        phoneError.textContent = '';
        phoneError.className = 'error';
    } else {
        showError(event.target.id);
    }
});
nameF.addEventListener('input', function(event) {


    if (nameF.validity.valid) {

        nameFError.textContent = '';
        nameFError.className = 'error';
    } else {
        showError(event.target.id);
    }
});


form.addEventListener('submit', function(event) {
    // Если поле email валдно, позволяем форме отправляться

    if (!email.validity.valid) {
        // Если поле email не валидно, отображаем соответствующее сообщение об ошибке
        showError();
        // Затем предотвращаем стандартное событие отправки формы
        event.preventDefault();
    }
    if (!nameF.validity.valid) {
        showError();
        event.preventDefault();
    }
    if (!phone.validity.valid) {
        showError();
        event.preventDefault();
    }

});

function showError(id) {
    if (id === 'name') {

        if (nameF.validity.valueMissing) {
            nameFError.textContent = 'You need to enter your name.';
        } else if (nameF.validity.typeMismatch) {
            nameFError.textContent = 'Entered value needs to be an e-mail address.';
        } else if (nameF.validity.tooShort) {
            nameFError.textContent = `name should be at least ${ nameF.minLength } characters; you entered ${ nameF.value.length }.`;
        }
        nameFError.className = 'error active';
        return
    }
    if (id === 'email') {
        if (email.validity.patternMismatch) {
            emailError.textContent = 'invalid email';
        }
        if (email.validity.valueMissing) {
            // Если поле пустое,
            // отображаем следующее сообщение об ошибке
            emailError.textContent = 'You need to enter an e-mail address.';
        }
        // else if (email.validity.typeMismatch) {
        //     // Если поле содержит не email-адрес,
        //     // отображаем следующее сообщение об ошибке
        //     emailError.textContent = 'Entered value needs to be an e-mail address.';
        // } else if (email.validity.tooShort) {
        //     // Если содержимое слишком короткое,
        //     // отображаем следующее сообщение об ошибке
        //     emailError.textContent = `Email should be at least ${ email.minLength } characters; you entered ${ email.value.length }.`;
        // }
        emailError.className = 'error active';
        return
    }
    if (id === 'phone') {
        if (phone.validity.patternMismatch) {
            phoneError.textContent = 'invalid phone.';
        }
        if (phone.validity.valueMissing) {
            // Если поле пустое,
            // отображаем следующее сообщение об ошибке
            phoneError.textContent = 'You need to enter phone.';
        }
        phoneError.className = 'error active';
        return
    }
}