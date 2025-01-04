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
    if (maintenanceText)
      maintenanceText.textContent = "... Under construction!";
  } else {
    if (maintenanceText)
      maintenanceText.textContent = "... This site is under construction!";
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
}
