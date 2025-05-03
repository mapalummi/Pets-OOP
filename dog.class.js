class Dog extends Pet {
  constructor(name) {
    super(name, "img/dog-1232449_640.jpg");
  }

  eat() {
    console.log(`${this.name} frisst sein Lieblingsfutter`);
    super.eat();
  }

  play() {
    console.log(`${this.name} jagt einen Ball 🐶`);
    super.play();
  }

  sleep() {
    console.log(`${this.name} schläft auf der Couch`);
    super.sleep();
  }
}
