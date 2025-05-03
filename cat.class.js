class Cat extends Pet {
  constructor(name) {
    super(name, "img/cat-6706354_640.jpg");
  }

  eat() {
    console.log(`${this.name} frisst sein Lieblingsfutter`);
    super.eat();
  }

  play() {
    console.log(`${this.name} spielt mit einem Wollknäuel! 🧶`);
    super.play();
  }

  sleep() {
    console.log(`${this.name} schläft auf dem Fensterbrett. 💤`);
    super.sleep();
  }
}
