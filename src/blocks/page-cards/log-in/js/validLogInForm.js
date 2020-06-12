if (window.location.toString().indexOf('sign-in-page.html') > 0) {
    let logInButton = document.querySelector('#logInButton')
    let logInForm = document.querySelector('#logInForm')

    logInButton.addEventListener('click', function validLogInForm() {
        let fail = false;
        let email = logInForm.email2.value;
        let password = logInForm.logInPassword.value;
        let emailFormat = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}/i;
        let passwordFormat = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

        if (email == '' || email == ' ') {
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