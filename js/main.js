
let PRODUCTOS = [];
let acumuladorCard = ``;
let storageValores = localStorage.storageCarrito;
let carrito = [];

function presentacion (nombre,apellido){
   nombre = prompt ("¿Cual es tu nombre?");
   apellido = prompt ("¿Y tu apellido?");
   nombreCompleto = nombre + " " + apellido ;
   console.log(nombreCompleto);
   alert("¡Hola! " + nombreCompleto + " Bienvenid@ a la mejor pagina de regalos!");
}
// presentacion()


function validarFormulario(){
   let nombre = document.getElementById(`name`).value;
   let apellido = document.getElementById(`surname`).value;
   let correo = document.getElementById(`email`).value;
   let telefono = document.getElementById(`phone`).value;
   let edad = document.getElementById(`edad`).value;

   edad = edad || 0

   if(edad >= 18){
      alert(`Hola ${nombre}${apellido}, su correo ${correo} junto con su numero ${telefono} ha quedado registrado en el sistema`);
      console.log(nombre,edad,apellido,correo,telefono);
   }else{
      var texto = document.createElement("p");
      texto.innerHTML = "Debe ser mayor de edad para registrar su datos";
      document.getElementById("alerta").appendChild(texto);
   }
   console.log(nombre)
   return nombre
}

function mensaje (event){
   console.log(event.target.value);
   alert(`Recibimos tu nombre`)
}

async function cambiaridioma(lang) {   
   let response = await fetch("/language.json");
   let data = await response.json();
   $("#primer").html(data[lang].primer)
   $("#segundo").html(data[lang].segundo)
   $("#tercero").html(data[lang].tercero)
   $("#cuarto").html(data[lang].cuarto)

   $("#titulo1").html(data[lang].titulo1)
   $("#quinto").html(data[lang].quinto)
   $("#sexto").html(data[lang].sexto)
   $("#septimo").html(data[lang].septimo)
   $("#octavo").html(data[lang].octavo)
   $("#noveno").html(data[lang].noveno)

   $("#titulo2").html(data[lang].titulo2) 

   $("#titulo3").html(data[lang].titulo3)
}

function ocultar(){
   document.getElementById('Ocultar3').style.display = 'none';
   }

const Categorias = ['arreglos', 'chocoramo', 'Desayunos', 'cajas', 'Lo ultimo'];

function randerizarcategoria() {
   let acumulador ='';
   Categorias.forEach(element =>{
      acumulador += `<a class="dropdown-item" onclick="filtrarProductos('${element}'); ocultar()">${element}</a>`  
   })
   
   $("#categorias2").html(acumulador);

}


function BaseDeDatos(){  
  return fetch('/productos.json').then(res => res.json());
}

function filtrarProductos(categoria) {
   let acumulador = ``;
   let productosFiltrados = PRODUCTOS.filter(elemento => elemento.categoria === categoria);
   productosFiltrados.forEach(
      element => {   acumulador += `
      <div class="items">
      <div class="card col-12 col-md-12 col-lg-12 animate__animated animate__slideInDown" id="medidaDiv">
            <img src=${element.imagen} class="card-img-top propiedades-card card-image" alt="${element.nombre}">
            <div class="card-body">
                  <h6 class="card-title">${element.nombre}</h6>
                  <p class="card-text">CLP ${element.precio}</p>
                  <button type="submit" class="btn btn-info addToCart" onclick="identificarId(${element.id})">Agregar al carrito</a>
            </div>
      </div>
      </div>`;
   });
   $("#cardCajas").html(acumulador)
} 



// EMPIEZA MI APP
async function init() {
   PRODUCTOS = await BaseDeDatos();
   randerizarcategoria();
}
init();


// VALIDAR LOCAL STORAGE
const validarLocalStorage = () => {
   if(storageValores === undefined) {
       carrito = [];
   } else {
       carrito = JSON.parse(storageValores);
   }
}


validarLocalStorage();

// IDENTIFICA ID DEL PRODUCTO Y AGREGA EL ID CARRITO
function identificarId(identificaProductos) {
   const productoBuscado = PRODUCTOS.find((producto) => producto.id === identificaProductos);
   agregarAlCarrito(productoBuscado);
   const alerta = document.getElementById('alertBotin');
   alerta.innerHTML = 
       `<div class="mt-3 alert alert-success" role="alert">
           Su Producto Se Agrego Correctamente
           <button type="button" class="close" data-dismiss="alert" aria-label="Close">
               <span aria-hidden="true">&times;</span>
           </button>
       </div>`;
}

// VALIDAR SI EL PRODUCTO DEL CARRITO SE REPITE
function validarProductoCarrito (identificaProductos) {
   const producto = carrito.find((item) => item.id === identificaProductos);
   return producto;
}

// AGREGAR AL CARRITO
function agregarAlCarrito(producto) {
   const productoCarrito = validarProductoCarrito(producto.id);
   if (productoCarrito) {
       productoCarrito.cantidadCompra += 1; 
       localStorage.setItem('storageCarrito', JSON.stringify(carrito));
   } else {
       producto.cantidadCompra = 1;
       carrito.push(producto);
       localStorage.setItem('storageCarrito', JSON.stringify(carrito));
   }
}


