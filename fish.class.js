class Fish extends Pet {
  constructor(name) {
    super(name, "img/royal-gramma-basslet-8012082_640.jpg");
  }

  eat() {
    console.log(`${this.name} frisst Flockenfutter. 🐟`);
    super.eat();
  }

  play() {
    console.log(`${this.name} schwimmt durch einen Reifen. 🪱`);
    super.play();
  }

  sleep() {
    console.log(`${this.name} ruht sich am Boden des Aquariums aus.`);
    super.sleep();
  }
}
