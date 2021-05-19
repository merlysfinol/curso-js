
const carrito = [];
const baseDeDatos = [];
let acumuladorCard = ``;

class producto {
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

let ProductoUno = new producto ("Caja Sopresa Grande", 50000, "../img/caja1.jpeg", "cajas");
let ProductoDos = new producto ("Caja Sopresa Dulces", 35000, "../img/caja2.jpeg", "cajas");
let ProductoTres = new producto ("Caja Con Bouquet De Globos", 25000, "../img/caja3,3.jpeg", "cajas");
let ProductoCuatro = new producto ("Caja Sorpresa Mediana", 40000, "../img/regalo4.jpeg","cajas");
let ProductoCinco = new producto ("Cajita De Amor", 20000, "../img/caja7.jpeg", "cajas");
let ProductoSeis = new producto ("Caja Sorpresa Pequeña", 30000, "../img/caja6.jpeg", "cajas");


baseDeDatos.push(ProductoUno);
baseDeDatos.push(ProductoDos);
baseDeDatos.push(ProductoTres);
baseDeDatos.push(ProductoCuatro);
baseDeDatos.push(ProductoCinco);
baseDeDatos.push(ProductoSeis);
console.log(baseDeDatos);

function presentacion (nombre,apellido){
nombre = prompt ("¿Cual es tu nombre?");
apellido = prompt ("¿Y tu apellido?");
nombreCompleto = nombre + " " + apellido ;
console.log(nombreCompleto);
alert("¡Hola! " + nombreCompleto + " Bienvenid@ a la mejor pagina de regalos!");
}
// presentacion()

for (let i = 0; i < baseDeDatos.length; i++){
   console.log("valor del i:" +i);
   console.log(baseDeDatos[i]);
   acumuladorCard += `
   
   <div class="card col-12 col-md-12 col-lg-12 animate__animated animate__slideInDown" id="medidaDiv">
      <img class="card-img-top" src="${baseDeDatos[i].imagen}" alt="Card image" id="medidaCard">
      <div class=" col card-body ">
        <h4 class="card-title text-center">${baseDeDatos[i].titulo}</h4>
        <p class="card-text text-center">${baseDeDatos[i].precio}</p>
         <div class="col text-center">
         <a onclick="agregarProductoAlCarrito(${baseDeDatos[i].precio})" href="#" id="mensaje" class="btn btn-info addToCard btn-default">Agregar al carrito</a>
         </div>
      </div>
   </div>`
}
 
cardcard = document.getElementById("cardCajas");
cardcard.innerHTML  = acumuladorCard;

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

   function BaseDeDatos() {
      let productosBD = [];
      $.ajax({
          async: false,
          global: false,
          url: "/productos.json",
          dataType: "json",
          success: (data) => {
              productosBD = data;
          },
          error: (error) => {
              console.log('Error AJAX: ', error);
          }
      });
      return productosBD;
  }
 
      const Productos = BaseDeDatos();
      randerizarcategoria();

      function randerizarcategoria() {
         let acumulador ='';
         categoria.forEach(element =>{
            acumulador += `<a class="dropdown-item" onclick'=filtrarProductos("${element}")'>${element}</a>`  

         })
         $("#arreglos", "cajas", "lo ultimo", "chocoramos", "desayunos").html(acumulador);
      
      }
      function filtrarProductos(cajas){
         console.log(cajas)
         Productos.filter(element=> element.categoria == categoria);
         let acumulador = ``
         productosFiltrados.forEach(
            element => acumulador += `<div>${element.categoria} - ${element.class}</div>`
         )
         
      }

   $("root")
