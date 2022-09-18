document.addEventListener("DOMContentLoaded", ()=>{
    let usuario = sessionStorage.getItem('user');
    if (usuario === null){
        document.getElementById('iniciarCerrar').innerHTML = `<a class="nav-link" href="login.html">Log In</a>`
    }else{
        usuario = JSON.parse(usuario)
        document.getElementById('iniciarCerrar').innerHTML = `
            <p class="nav-link">${usuario.nombre}</p>
            <ul>
            <li><a class="nav-link" href="my-profile.html" id="link-perfil">Mi perfil</a></li>
            <li><a class="nav-link" href="cart.html" id="link-carrito">Mi carrito</a></li>
            <li><button id="cerrarSesion">Cerrar Sesion</button></li>
            </ul>`
    }

    document.getElementById("cerrarSesion").addEventListener("click", ()=>{
        sessionStorage.user = null;
        Swal.fire('Sesion cerrada');
        document.getElementById('iniciarCerrar').innerHTML = '<a class="nav-link" href="login.html">Log In</a>';

    })
})