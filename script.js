const extensionsContainer = document.querySelector(".extensions");
const template = document.querySelector("#ext-temp");
const allFilterEl = document.querySelector("#all");
const root = document.documentElement;
const themeToggler = document.querySelector(".color-mode-toggle");
const themeIcon = document.querySelector(".mode-icon");
let extensionsData;
fetch("./data.json")
  .then((res) => res.json())
  .then((res) => {
    extensionsData = res;
    renderExtensions(res);
  });

function renderExtensions(data) {
  extensionsContainer.innerHTML = "";
  console.log(data);

  data.forEach((extData) => {
    const clone = document.importNode(template.content, true);
    const extEl = clone.querySelector(".extension");
    const extImgEl = clone.querySelector(".ext-img");
    const extNameEl = clone.querySelector(".ext-name");
    const extDescriptionEl = clone.querySelector(".ext-description");
    const activationStatusEl = clone.querySelector("input[type='checkbox']");
    const activationLabelEl = clone.querySelector("label");
    const removeExtEl = clone.querySelector(".action-remove");
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
      extData.isActive = !extData.isActive;
      if (!allFilterEl.checked) {
        extEl.style.display = "none";
      }
    });
    removeExtEl.addEventListener("click", () => {
      extEl.style.display = "none";
      extData["removed"] = true;
    });
  });
}
// Dark & light themes
if (localStorage.getItem("data-theme")) {
  root.setAttribute("data-theme", localStorage.getItem("data-theme"));
  changeThemeIcon();
}

themeToggler.addEventListener("click", () => {
  if (root.getAttribute("data-theme") === "dark") {
    root.setAttribute("data-theme", "light");

    localStorage.setItem("data-theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("data-theme", "dark");
  }
  changeThemeIcon();
});
function changeThemeIcon() {
  if (localStorage.getItem("data-theme") === "light") {
    themeIcon.setAttribute("src", "./assets/images/icon-moon.svg");
    themeIcon.setAttribute("alt", "icon of dark mode");
  } else {
    themeIcon.setAttribute("src", "./assets/images/icon-sun.svg");
    themeIcon.setAttribute("alt", "icon of light mode");
  }
}
// filtering functionality
[...document.querySelectorAll("input[name=filter]")].forEach((filterEl) => {
  filterEl.addEventListener("input", () => {
    const filteredExtensions = filterExtensions(extensionsData, filterEl.id);
    renderExtensions(filteredExtensions);
  });
});

function filterExtensions(extensions, filter = null) {
  let filteredExtensions;
  filteredExtensions = extensions.filter((extension) => {
    return !extension.removed;
  });
  switch (filter) {
    case "active":
      filteredExtensions = filteredExtensions.filter((extension) => {
        return extension.isActive;
      });
      break;
    case "inactive":
      filteredExtensions = filteredExtensions.filter((extension) => {
        return !extension.isActive;
      });
      break;

    default:
      break;
  }
  return filteredExtensions;
}
