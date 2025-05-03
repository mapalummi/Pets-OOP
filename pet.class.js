class Pet {
  constructor(name, image) {
    this.name = name;
    this.image = image;
    this.energy = 50;
    this.hunger = 50;
    this.happiness = 50;
    this.element = null;
  }

  render(container) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
    <img src="${this.image}" alt="${this.name}" class="pet-image" />
      <h2>${this.name}</h2>
      <div class="status">
        <p><strong>Energie:</strong> <span class="energy">${this.energy}</span></p>
        <p><strong>Hunger:</strong> <span class="hunger">${this.hunger}</span></p>
        <p><strong>Laune:</strong> <span class="happiness">${this.happiness}</span></p>
      </div>
      <div class="controls">
        <button class="feed-btn">🦴 Füttern</button>
        <button class="play-btn">🎾 Spielen</button>
        <button class="sleep-btn">😴 Schlafen</button>
      </div>
    `;

    this.element = card;
    container.appendChild(card);

    card.querySelector(".feed-btn").addEventListener("click", () => this.eat());
    card.querySelector(".play-btn").addEventListener("click", () => this.play());
    card.querySelector(".sleep-btn").addEventListener("click", () => this.sleep());
  }

  updateUI() {
    if (!this.element) return;
    this.element.querySelector(".energy").textContent = this.energy;
    this.element.querySelector(".hunger").textContent = this.hunger;
    this.element.querySelector(".happiness").textContent = this.happiness;
  }

  eat() {
    this.hunger = Math.max(0, this.hunger - 20);
    this.energy = Math.min(100, this.energy + 10);
    this.updateUI();
  }

  play() {
    this.happiness = Math.min(100, this.happiness + 15);
    this.energy = Math.max(0, this.energy - 10);
    this.updateUI();
  }

  sleep() {
    this.energy = Math.min(100, this.energy + 30);
    this.hunger = Math.min(100, this.hunger + 10);
    this.updateUI();
  }
}
