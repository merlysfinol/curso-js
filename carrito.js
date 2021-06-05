let Botin = [];
let cartList = "";
let totalCompra = 0;


if (localStorage && localStorage.storageCarrito) {
    Botin = JSON.parse(localStorage.storageCarrito);
    let botonContinuarCompra = $('#botonCompra');
    botonContinuarCompra.html(`<button type="button" class="btn btn-info" id="botonCompra">Continuar compra</button>`);
}

if (Botin.length === 0) {
    const alertaCarritoVacio = document.getElementById('Sin-Productos');
    alertaCarritoVacio.innerHTML =
    `<div class="mt-3 alert alert-danger" role="alert">
        No Posee Productos.
    </div>`;
}

function actualizarCantidad(identificador, operacion) {
    let producto = Botin.find((producto) => producto.id === identificador);
    let botonIncremento = document.getElementById("Sube");
    let botonDecremento = document.getElementById("Baja");
    if (operacion === 'suma') {
        if (producto.cantidadCompra < 10) {
            producto.cantidadCompra += 1; 
        } else {
            botonIncremento.disabled = true;
        }
    } else {
        if (producto.cantidadCompra === 0) {
            botonDecremento.disabled = true;
        } else {
            producto.cantidadCompra -= 1;
        }
    }
    limpiarPantalla();
    actualizarPantalla();
    localStorage.setItem('storageCarrito', JSON.stringify(carrito));
}

function renderizarCarrito() {
    let carritoHTML = '';
    let calcularTotal = 0;
    for (const [ index,item] of Botin.entries()) {
        const precioProducto = item.cantidadCompra * item.precio;
        calcularTotal += precioProducto;
        carritoHTML += 
        `
  <div class="row shoppingCartItem"${index+1}>
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
               
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${item.nombre}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${precioProducto}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <button class="button-sube-baja decrementoProducto" onclick="actualizarCantidad(${item.id}, 'resta')" type="button">-</button>
                <label min="0" >${item.cantidadCompra}</label>
                <button class="button-sube-baja Sube-producto" onclick="actualizarCantidad(${item.id}, 'suma')" type="button">+</button>
                <button class="btn btn-danger buttonDelete" onclick="eliminarProducto(${index})" type="button">X</button>
            </div>
        </div>
    </div>`;
    }
    return { carritoHTML: carritoHTML, totalCompra: calcularTotal };
}
function limpiarPantalla() {
    const mostrarCarrito = document.getElementById('mostrarProducto');
    mostrarCarrito.textContent = '';
    PrecioTotal = document.getElementById('PrecioTotal');
    PrecioTotal.textContent = '';
}


function actualizarPantalla() {
    const respuesta = renderizarCarrito();
    if (respuesta && respuesta.carritoHTML === '') {
        return;
    }
    cartList = respuesta.carritoHTML;
    const mostrarCarrito = document.getElementById('mostrarProducto');
    mostrarCarrito.innerHTML = cartList;
    PrecioTotal = document.getElementById('PrecioTotal');
    PrecioTotal.innerHTML = `${respuesta.totalCompra}`;
};



function eliminarProducto(item) { 
    storageValores = localStorage.storageCarrito;
    Botin.splice(item, 1);
    localStorage.setItem('storageCarrito', JSON.stringify(Botin));
    limpiarPantalla();
    actualizarPantalla();
    
};

  
  actualizarPantalla();
    


    