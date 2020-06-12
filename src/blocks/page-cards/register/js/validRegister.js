if (window.location.toString().indexOf('register-page.html') > 0) {
    let registerButton = document.querySelector('#registerButton')
    let registerForm = document.querySelector('#registerForm')

    registerButton.addEventListener('click', function valid() {
        let fail = false;
        let name = registerForm.name.value;
        let surname = registerForm.surname.value;
        let gender = registerForm.gender1.value;
        let dateOfBirth = registerForm.dateOfBirth.value;
        let email = registerForm.email1.value;
        let password = registerForm.registerPassword.value;
        let dateFormat = /(0[1-9]|[12][0-9]|3[01])[- ..](0[1-9]|1[012])[- ..](19|20)\d\d/i;
        let emailFormat = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}/i;
        let passwordFormat = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

        if (name == '' || name == ' ') {
            fail = 'Введите имя'
        } else if (surname == '' || surname == ' ') {
            fail = 'Введите фамилию'
        } else if (gender == '') {
            fail = 'Укажите пол'
        } else if (dateOfBirth == '') {
            fail = 'Введите дату рождения'
        } else if (dateFormat.test(dateOfBirth) == false) {
            fail = 'Вы неправильно ввели дату'
        } else if (email == '' || email == ' ') {
            fail = 'Введите email'
        } else if (emailFormat.test(email) == false) {
            fail = 'Вы неправильно ввели email'
        } else if (password == '' || password == ' ') {
            fail = 'Введите пароль'
        } else if (passwordFormat.test(password) == false) {
            fail = 'Пароль должен состоять из строчных и прописных латинских букв, цифр и спецсимволов, а также минимум из 8ми символов'
        }

        if (fail) {
            alert(fail)
        } else {
            window.location = 'landing-page.html'
        }
    })
}