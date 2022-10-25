const USERID = 25801;
const CARTURL = CART_INFO_URL + '25801' + EXT_TYPE;

function setProdID(id){
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
}

function showArticulos(array){
    let htmlContentToAppend = "";
    for (let i=0; i<array.length; i++){
        let articulo = array[i];       
        let res = articulo.count*articulo.unitCost;
        htmlContentToAppend += `
        <tr>
        <div onclick="setProdID(${articulo.id})" class="list-group-item list-group-item-action">           
            <td style="width:150px"><img src="` + articulo.image + `" alt="product image" class="cart"></td>
            <td>`+ articulo.name +`</td>
            <td>`+ articulo.currency +' '+ articulo.unitCost +`</td>
            <td style="width:150px"><input onchange="setearCantidad(articulos[${i}], ${i})" type="number" id="quantity${i}" name="quantity" min="0" value="${articulo.count}"></td>
            <td id="sub${i}">${articulo.currency} ${res}</td>
        </div>    
        </tr>`
    }
    
    document.getElementById("tablaCarrito").innerHTML += htmlContentToAppend;
}

function setearCantidad(articulo, i){
    
    console.log("entra")
    let cant = document.getElementById("quantity" + i).value;

    articulo.count = cant;

    let res = articulo.count*articulo.unitCost;

    document.getElementById("sub" + i).innerHTML = articulo.currency +` `+ res;
}


document.addEventListener("DOMContentLoaded", ()=>{

    //mostrar login o nombre del usuario en el navbar
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

    //document.getElementById("cerrarSesion").addEventListener("click", ()=>{
    //    sessionStorage.user = null;
    //   Swal.fire('Sesion cerrada');
    //   document.getElementById('iniciarCerrar').innerHTML = '<a class="nav-link" href="login.html">Log In</a>';
//  })


    //traer data del carrito del usuario y llamar a la funcion que muestre los articulos
    getJSONData(CARTURL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            articulos = resultObj.data.articles;
            showArticulos(articulos);
        }
    });

    
})