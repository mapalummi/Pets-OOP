class Pet {
  constructor(name, image) {
    this.name = name;
    this.image = image;
    this.energy = 50;
    this.hunger = 50;
    this.happiness = 50;
    //NOTE:
    this.element = null;
    this.decayInterval = null;
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
      <p class="status-text">${this.getStatusText()}</p>
    </div>
    <div class="controls">
      <button class="feed-btn">🦴 Füttern</button>
      <button class="play-btn">🎾 Spielen</button>
      <button class="sleep-btn">😴 Schlafen</button>
    </div>
  `;

    //NOTE:
    this.element = card;
    container.appendChild(card);

    card.querySelector(".feed-btn").addEventListener("click", () => this.eat());
    card.querySelector(".play-btn").addEventListener("click", () => this.play());
    card.querySelector(".sleep-btn").addEventListener("click", () => this.sleep());

    this.startDecay();
  }

  //NOTE:
  startDecay() {
    this.decayInterval = setInterval(() => {
      this.energy = Math.max(0, this.energy - 1);
      this.hunger = Math.min(100, this.hunger + 1);
      this.happiness = Math.max(0, this.happiness - 0.5);
      this.updateUI();
    }, 3000); // alle 3 Sekunden
  }

  updateUI() {
    if (!this.element) return;
    this.element.querySelector(".energy").textContent = this.energy;
    this.element.querySelector(".hunger").textContent = this.hunger;
    this.element.querySelector(".happiness").textContent = this.happiness;
    this.element.querySelector(".status-text").textContent = this.getStatusText();
  }

  getStatusText() {
    if (this.energy < 30) return `😴 ${this.name} ist sehr müde.`;
    if (this.hunger > 70) return `🍽️ ${this.name} hat großen Hunger.`;
    if (this.happiness > 80) return `😻 ${this.name} ist super gelaunt!`;
    return `🙂 ${this.name} geht es okay.`;
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
