function leerDatos(){
    let usuario = {}
    usuario.nombre = document.getElementById("username").value;
    usuario.email = document.getElementById("email").value;
    usuario.password = document.getElementById("password").value;
    
    return usuario;
}

function validarDatos(){
    let usuario = leerDatos();

    if (usuario.nombre == "" || usuario.email == "" || usuario.password == ""){
        Swal.fire({
            icon: 'error',
            title: 'No se pudo iniciar sesion',
            text: 'Todos los datos son requeridos'
          })
    }else if (usuario.password.length < 6){
        Swal.fire({
            icon: 'error',
            title: 'No se pudo iniciar sesion',
            text: 'La contraseña debe tener mas de 6 caracteres'
          })
    }else {
        sessionStorage.setItem('user', JSON.stringify(usuario));

        Swal.fire({
            title: 'Sesion iniciada',
            text: "Bienvenido!",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#79b4b4',
            confirmButtonText: 'Volver a e-Commerce!'
          }).then((result) => {
            if (result.isConfirmed) {
                location.href = "index.html"
            }
        
            })

    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("iniciarSesion").addEventListener("click", ()=>{

        validarDatos();
        
    })
})