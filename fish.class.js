class Fish extends Pet {
  constructor(name) {
    super(name, "img/royal-gramma-basslet-8012082_640.jpg");
  }

  eat() {
    this.logAction(`${this.name} frisst Flockenfutter 🐟`);
    super.eat();
  }

  play() {
    this.logAction(`${this.name} schwimmt durch einen Reifen 🪱`);
    super.play();
  }

  sleep() {
    this.logAction(`${this.name} ruht sich am Boden des Aquariums aus`);
    super.sleep();
  }
}
