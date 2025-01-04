window.addEventListener("load", function () {
  let hash = window.location.hash.slice(1);
  if (!hash) {
    hash = "maintenance";
    window.location.hash = hash;
  }
  changeContent(hash);
});

window.addEventListener("hashchange", function () {
  const hash = window.location.hash.slice(1);
  changeContent(hash);
});

function changeContent(section) {
  const backgroundContainer = document.getElementById("background-content");

  let filePath = "";
  switch (section) {
    case "projects":
      filePath = "./pages/projects.html";
      break;
    case "about":
      filePath = "./pages/about.html";
      break;
    case "home":
      filePath = "./pages/home.html";
      break;
    case "maintenance":
      filePath = "./pages/maintenance.html";
      break;
    default:
      filePath = "ERROR404";
      break;
  }

  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("... error loading content");
      }
      return response.text();
    })
    .then((htmlContent) => {
      backgroundContainer.innerHTML = htmlContent;
      updateTextOnResize();
    })
    .catch((error) => {
      console.error("... error loading content", error);

      backgroundContainer.innerHTML = "";

      const errorContainer = document.createElement("div");
      errorContainer.classList.add("error-container");

      const backgroundText = document.createElement("h1");
      backgroundText.classList.add("error-text");
      backgroundText.innerHTML = "... 404 page not found!";

      const errorImage = document.createElement("img");
      errorImage.src = "./images/error.png";
      errorImage.alt = "Error Image";
      errorImage.classList.add("error-image");

      errorContainer.appendChild(backgroundText);
      errorContainer.appendChild(errorImage);

      backgroundContainer.appendChild(errorContainer);
      updateTextOnResize();
    });
}

function updateTextOnResize() {
  const maintenanceText = document.querySelector(".maintenance-text");
  const errorText = document.querySelector(".error-text");

  if (window.innerWidth <= 600) {
    if (errorText) errorText.textContent = "... 404!";
  } else {
    if (errorText) errorText.textContent = "... 404 page not found!";
  }

  if (window.innerWidth <= 575) {
    if (maintenanceText) maintenanceText.textContent = "... WIP!";
  } else if (window.innerWidth <= 725) {
    if (maintenanceText) maintenanceText.textContent = "... Under construction!";
  } else {
    if (maintenanceText) maintenanceText.textContent = "... This site is under construction!";
  }
  
}

window.addEventListener("load", updateTextOnResize);
window.addEventListener("resize", updateTextOnResize);
