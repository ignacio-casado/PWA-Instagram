// URL para la solicitud de la API
const URL_FETCH =
  "https://66269dbf052332d553237ae6.mockapi.io/api/nachogram/reels/Reels";

document.addEventListener("DOMContentLoaded", function () {
  // Función para cargar los datos
  async function fetchData() {
    try {
      const request = await fetch(URL_FETCH);
      const response = await request;

      if (response.ok) {
        let data = await response.json();

        if (data.length > 0) {
          // Convertir las fechas a objetos Date
          data.forEach((item) => {
            item.fecha = new Date(item.fecha);
          });

          // Ordenar los datos por fecha (de más reciente a más antigua)
          data.sort((a, b) => b.fecha - a.fecha);

          // Generar las cards en el DOM
          data.forEach((item) => {
            const cardHtml = createCard(item);
            document.getElementById("cards-container").innerHTML += cardHtml;
          });
        } else {
          showNoReelsCard(); // Mostrar la tarjeta de "No se han encontrado elementos"
        }
      } else {
        showNoReelsCard(); // Mostrar la tarjeta de "No se han encontrado elementos" en caso de respuesta no exitosa
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Función para mostrar la tarjeta de "No se han encontrado elementos"
  function showNoReelsCard() {
    const cardHtml = noReelsCard();
    document.getElementById("cards-container").innerHTML += cardHtml;
  }

  // Función para crear la tarjeta de imagen
  function createCard(data) {
    const formattedDate = data.fecha
      .toString()
      .split(" ")
      .slice(0, 4)
      .join(" ");
    return `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${data.url}" class="card-img-top" alt="imagen">
                    <div class="card-body">
                        <h5 class="card-title">${data.descripcion}</h5>
                        <p class="card-text">${formattedDate}</p>
                    </div>
                </div>
            </div>
        `;
  }

  // Función para crear la tarjeta de "No se han encontrado elementos"
  function noReelsCard() {
    return `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="./img/NoFound.png" class="card-img-top" alt="imagen">
                    <div class="card-body">
                        <h5 class="card-title">No se han encontrado elementos</h5>
                    </div>
                </div>
            </div>
        `;
  }

  fetchData();

  // Botón para capturar foto
  const imagen = document.querySelector("img#imgCamera");
  const btnCapturar = document.querySelector("button#btn-camara");

  const inputCamera = document.createElement("input");
  inputCamera.type = "file";
  inputCamera.id = "inputCamera";
  inputCamera.accept = "image/*";
  //inputCamera.capture = "user-environment";

  function convertirImagenAbase64() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    imagen.onload = function () {
      canvas.width = imagen.width;
      canvas.height = imagen.height;
      ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height);
      const base64 = canvas.toDataURL("image/webp");
      localStorage.setItem("foto", base64);
      window.location.href = "camara.html";
    };

    imagen.src = URL.createObjectURL(inputCamera.files[0]);
  }
  btnCapturar.addEventListener("click", () => {
    inputCamera.click();
  });

  inputCamera.addEventListener("change", () => {
    if (inputCamera.value !== "") {
      convertirImagenAbase64();
    } else {
      console.log("err");
    }
  });
});
