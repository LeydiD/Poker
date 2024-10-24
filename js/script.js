document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      if (username === "admin" && password === "1234") {
        window.location.href = "cartas.html";
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    });
  }
});

document.querySelector('#registrar').addEventListener('click', function (event) {
  event.preventDefault();
  guardarCarta();
  mostrarEnTabla();
});


function leerJSON() {
  $.getJSON("../data/data.json", function (datos) {
    console.log(datos);
  });
}

function cargarJSON() {
  var miObjeto = [
    { 'numero': '1', 'carta': 'as', 'cantidad': '2' },
    { 'numero': '2', 'carta': '2 de diamantes', 'cantidad': '3' }];
  localStorage.setItem('datos', JSON.stringify(miObjeto));
}

function mostrarEnTabla() {
  var datos = localStorage.getItem('datos');
  let lista = document.querySelector('#lista');
  lista.innerHTML = '';

  console.log('objetoObtenido: ', JSON.parse(datos))
  datos = JSON.parse(datos);

  datos.sort(function (a, b) {
    return b.cantidad - a.cantidad;
  });
  
  for (item of datos) {
    lista.innerHTML += `
     <tr>
        <td>${item.numero}</td>
        <td>${item.carta}</td> 
        <td>${item.cantidad}</td>
    </tr>
    `;
  }
}

function guardarCarta() {
  var numero = document.querySelector('#numero').value;
  var carta = document.querySelector('#carta').value;
  var datos = localStorage.getItem('datos');
  datos = JSON.parse(datos);
  var dato = { numero: numero, carta: carta, cantidad: '0' };

  datos.push(dato);

  localStorage.setItem('datos', JSON.stringify(datos));
}

document.querySelectorAll(".cartas").forEach(function(carta) {
  carta.addEventListener('click', function() {
    var datos = localStorage.getItem('datos');
    datos = JSON.parse(datos);

    for (let item of datos) {
      if (item.numero == this.dataset.carta) {
        item.cantidad++;
      }
    }

    localStorage.setItem('datos', JSON.stringify(datos));
    mostrarEnTabla();
  });
});


leerJSON();
cargarJSON();
mostrarEnTabla();



