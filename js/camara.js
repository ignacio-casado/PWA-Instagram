document.addEventListener("DOMContentLoaded", function () {
  // Recupera la imagen base64 del almacenamiento local
  const capturedImage = localStorage.getItem("foto");
  // Muestra la imagen en la página
  const img = document.getElementById("capturedImage");
  img.src = capturedImage;

  // Agregar evento click al botón de subir
  const btnSubir = document.querySelector("a#subir");
  btnSubir.addEventListener("click", subirFoto);

  const btnEliminar = document.querySelector("a#eliminar");
  btnEliminar.addEventListener("click", eliminarFotoSacada);
});

const url =
  "https://66269dbf052332d553237ae6.mockapi.io/api/nachogram/reels/Reels";
const descripcion = document.querySelector("input#descriptionInput");
function subirFoto(e) {
  e.preventDefault();

  // Validar que se haya ingresado una descripción
  if (!descripcion.value.trim()) {
    alert("Debe tener una descripcion");
    return;
  }

  // Validar que haya una foto
  const capturedImage = localStorage.getItem("foto");
  if (!capturedImage) {
    alert("Debe subir una foto para postear");
    return;
  }
  // Si pasa ambas validaciones, procede con el envío de la publicación

  const data = {
    descripcion: descripcion.value,
    url: capturedImage.toString(),
    fecha: new Date(),
  };
  const metod = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(url, metod)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Respuesta del servidor:", data);
      window.location.href = "index.html";
      // Hacer algo con la respuesta del servidor
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
}

function eliminarFotoSacada(e) {
  e.preventDefault();
  localStorage.removeItem("foto");
  window.location.href = "index.html";
}
