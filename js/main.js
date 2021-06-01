let PRODUCTOS = [];
const carrito = [];
let acumuladorCard = ``;

class productos {
   titulo;
   precio;
   imagen;
   categoria;

   constructor(titulo, precio, imagen, categoria){
      this.titulo = titulo;
      this.precio = precio;
      this.imagen = imagen;
      this.categoria = categoria;
   }
   calcularStock(){
      return stock > 0;
   }
   devolverValoresDelProducto(){
      return this;
   }
}

function presentacion (nombre,apellido){
   nombre = prompt ("¿Cual es tu nombre?");
   apellido = prompt ("¿Y tu apellido?");
   nombreCompleto = nombre + " " + apellido ;
   console.log(nombreCompleto);
   alert("¡Hola! " + nombreCompleto + " Bienvenid@ a la mejor pagina de regalos!");
}
// presentacion()

function agregarProductoAlCarrito(precioDelProducto) {
   localStorage.setItem("carrito",(carrito))
   carrito.push(precioDelProducto);
   console.log(carrito);
   console.log(`tienes ${carrito.length} productos en tu carrito`);
   $(`#msjCarrito`).html(`<p class="text-center alert alert-success" style= "font-family: 'Pacifico', cursive; font-size: 25px;">Se agrego al carrito</p>`);
   $(`#msjCarrito`).fadeIn(2000,function(){
      $(`#msjCarrito`).hide();
   });
   suma= 0;
   carrito.forEach (function(carrito){
      suma += carrito;
   });
   console.log(`el total de tu carrito es ${suma}`);
}


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
   console.log(data[lang]);
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


const Categorias = ['arreglos', 'chocoramo', 'Desayunos', 'cajas', 'Lo ultimo'];

function randerizarcategoria() {
   let acumulador ='';
   Categorias.forEach(element =>{
      acumulador += `<a class="dropdown-item" onclick="filtrarProductos('${element}')">${element}</a>`  
   })
   $("#categorias2").html(acumulador);

}

function BaseDeDatos(){  
  return fetch('/productos.json').then(res => res.json());
}

function filtrarProductos(categoria) {
   let acumulador = ``;
   let productosFiltrados = PRODUCTOS.filter(elemento => elemento.categoria == categoria);
   productosFiltrados.forEach(
      element => {   acumulador += `
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 text-center mt-5">
         <div class="card mb-3">
            <img src=${element.imagen} class="card-img-top propiedades-card" alt="${element.nombre}">
            <div class="card-body">
                  <h6 class="card-title">${element.nombre}</h6>
                  <p class="card-text">CLP ${element.precio}</p>
                  <button type="submit" class="btn btn-info" onclick="identificarId(${element.id})">Agregar al carrito</a>
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

// BaseDatos().then(productos => {
//    PRODUCTOS = productos;
//    console.log({PRODUCTOS})
//    randerizarcategoria();
// })