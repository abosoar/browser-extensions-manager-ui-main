const extensionsContainer = document.querySelector(".extensions");
const template = document.querySelector("#ext-temp");

fetch("./data.json")
  .then((res) => res.json())
  .then((res) => {
    res.forEach((extData) => {
      const clone = document.importNode(template.content, true);
      const extImgEl = clone.querySelector(".ext-img");
      const extNameEl = clone.querySelector(".ext-name");
      const extDescriptionEl = clone.querySelector(".ext-description");
      const activationStatusEl = clone.querySelector("input[type='checkbox']");
      const activationLabelEl = clone.querySelector('label');
      extImgEl.setAttribute("src", extData.logo);
      extImgEl.setAttribute("alt", extData.name + " Logo");
      activationStatusEl.setAttribute('name', extData.name);
      activationStatusEl.setAttribute('id', extData.name);
        activationLabelEl.setAttribute('for', extData.name);
      extNameEl.textContent = extData.name;
      extDescriptionEl.textContent = extData.description;
      extensionsContainer.appendChild(clone);
      if (extData.isActive) {
        activationStatusEl.setAttribute("checked", extData.isActive);
      }
    });
  });
const root = document.documentElement;
const themeToggler = document.querySelector(".color-mode-toggle");
const themeIcon = document.querySelector(".mode-icon");
themeToggler.addEventListener("click", () => {
    if (root.getAttribute('data-theme') === 'dark'){
        root.setAttribute("data-theme", "light");
        themeIcon.setAttribute('src', './assets/images/icon-moon.svg')
        themeIcon.setAttribute('alt', 'icon of light mode')
    }
    else{
        root.setAttribute("data-theme", "dark");
        themeIcon.setAttribute('src', './assets/images/icon-sun.svg')
        themeIcon.setAttribute('alt', 'icon of light mode')
    }
});
