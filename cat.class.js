class Cat extends Pet {
  constructor(name) {
    super(name, "img/cat-6706354_640.jpg");
  }

  eat() {
    this.logAction(`${this.name} frisst sein Lieblingsfutter`);
    super.eat();
  }

  play() {
    this.logAction(`${this.name} spielt mit einem Wollknäuel! 🧶`);
    super.play();
  }

  sleep() {
    this.logAction(`${this.name} schläft auf dem Fensterbrett. 💤`);
    super.sleep();
  }
}
