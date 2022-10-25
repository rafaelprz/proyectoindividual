let cat_id = localStorage.getItem("catID")
let PRODSURL = PRODUCTS_URL + cat_id + EXT_TYPE
let minPrice = undefined;
let maxPrice = undefined;
const ORDER_ASC_BY_PRICE = "ASC";
const ORDER_DESC_BY_PRICE = "DESC";
const ORDER_BY_PROD_SALES = "VENTAS";

//variable donde quedara almacenado el arreglo de productos "traído" desde la URL
let products = [];


function setProdID(id){
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
}

//funcion que recibe un arreglo y lo muestr en pantalla teniendo en cuenta los filtros
function showProducts(array, categoryName){
    
    let htmlContentToAppend = "";
    for (let i=0; i<array.length; i++){
        let product = array[i];

        if (!(parseInt(product.cost) < minPrice) && !(parseInt(product.cost) > maxPrice)){

            htmlContentToAppend += `
            <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4>`+ product.name +`</h4>
                            <h5>` + product.currency  + " " + product.cost +`</h5>
                            <p> `+ product.description +`</p> 
                            </div>
                            <small class="text-muted">` + product.soldCount + ` ventas</small> 
                        </div>
                    </div>
                </div>
            </div>
            `
    }
    

}
document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
document.getElementById("cualCat").innerHTML += `${categoryName}`

}

//funcion que recibe un criterio y un arreglo y ordena dicho arreglo segun dicho criterio
//y luego llama a la funcion anterior para mostrar el arreglo ordenado en pantalla
function sortAndShowProducts(criterio, array){
    let sorted_array = [];

    if (criterio === ORDER_ASC_BY_PRICE)
    {
        sorted_array = array.sort(function(a, b) {
            if (parseInt(a.cost) < parseInt(b.cost)){ return -1; }
            if (parseInt(a.cost) > parseInt(b.cost)){ return 1; }
            return 0;
        });
    }else if (criterio === ORDER_DESC_BY_PRICE){
        sorted_array = array.sort(function(a, b) {
            if (parseInt(a.cost) > parseInt(b.cost)){ return -1; }
            if (parseInt(a.cost) < parseInt(b.cost)){ return 1; }
            return 0;
        });
    }else if (criterio === ORDER_BY_PROD_SALES){
        sorted_array = array.sort(function(a, b) {
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);

            if ( aSoldCount > bSoldCount ){ return -1; }
            if ( aSoldCount < bSoldCount ){ return 1; }
            return 0;
        });
    }


    showProducts(sorted_array, category_name)
}


function buscador(listaproducts){
    let textoEscrito = document.getElementById("busca").value;

    let listaFiltrada = listaproducts.filter(producto => {
        return producto.name.toLowerCase().indexOf(textoEscrito.toLowerCase()) > -1;
    })
    
    showProducts(listaFiltrada, "");
}



let category_name = "";

document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(PRODSURL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            category_name = resultObj.data.catName
            products = resultObj.data.products;
            showProducts(products, category_name);
        }
    });

    //mostrar username o log in arriba a la derecha
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

    
    document.getElementById("sortAsc").addEventListener("click", ()=>{
        sortAndShowProducts(ORDER_ASC_BY_PRICE, products);
    });

    document.getElementById("sortDesc").addEventListener("click", ()=>{
        sortAndShowProducts(ORDER_DESC_BY_PRICE, products);
    });

    document.getElementById("sortBySales").addEventListener("click", ()=>{
        sortAndShowProducts(ORDER_BY_PROD_SALES, products);
    });

    //Vaciar los campos del rango asi como tambien las variables asociadas a sus valores
    document.getElementById("clearRangeFilter").addEventListener("click", ()=>{
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProducts(products, category_name);
    });


    //almacenar los valores del rango para usarlos en ShowProducts()
    document.getElementById("rangeFilterPrice").addEventListener("click", ()=>{
        
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showProducts(products, category_name);
    });

    document.getElementById("cerrarSesion").addEventListener("click", ()=>{
        sessionStorage.user = null;
        Swal.fire('Sesion cerrada');
        document.getElementById('iniciarCerrar').innerHTML = '<a class="nav-link" href="login.html">Log In</a>';

    })

    document.getElementById('busca').addEventListener('keyup',()=>{
     
        buscador(products);
    });


    
});