class Dog extends Pet {
  constructor(name) {
    super(name, "img/dog-1232449_640.jpg");
  }

  play() {
    console.log(`${this.name} jagt einen Ball`);
    super.play();
  }
}
