const canvas = document.querySelector("canvas[id='brickGame']");
const context = canvas.getContext('2d');

const game = {
  walls: {
    brick1: { x: 0, y: 0 },
    brick2: { x: 0, y: 1 },
    brick3: { x: 0, y: 2 },
  },
  car: {
    body1: { x: 4, y: 16 },
    body2: { x: 5, y: 17 },
    body3: { x: 3, y: 17 },
    body4: { x: 4, y: 17 },
    body5: { x: 4, y: 18 },
    body6: { x: 5, y: 19 },
    body7: { x: 3, y: 19 },
  },
  rivalCars: {
    body1: { x: 7, y: 7 },
    body2: { x: 6, y: 6 },
  },
};

renderScreen();

function renderScreen() {
  for (bodyId in game.car) {
    const car = game.car[bodyId];
    context.fillStyle = '#222';
    context.fillRect(car.x, car.y, 1, 1);
  }

  for (bodyId in game.rivalCars) {
    const rivalCar = game.rivalCars[bodyId];
    context.fillStyle = '#922';
    context.fillRect(rivalCar.x, rivalCar.y, 1, 1);
  }
}
