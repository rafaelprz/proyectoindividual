let prod_id = localStorage.getItem("ProdID")
let product_data_url = PRODUCT_INFO_URL + prod_id + EXT_TYPE

let product
let comments = []

//funcion que cambia la foto que se muestra como principal
function change_image(i){
    document.getElementById("main-image").innerHTML = `<img src="${product.images[i]}"  width="350">`
}


//funcion que muestra las imagenes del producto
function showImages(producto){

    document.getElementById("main-image").innerHTML = `<img src="${producto.images[0]}"  width="100%">`

    let contentToAppend = '';
    for (let i = 0; i < producto.images.length; i++){        

        contentToAppend += `<img onclick="change_image(${i})" src="${producto.images[i]}" width="75">`
    }
    document.getElementById("sec-img").innerHTML = contentToAppend

}


function showComments(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let comment = array[i];

        htmlContentToAppend += `
           <li class = "list-group-item"><b>
           <span>${comment.user}</span></b>
           <span> -${comment.dateTime}-</span>
           <span>
                <span class="fa fa-star ${comment.score>=1 ?"checked" : "" }"></span>
                <span class="fa fa-star ${comment.score>=2 ?"checked" : "" }"></span>
                <span class="fa fa-star ${comment.score>=3 ?"checked" : "" }"></span>
                <span class="fa fa-star ${comment.score>=4 ?"checked" : "" }"></span>
                <span class="fa fa-star ${comment.score>=5 ?"checked" : "" }"></span>
           </span>   
           <br>
           <span>${comment.description}</span>
        `       
}
document.getElementById("comentarios").innerHTML += htmlContentToAppend
}

//hecha para poder tocar un producto relacionado y poder ver sus detalles
function setProdID(id){
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
}


function showRelatedProducts(array){
    
    let htmlContentToAppend = "";
    for (let i=0; i<array.length; i++){
        let product = array[i];        

        htmlContentToAppend += `
        <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" class="img-thumbnail" width="150">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                            <h4> ${product.name} </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    
    
    }
    document.getElementById("related-products").innerHTML += htmlContentToAppend;
}


//funcion que muestra los atributos relevantes del producto
function showProductInfo(producto){

    showImages(producto)

    document.getElementById("product-name").innerHTML = producto.name

    document.getElementById("description").innerHTML = producto.description

    document.getElementById("price").innerHTML = `${producto.currency} ${producto.cost}`

    if (producto.soldCount > 0){ 
        document.getElementById("soldCount").innerHTML = `Se han vendido ${producto.soldCount} unidades de este producto`
    }
    else{
        document.getElementById("soldCount").innerHTML = `Aun no se ha vendido ninguna unidad de este producto`
    }

    showRelatedProducts(producto.relatedProducts)
    

}



document.addEventListener("DOMContentLoaded", ()=>{

    //mostrar el nombre de perfil o "log in" arriba a la derecha
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

    //traer info del producto para pasarlo como parametro a la funcion showProductInfo
    getJSONData(product_data_url).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;
            showProductInfo(product);
        }


        //traer los comentarios del producto
        let product_comments_url = PRODUCT_INFO_COMMENTS_URL + product.id + EXT_TYPE
        getJSONData(product_comments_url).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                comments = resultObj.data;
                showComments(comments);
            }
        });

    });

    document.getElementById("AgregarAlCarro").addEventListener("click", function(){
        agregarAlCarrito();
    });

})
