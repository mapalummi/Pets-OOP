let activePet;

// Moderne Event-Bindung statt inline onclick
window.addEventListener("DOMContentLoaded", () => {
  const rex = new Dog("Emilio");
  const lilli = new Cat("Lilli");
  const berti = new Fish("Berti");

  activePet = rex;

  activePet.updateUI();

  document.getElementById("feed-btn").addEventListener("click", () => activePet.eat());
  document.getElementById("play-btn").addEventListener("click", () => activePet.play());
  document.getElementById("sleep-btn").addEventListener("click", () => activePet.sleep());
});
