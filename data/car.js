class Car {
  brand;
  model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.brand = carDetails.brand;
    this.model = carDetails.model;
    // this.speed = carDetails.speed;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? "open" : "closed";

    console.log(
      `Brand: ${this.brand}, Model: ${this.model}, Speed: ${this.speed} km/h, Trunk: ${trunkStatus}`
    );
  }

  go() {
    if (!this.isTrunkOpen) {
      this.speed += 5;
    }

    if (this.speed > 200) {
      this.speed = 200;
    }
  }

  brake() {
    this.speed -= 5;

    if (this.speed < 0) {
      this.speed = 0;
    }
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

// class RaceCar extends Car {
//   acceleration;

//   constructor(carDetails) {
//     this.acceleration = carDetails.acceleration;
//   }
//   go() {
//     this.speed += 5;

//     if (this.speed > 300) {
//       this.speed = 300;
//     }
//   }

//   brake() {
//     this.speed -= 5;

//     if (this.speed < 0) {
//       this.speed = 0;
//     }
//   }
// }

const car1 = new Car({
  brand: "Toyota",
  model: "Corolla",
});

const car2 = new Car({
  brand: "Tesla",
  model: "Model 3",
});

console.log(car1);
console.log(car2);

car1.go();
car1.go();
car1.go();
car1.go();
car1.openTrunk();
car1.brake();
car1.displayInfo();

car2.go();
car2.go();
car2.go();
car2.brake();
car2.openTrunk();
car2.displayInfo();
