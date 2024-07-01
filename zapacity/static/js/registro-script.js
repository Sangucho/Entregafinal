document.addEventListener("DOMContentLoaded", function () {
    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let nombreUsuario = document.getElementById("nombreUsuario"); 
    let email = document.getElementById("email");
    let confirmEmail = document.getElementById("confirmEmail");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");
    let alertContainer = document.getElementById("alertContainer");

    let btnEnviar = document.getElementById("btnEnviar");

    // Expresión regular para validar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    btnEnviar.addEventListener("click", function(e) {
        e.preventDefault();
        alertContainer.innerHTML = "";

        let nombreV = nombre.value;
        let apellidoV = apellido.value;
        let nombreUsuarioV = nombreUsuario.value; 
        let emailV = email.value;
        let confirmEmailV = confirmEmail.value;
        let passwordV = password.value;
        let confirmPasswordV = confirmPassword.value;

        if (nombreV.trim() === "") {
            alertContainer.innerHTML = `
                <div class="alert alert-dismissible alert-danger">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Oh snap!</strong> Debe ingresar el nombre.
                </div>
            `;
            return;
        }

        if (/\d/.test(nombreUsuarioV)) {
            alertContainer.innerHTML = `
                <div class="alert alert-dismissible alert-danger">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Oh snap!</strong> El nombre de usuario no puede contener números.
                </div>
            `;
            return;
        }
        if (nombreUsuarioV.length < 3) {
            alertContainer.innerHTML = `
            <div class="alert alert-dismissible alert-danger">
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                <strong>Oh snap!</strong> El nombre de usuario debe tener al menos 3 caracteres
            </div>
        `;
            return;
        }

        if (emailV.trim() === "") {
            alertContainer.innerHTML = `
                <div class="alert alert-dismissible alert-danger">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Oh snap!</strong> Debe ingresar el correo electrónico.
                </div>
            `;
            return;
        }

        if (!emailRegex.test(emailV)) {
            alertContainer.innerHTML = `
                <div class="alert alert-dismissible alert-danger">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Oh snap!</strong> El correo electrónico ingresado no es válido.
                </div>
            `;
            return;
        }

        if (confirmEmailV.trim() === "") {
            alertContainer.innerHTML = `
                <div class="alert alert-dismissible alert-danger">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Oh snap!</strong> Debe confirmar el correo electrónico.
                </div>
            `;
            return;
        }

        if (emailV !== confirmEmailV) {
            alertContainer.innerHTML = `
                <div class="alert alert-dismissible alert-danger">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Oh snap!</strong> Los correos electrónicos no coinciden.
                </div>
            `;
            return;
        }

        if (passwordV === "") {
            alertContainer.innerHTML = `
                <div class="alert alert-dismissible alert-danger">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Oh snap!</strong> Debe ingresar la contraseña.
                </div>
            `;
            return;
        }

        if (confirmPasswordV === "") {
            alertContainer.innerHTML = `
                <div class="alert alert-dismissible alert-danger">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Oh snap!</strong> Debe confirmar la contraseña.
                </div>
            `;
            return;
        }

        if (passwordV !== confirmPasswordV) {
            alertContainer.innerHTML = `
                <div class="alert alert-dismissible alert-danger">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Oh snap!</strong> Las contraseñas no coinciden.
                </div>
            `;
            return;
        }

        console.log(`Nombre: ${nombreV}, Apellido: ${apellidoV}, Nombre de Usuario: ${nombreUsuarioV}, Email: ${emailV}`);
        nombre.value = "";
        apellido.value = "";
        nombreUsuario.value = "";
        email.value = "";
        confirmEmail.value = "";
        password.value = "";
        confirmPassword.value = "";

        alertContainer.innerHTML = `
            <div class="alert alert-dismissible alert-success">
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                <strong>Success!</strong> Registro exitoso.
            </div>
        `;

        console.log('Registro exitoso');
    });
});
