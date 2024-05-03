document.addEventListener("DOMContentLoaded", function () {
  const url =
    "https://66269dbf052332d553237ae6.mockapi.io/api/nachogram/reels/Reels";

  const descripcion = document.querySelector("input#descriptionInput");
  const capturedImage = document.querySelector("img#capturedImage");

  //Evento change para modificar los eventos
  const inputFile = document.querySelector("#inputFile");
  inputFile.addEventListener("change", () => {
    if (inputFile.files.length > 0) {
      const file = inputFile.files[0];

      // Validar si el archivo seleccionado es una imagen
      if (file.type.startsWith("image/")) {
        const selectedImage = URL.createObjectURL(file);
        capturedImage.src = selectedImage;
        capturedImage.style.display = "inline";
      } else {
        alert("El archivo seleccionado no es una imagen válida");
      }
    }
  });
  // Evento al hacer clic en el botón de subir
  const btnSubir = document.getElementById("subir");
  btnSubir.addEventListener("click", subirFoto);

  // Evento al hacer clic en el botón de eliminar
  const btnEliminar = document.getElementById("eliminar");
  btnEliminar.addEventListener("click", eliminarFotoSacada);

  //Evento para volver al index
  const btnVolver = document.querySelector("button#redirect");
  btnVolver.addEventListener("click", volverIndex);

  //Funcion para subir foto
  function subirFoto(e) {
    e.preventDefault();

    // Validar que se haya ingresado una descripción
    if (!descripcion.value.trim()) {
      alert("Debe ingresar una descripción para la foto");
      return;
    }

    // Validar que se haya seleccionado una imagen
    if (!capturedImage.src || capturedImage.src === "") {
      alert("Debe capturar una imagen para subirla");
      return;
    }

    // Convertir la imagen capturada a base64
    const base64Image = convertirImagenAbase64(capturedImage);

    // Crear objeto de datos para enviar al servidor
    const data = {
      descripcion: descripcion.value,
      url: base64Image,
      fecha: new Date().toISOString(),
    };

    // Configuración de la solicitud POST
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    // Enviar la solicitud POST
    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        alert("La imagen se subió correctamente");
        // Redirigir a la página principal
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        alert("Ocurrió un error al subir la imagen");
      });
  }

  //Funcion para eliminar foto
  function eliminarFotoSacada(e) {
    e.preventDefault();
    // Vuelvo el display al inicial
    capturedImage.style.display = "none";
    //borro el valor img
    capturedImage.src = "";
    //borro la descripcion
    descripcion.value = "";
    //borro valor input
    inputFile.value = "";
  }
  //Funcion para volver al index
  function volverIndex(e) {
    e.preventDefault();
    //redirecciono al index
    window.location.href = "index.html";
  }
  //Funcion para convertir a base 64 (img a convertir)
  function convertirImagenAbase64(imgElement) {
    const canvas = document.createElement("canvas");
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);
    return canvas.toDataURL("image/webp");
  }
});
