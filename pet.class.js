class Pet {
  constructor(name, image) {
    this.name = name;
    this.image = image;
    this.energy = 50;
    this.hunger = 50;
    this.happiness = 50;
    // this.updateUI();
  }

  updateUI() {
    document.getElementById("pet-name").textContent = this.name;
    document.getElementById("energy").textContent = this.energy;
    document.getElementById("hunger").textContent = this.hunger;
    document.getElementById("happiness").textContent = this.happiness;
    document.getElementById("pet-image").src = this.image;
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
