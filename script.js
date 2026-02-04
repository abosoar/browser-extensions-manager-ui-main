const extensionsContainer = document.querySelector(".extensions");
const template = document.querySelector("#ext-temp");
const allFilterEl = document.querySelector("#all");
if (localStorage.getItem('data-theme')){
  document.documentElement.setAttribute('data-theme', localStorage.getItem('data-theme'))
}
let extensionsData;
fetch("./data.json")
  .then((res) => res.json())
  .then((res) => {
    extensionsData = res;
    renderExtensions(res);
  });

function renderExtensions(data) {
  extensionsContainer.innerHTML = "";

  data.forEach((extData) => {
    const clone = document.importNode(template.content, true);
    const extEl = clone.querySelector(".extension");
    const extImgEl = clone.querySelector(".ext-img");
    const extNameEl = clone.querySelector(".ext-name");
    const extDescriptionEl = clone.querySelector(".ext-description");
    const activationStatusEl = clone.querySelector("input[type='checkbox']");
    const activationLabelEl = clone.querySelector("label");
    extImgEl.setAttribute("src", extData.logo);
    extImgEl.setAttribute("alt", extData.name + " Logo");
    activationStatusEl.setAttribute("name", extData.name);
    activationStatusEl.setAttribute("id", extData.name);
    activationLabelEl.setAttribute("for", extData.name);
    extNameEl.textContent = extData.name;
    extDescriptionEl.textContent = extData.description;
    extensionsContainer.appendChild(clone);
    activationStatusEl.checked = extData.isActive;

    activationStatusEl.addEventListener("input", () => {
      extData.isActive = !extData;
      if (!allFilterEl.checked) {
        extEl.style.display = "none";
      }
    });
  });
}
// Dark & light themes
const root = document.documentElement;
const themeToggler = document.querySelector(".color-mode-toggle");
const themeIcon = document.querySelector(".mode-icon");
themeToggler.addEventListener("click", () => {
  if (root.getAttribute("data-theme") === "dark") {
    root.setAttribute("data-theme", "light");
    themeIcon.setAttribute("src", "./assets/images/icon-moon.svg");
    themeIcon.setAttribute("alt", "icon of light mode");
    localStorage.setItem('data-theme', 'light')
  } else {
    root.setAttribute("data-theme", "dark");
    themeIcon.setAttribute("src", "./assets/images/icon-sun.svg");
    themeIcon.setAttribute("alt", "icon of light mode");
    localStorage.setItem('data-theme', 'dark')
  }
});

// filtering functionality
[...document.querySelectorAll("input[name=filter]")].forEach((filterEl) => {
  filterEl.addEventListener("input", () => {
    const filteredExtensions = filterExtensions(extensionsData, filterEl.id);
    renderExtensions(filteredExtensions);
  });
});

function filterExtensions(extensions, filter = null) {
  let filteredExtensions;
  switch (filter) {
    case "active":
      filteredExtensions = extensions.filter((extension) => {
        return extension.isActive;
      });
      break;
    case "inactive":
      filteredExtensions = extensions.filter((extension) => {
        return !extension.isActive;
      });
      break;

    default:
      filteredExtensions = extensions;
      break;
  }
  return filteredExtensions;
}
