let customElements = document.querySelectorAll("section");
let customNavTag = document.querySelector(".magic-navbar ul");
let customElementsLength = customElements.length;
let customElementsPositions = [];
let previousPosition = 0;
let currentPosition = 0;

function scrollToCustomElement(sectionID) {
  let element = document.querySelector(`section[data-nav="${sectionID}"]`);
  let offsetPosition = element.offsetTop - 50; // Subtract 50 from offsetTop
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth' // Add smooth scrolling behavior
  });
}

// Build the custom nav bar
customElements.forEach((element, index) => {
  let sectionName = element.getAttribute("data-nav");
  let offsetPosition = element.offsetTop - 50; // Subtract 50 from offsetTop
  let liTag = document.createElement("li");
  liTag.setAttribute("class", "custom-menu-link-" + index);
  liTag.innerHTML = `<a onClick="scrollToCustomElement('${sectionName}')">${sectionName}</a>`;
  customNavTag.appendChild(liTag);
});

document.addEventListener("scroll", () => {
  currentPosition = window.scrollY;

  // Custom Element Positions
  customElementsPositions = [];
  customElements.forEach((element) => customElementsPositions.push(element.getBoundingClientRect().top + window.scrollY));

  // Adding and removing active elements
  let addIndex = customElementsPositions.findIndex((element) => element > window.scrollY);
  if (addIndex === -1) {
    addIndex = customElementsPositions.length - 1;
  }
  for (let i = 0; i < customElementsLength; i++) {
    if (addIndex === i) {
      document.querySelector(".custom-menu-link-" + addIndex).classList.add("active");
      document.querySelector(`.custom-menu-link-${addIndex} a`).classList.add("active-link");
      document.querySelector(`section[data-nav="${customElements[i].getAttribute('data-nav')}"]`).classList.add("current-active-class");
    } else {
      document.querySelector(".custom-menu-link-" + i).classList.remove("active");
      document.querySelector(`.custom-menu-link-${i} a`).classList.remove("active-link");
      document.querySelector(`section[data-nav="${customElements[i].getAttribute('data-nav')}"]`).removeAttribute("class");
    }
  }
});
