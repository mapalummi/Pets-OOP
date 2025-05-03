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

    this.loadState();
  }

  render(container) {
    this.loadState();
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
  <img src="${this.image}" alt="${this.name}" class="pet-image" />
  <h2>${this.name}</h2>
  <div class="status">
    ${this.createStatusBar("Energie", "energy", this.energy)}
    ${this.createStatusBar("Hunger", "hunger", this.hunger)}
    ${this.createStatusBar("Laune", "happiness", this.happiness)}
    <p class="status-text">${this.getStatusText()}</p>
    <p class="action-log"></p>
  </div>
  <div class="controls">
    <button class="feed-btn">🦴 Füttern</button>
    <button class="play-btn">🎾 Spielen</button>
    <button class="sleep-btn">😴 Schlafen</button>
  </div>
  <button class="revive-btn" style="display: none;">💖 Wiederbeleben 💖</button>
`;

    //NOTE:
    this.element = card;
    container.appendChild(card);

    card.querySelector(".feed-btn").addEventListener("click", () => this.eat());
    card.querySelector(".play-btn").addEventListener("click", () => this.play());
    card.querySelector(".sleep-btn").addEventListener("click", () => this.sleep());

    const reviveBtn = card.querySelector(".revive-btn");

    //NEUE Funktion:
    if (reviveBtn) {
      reviveBtn.addEventListener("click", () => this.revive());
      // Zeige den Button nur, wenn das Tier gestorben ist
      if (this.energy === 0) {
        reviveBtn.style.display = "block";
      }
    }

    //Reihenfolge damit Balken auch beim Neuladen richtig angezeit werden:
    this.loadState();
    this.updateUI();
    this.startDecay();
  }

  //NOTE:
  logAction(text) {
    if (!this.element) return;
    const log = this.element.querySelector(".action-log");
    log.textContent = text;
  }

  //NOTE:
  //   startDecay() {
  //     this.decayInterval = setInterval(() => {
  //       this.energy = Math.max(0, this.energy - 1);
  //       this.hunger = Math.min(100, this.hunger + 1);
  //       this.happiness = Math.max(0, this.happiness - 0.5);
  //       this.updateUI();
  //     }, 5000); // alle 5 Sekunden
  //   }

  //Vorher:
  //   startDecay() {
  //     this.decayInterval = setInterval(() => {
  //       this.energy = Math.max(0, this.energy - 1);
  //       this.hunger = Math.min(100, this.hunger + 1);
  //       this.happiness = Math.max(0, this.happiness - 0.5);

  //       if (this.energy === 0) {
  //         this.logAction(`${this.name} ist vor Erschöpfung gestorben. 💀`);
  //         clearInterval(this.decayInterval);
  //         if (this.element) {
  //           this.element.classList.add("dead");
  //           this.element.querySelector(".controls").remove();
  //         }
  //       }

  //       this.updateUI();
  //       this.saveState();
  //     }, 3000);
  //   }

  //NEU
  startDecay() {
    this.decayInterval = setInterval(() => {
      this.energy = Math.max(0, this.energy - 1);
      this.hunger = Math.min(100, this.hunger + 1);
      this.happiness = Math.max(0, this.happiness - 0.5);

      if (this.energy === 0) {
        this.handleDeath();
      }

      this.updateUI();
      this.saveState();
    }, 3000);
  }

  //NEU:
  handleDeath() {
    this.logAction(`${this.name} ist vor Erschöpfung gestorben. 💀`);
    clearInterval(this.decayInterval); // Stoppe den Intervall
    if (this.element) {
      this.element.classList.add("dead");
      const controls = this.element.querySelector(".controls");
      if (controls) controls.remove(); // Entferne die Steuerung

      // Zeige den "Wiederbeleben"-Button
      const reviveBtn = this.element.querySelector(".revive-btn");
      if (reviveBtn) {
        reviveBtn.style.display = "block";
      }
    }
  }

  //NOTE: NEUE Funktion
  revive() {
    if (this.energy === 0) {
      this.energy = 50; // Setze Standardwerte
      this.hunger = 50;
      this.happiness = 50;

      if (this.element) {
        this.element.classList.remove("dead"); // Entferne den "toten" Zustand
        const controls = this.element.querySelector(".controls");
        if (!controls) {
          // Falls die Steuerung entfernt wurde, füge sie wieder hinzu
          const controlsDiv = document.createElement("div");
          controlsDiv.className = "controls";
          controlsDiv.innerHTML = `
            <button class="feed-btn">🦴 Füttern</button>
            <button class="play-btn">🎾 Spielen</button>
            <button class="sleep-btn">😴 Schlafen</button>
          `;
          this.element.appendChild(controlsDiv);

          // Event-Listener für die neuen Buttons hinzufügen
          controlsDiv.querySelector(".feed-btn").addEventListener("click", () => this.eat());
          controlsDiv.querySelector(".play-btn").addEventListener("click", () => this.play());
          controlsDiv.querySelector(".sleep-btn").addEventListener("click", () => this.sleep());
        }

        // Verstecke den "Wiederbeleben"-Button
        const reviveBtn = this.element.querySelector(".revive-btn");
        if (reviveBtn) {
          reviveBtn.style.display = "none";
        }
      }

      this.updateUI(); // Aktualisiere die UI
      this.startDecay(); // Starte den Verfall erneut
    }
  }

  //NEU:
  createStatusBar(label, key, value) {
    return `
      <div class="bar-container">
        <label class="bar-label">${label}</label>
        <div class="bar">
          <div class="bar-fill ${key}-bar" style="width: ${value}%">
            <span class="bar-value">${Math.round(value)}</span>
          </div>
        </div>
      </div>
    `;
  }

  //NOTE: Neu
  getBarColor(value, type) {
    if (type === "hunger") {
      if (value > 70) return "#e53935"; // rot
      if (value > 40) return "#fdd835"; // gelb
      return "#4caf50"; // grün
    } else {
      if (value < 30) return "#e53935";
      if (value < 60) return "#fdd835";
      return "#4caf50";
    }
  }

  //ALT
  //   updateUI() {
  //     if (!this.element) return;
  //     this.element.querySelector(".energy").textContent = this.energy;
  //     this.element.querySelector(".hunger").textContent = this.hunger;
  //     this.element.querySelector(".happiness").textContent = this.happiness;
  //     this.element.querySelector(".status-text").textContent = this.getStatusText();
  //   }

  //ALT
  //   updateUI() {
  //     if (!this.element) return;
  //     this.element.querySelector(".energy-bar").style.width = `${this.energy}%`;
  //     this.element.querySelector(".hunger-bar").style.width = `${this.hunger}%`;
  //     this.element.querySelector(".happiness-bar").style.width = `${this.happiness}%`;
  //     this.element.querySelector(".energy-bar .bar-value").textContent = Math.round(this.energy);
  //     this.element.querySelector(".hunger-bar .bar-value").textContent = Math.round(this.hunger);
  //     this.element.querySelector(".happiness-bar .bar-value").textContent = Math.round(this.happiness);
  //     this.element.querySelector(".status-text").textContent = this.getStatusText();
  //   }

  //NOTE: NEU
  updateUI() {
    if (!this.element) return;

    const energyBar = this.element.querySelector(".energy-bar");
    const hungerBar = this.element.querySelector(".hunger-bar");
    const happinessBar = this.element.querySelector(".happiness-bar");

    energyBar.style.width = `${this.energy}%`;
    hungerBar.style.width = `${this.hunger}%`;
    happinessBar.style.width = `${this.happiness}%`;

    energyBar.style.backgroundColor = this.getBarColor(this.energy, "energy");
    hungerBar.style.backgroundColor = this.getBarColor(this.hunger, "hunger");
    happinessBar.style.backgroundColor = this.getBarColor(this.happiness, "happiness");

    energyBar.querySelector(".bar-value").textContent = Math.round(this.energy);
    hungerBar.querySelector(".bar-value").textContent = Math.round(this.hunger);
    happinessBar.querySelector(".bar-value").textContent = Math.round(this.happiness);

    this.element.querySelector(".status-text").textContent = this.getStatusText();

    this.saveState();
  }

  getStatusText() {
    if (this.energy < 30) return `😴 ${this.name} ist sehr müde.`;
    if (this.hunger > 70) return `🍽️ ${this.name} hat großen Hunger.`;
    if (this.happiness > 80) return `😻 ${this.name} ist super gelaunt!`;
    return `🙂 ${this.name} geht es gut.`;
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

  //NOTE: Neu Local Storage!
  saveState() {
    const data = {
      energy: this.energy,
      hunger: this.hunger,
      happiness: this.happiness,
    };
    localStorage.setItem(`pet-${this.name}`, JSON.stringify(data));
  }

  loadState() {
    const saved = localStorage.getItem(`pet-${this.name}`);
    if (saved) {
      const data = JSON.parse(saved);
      this.energy = data.energy;
      this.hunger = data.hunger;
      this.happiness = data.happiness;

      // Überprüfen, ob das Tier bereits gestorben ist
      if (this.energy === 0) {
        this.handleDeath();
      }
    }
  }
}
