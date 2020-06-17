'use strict';

const canvas = document.querySelector("canvas[id='brickGame']");
const context = canvas.getContext('2d');

function createGame() {
  const state = {
    walls: {
      brickLeft1: { x: 0, y: 0 },
      brickLeft2: { x: 0, y: 1 },
      brickLeft3: { x: 0, y: 2 },
      brickLeft4: { x: 0, y: 4 },
      brickLeft5: { x: 0, y: 5 },
      brickLeft6: { x: 0, y: 6 },
      brickLeft7: { x: 0, y: 8 },
      brickLeft8: { x: 0, y: 9 },
      brickLeft9: { x: 0, y: 10 },
      brickLeft10: { x: 0, y: 12 },
      brickLeft11: { x: 0, y: 13 },
      brickLeft13: { x: 0, y: 14 },
      brickLeft14: { x: 0, y: 16 },
      brickLeft15: { x: 0, y: 17 },
      brickLeft16: { x: 0, y: 18 },
      brickRight1: { x: 9, y: 0 },
      brickRight2: { x: 9, y: 1 },
      brickRight3: { x: 9, y: 2 },
      brickRight4: { x: 9, y: 4 },
      brickRight5: { x: 9, y: 5 },
      brickRight6: { x: 9, y: 6 },
      brickRight7: { x: 9, y: 8 },
      brickRight8: { x: 9, y: 9 },
      brickRight9: { x: 9, y: 10 },
      brickRight10: { x: 9, y: 12 },
      brickRight11: { x: 9, y: 13 },
      brickRight13: { x: 9, y: 14 },
      brickRight14: { x: 9, y: 16 },
      brickRight15: { x: 9, y: 17 },
      brickRight16: { x: 9, y: 18 },
    },
    mainCar: {
      body1: { x: 3, y: 16 },
      body2: { x: 4, y: 17 },
      body3: { x: 2, y: 17 },
      body4: { x: 3, y: 17 },
      body5: { x: 3, y: 18 },
      body6: { x: 4, y: 19 },
      body7: { x: 2, y: 19 },
    },
    rivalCars: {
      body1: { x: 6, y: 3 },
      body2: { x: 7, y: 2 },
      body3: { x: 5, y: 2 },
      body4: { x: 6, y: 2 },
      body5: { x: 6, y: 1 },
      body6: { x: 7, y: 0 },
      body7: { x: 5, y: 0 },
    },
  };

  function moveObject(command) {
    console.log(`game.moveObject() -> Moving ${command.object} with ${command.keyPressed}`);

    const acceptMoves = {
      ArrowLeft(object) {
        console.log('Moving object left');
        for (const objectBody in object) {
          if (object[objectBody].x - 3 >= 2) {
            object[objectBody].x = object[objectBody].x - 3;
          }
        }
      },
      ArrowRight(object) {
        console.log('Moving object right');
        for (const objectBody in object) {
          if (object[objectBody].x + 3 <= 7) {
            object[objectBody].x = object[objectBody].x + 3;
          }
        }
      },
    };

    const keyPressed = command.keyPressed;
    const object = state[command.object];
    const moveFunction = acceptMoves[keyPressed];

    if (moveFunction) {
      moveFunction(object);
    }
  }

  return {
    moveObject,
    state,
  };
}

const game = createGame();
const keyboardListener = createKeyboardListener();
keyboardListener.subscribe(game.moveObject);

function createKeyboardListener() {
  document.addEventListener('keydown', handleKeyDown);
  const state = {
    observers: [],
  };

  function subscribe(observerFunction) {
    state.observers.push(observerFunction);
  }

  function notifyAll(command) {
    console.log(`keyboardListener -> Nofifying ${state.observers.length} observers`);

    for (const observerFunction of state.observers) {
      observerFunction(command);
    }
  }

  function handleKeyDown(event) {
    const keyPressed = event.key;

    const command = {
      object: 'mainCar',
      keyPressed,
    };

    notifyAll(command);
  }

  return {
    subscribe,
  };
}

renderScreen();

function renderScreen() {
  context.fillStyle = 'silver';
  context.clearRect(0, 0, 10, 20);

  for (const object in game.state) {
    for (const objectBody in game.state[object]) {
      const body = game.state[object][objectBody];
      context.fillStyle = object === 'walls' ? '#292' : object === 'mainCar' ? '#000' : '#922';
      context.fillRect(body.x, body.y, 1, 1);
    }
  }

  requestAnimationFrame(renderScreen);
}
