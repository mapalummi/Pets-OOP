class Dog extends Pet {
  constructor(name) {
    super(name, "img/dog-1232449_640.jpg");
  }

  eat() {
    this.logAction(`${this.name} frisst sein Lieblingsfutter.`);
    super.eat();
  }

  play() {
    this.logAction(`${this.name} jagt einen Ball 🐶`);
    super.play();
  }

  sleep() {
    this.logAction(`${this.name} schläft auf der Couch.`);
    super.sleep();
  }
}
