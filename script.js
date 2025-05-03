const pets = [new Dog("Emilio"), new Cat("Lilli"), new Fish("Bubbles")];

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("pets-container");
  container.classList.add("pets-grid");
  pets.forEach(pet => pet.render(container));
});
