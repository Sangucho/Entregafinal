document.addEventListener("DOMContentLoaded", function () {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let alertContainer = document.getElementById("alertContainer");

    let loginBtnEnviar = document.getElementById("login-btnEnviar");

    // Expresión regular para validar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    loginBtnEnviar.addEventListener("click", function(e) {
        e.preventDefault();
        alertContainer.innerHTML = "";

        let emailValue = email.value;
        let passwordValue = password.value;

        if (emailValue.trim() === "") {
            alertContainer.innerHTML = `
                <div class="alert alert-dismissible alert-danger">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Oh snap!</strong> Debe ingresar el correo electrónico.
                </div>
            `;
            email.value = "";
            password.value = "";
            return;
        }

        if (!emailRegex.test(emailValue)) {
            alertContainer.innerHTML = `
                <div class="alert alert-dismissible alert-danger">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Oh snap!</strong> El correo electrónico ingresado no es válido.
                </div>
            `;
            email.value = "";
            password.value = "";
            return;
        }

        if (passwordValue === "") {
            alertContainer.innerHTML = `
                <div class="alert alert-dismissible alert-danger">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Oh snap!</strong> Debe ingresar la contraseña.
                </div>
            `;
            return;
        }

        console.log(`Email: ${emailValue}, Password: ${passwordValue}`);

        email.value = "";
        password.value = "";

        alertContainer.innerHTML = `
            <div class="alert alert-dismissible alert-success">
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                <strong>Success!</strong> Inicio de sesión exitoso.
            </div>
        `;

        console.log('Inicio de sesión exitoso');
    });
});
