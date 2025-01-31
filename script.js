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
      filePath = "./pages/maintenance.html";
      break;
    case "maintenance":
      filePath = "./pages/maintenance.html";
      break;
    case "mapgen-demo":
      filePath = "./pages/mapgen-demo.html";
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
      if(window.location.hash === "#projects") { showSlides(slideIndex); }
      updateTextOnResize();
      if(window.location.hash === "#mapgen-demo") {
        document.getElementById("gamemode").addEventListener("change", updateTeamInputs);
        updateTeamInputs();
      }
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

      const errorSubtitle = document.createElement("h3");
      errorSubtitle.classList.add("error-text");
      errorSubtitle.id = "error-subtitle";

      const link = document.createElement("a");
      link.href = "#projects";
      link.classList.add("link");
      link.id = "error-subtitle-a";
      link.textContent = "Return to projects page";

      errorSubtitle.appendChild(link);
      
      backgroundContainer.appendChild(errorContainer);
      backgroundContainer.appendChild(errorSubtitle);
      updateTextOnResize();
    });
}

function updateTextOnResize() {
  const maintenanceText = document.querySelector(".maintenance-text");
  const maintenanceSubText = document.querySelector("#maintenance-subtitle-a");
  const errorText = document.querySelector(".error-text");
  const errorSubText = document.querySelector("#error-subtitle-a");

  if (window.innerWidth <= 600) {
    if (errorText) errorText.textContent = "... 404!";
    if (errorSubText) errorSubText.textContent = "Return";
  } else {
    if (errorText) errorText.textContent = "... 404 page not found!";
    if (errorSubText) errorSubText.textContent = "Return to projects page";
  }

  if (window.innerWidth <= 575) {
    if (maintenanceText) maintenanceText.textContent = "... WIP!";
    if (maintenanceSubText) maintenanceSubText.textContent = "Go to projects";
  } else if (window.innerWidth <= 725) {
    if (maintenanceText)
      maintenanceText.textContent = "... Under construction!";
    if (maintenanceSubText) maintenanceSubText.textContent = "Feel free to browse my projects!";
  } else {
    if (maintenanceText)
      maintenanceText.textContent = "... This site is under construction!";
    if (maintenanceSubText) maintenanceSubText.textContent = "Feel free to browse my projects in the meantime!";
  }
  const slides = document.querySelectorAll(".mySlides");

  slides.forEach((slide) => {
    if (slide.style.display === "block") {
      const leftSection = slide.querySelector(".left-section");
      const middleSection = slide.querySelector(".middle-section");
      const rightSection = slide.querySelector(".right-section");
      const imageSection = slide.querySelector(".image-section");
      const projectDescriptionBig = slide.querySelector(".project-description-big");
      const projectDescriptionSmall = slide.querySelector(".project-description-small");

      if (window.innerWidth <= 585) {
        if (leftSection) leftSection.style.display = "block";
        if (middleSection) middleSection.style.display = "none";
        if (rightSection) rightSection.style.display = "none";
        if (imageSection) imageSection.style.display = "none";
        if (projectDescriptionBig) projectDescriptionBig.style.display = "none";
        if (projectDescriptionSmall) projectDescriptionSmall.style.display = "block";
      } else if (window.innerWidth <= 790) {
        if (leftSection) leftSection.style.display = "block";
        if (middleSection) middleSection.style.display = "none";
        if (rightSection) rightSection.style.display = "none";
        if (imageSection) imageSection.style.display = "block";
        if (projectDescriptionBig) projectDescriptionBig.style.display = "block";
        if (projectDescriptionSmall) projectDescriptionSmall.style.display = "none";
      } else if (window.innerWidth <= 1015) {
        if (leftSection) leftSection.style.display = "none";
        if (middleSection) middleSection.style.display = "block";
        if (rightSection) rightSection.style.display = "block";
        if (imageSection) imageSection.style.display = "block";
        if (projectDescriptionBig) projectDescriptionBig.style.display = "block";
        if (projectDescriptionSmall) projectDescriptionSmall.style.display = "none";
      } else {
        if (leftSection) leftSection.style.display = "block";
        if (middleSection) middleSection.style.display = "block";
        if (rightSection) rightSection.style.display = "block";
        if (imageSection) imageSection.style.display = "block";
        if (projectDescriptionBig) projectDescriptionBig.style.display = "block";
        if (projectDescriptionSmall) projectDescriptionSmall.style.display = "none";
      }
    }
  });
}

window.addEventListener("load", updateTextOnResize);
window.addEventListener("resize", updateTextOnResize);

let slideIndex = 1;

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  updateTextOnResize();
  ShowProjectDescription(n);
}

function ShowProjectDescription(n) {
  const projectDescription = document.getElementById("project-description");
  let description = "";

  switch (n) {
    case 1:
    case 5:
      description = "Beook Solutions is a tool for Beook, a digital learning platform. It enables access to solutions for coursebooks. Compatible with Beook 9.2.0 or later.";
      break;
    case 2:
      description = "Carbon Craft is a Minecraft mod for the Minecraft 1.20.6 Java Edition. It adds several new blocks and items surrounding the world of steel.";
      break;
    case 3:
      description = "'Mapgen' is a containerized service accessible as a Web API. It generates a bingo board image based on provided parameters. It is part of an in-development Minecraft Bingo Plugin.";
      break;
    case 4:
    case 0:
      description = "FSA (File Sharing App) Local is an app that allows clients to share files with each other. It's meant to be used within a local network, although the usage across networks is possible.";
      break;
    default:
      description = "Sorry! Either something went wrong or this project has no description.";
      break;
  }

  projectDescription.innerHTML = description;
}