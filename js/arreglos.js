console.log(JSON.parse(localStorage.getItem("carrito")));

const productos = [
    {nombre: "Maxi Arreglo", precio: "33.000" , stock:"5"},
    {nombre: "Box Cervezero", precio: "15.000" , stock:"10"},
    {nombre: "Luxy Arreglo", precio: "21.990" , stock:"3"},
    {nombre: "Arreglo Dacia", precio: "20.000" , stock:"5"},
    {nombre: "Arreglo Venezolano", precio: "27.000" , stock:"6"},
    {nombre: "Box a tu gusto", precio: "20.000" , stock:"7"},
    {nombre: "Arreglo gold", precio: "24.990" , stock:"8"},
    {nombre: "Arreglo Pro", precio: "35.000" , stock:"3"},
    {nombre: "Arreglo 0 Azucar", precio: "26.000" , stock:"4"},
]


localStorage.setItem("carrito", JSON.stringify(productos));