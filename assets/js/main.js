'use strict';

const canvas = document.querySelector("canvas[id='brickGame']");
const context = canvas.getContext('2d');
let speed = 200;
// 900
// 750
// 500
// 450
// 300

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
      rival1: {
        body1: { x: 6, y: -11 },
        body2: { x: 7, y: -12 },
        body3: { x: 5, y: -12 },
        body4: { x: 6, y: -12 },
        body5: { x: 6, y: -13 },
        body6: { x: 7, y: -14 },
        body7: { x: 5, y: -14 },
      },
      rival2: {
        body1: { x: 6, y: -1 },
        body2: { x: 7, y: -2 },
        body3: { x: 5, y: -2 },
        body4: { x: 6, y: -2 },
        body5: { x: 6, y: -3 },
        body6: { x: 7, y: -4 },
        body7: { x: 5, y: -4 },
      },
    },
  };

  function moveObject(command) {
    const acceptMoves = {
      ArrowLeft(object) {
        for (const objectBody in object) {
          if (object[objectBody].x - 3 >= 2) {
            object[objectBody].x = Math.max(object[objectBody].x - 3, 0);
          }
        }
      },
      ArrowRight(object) {
        for (const objectBody in object) {
          if (object[objectBody].x + 3 <= 7) {
            object[objectBody].x = Math.min(object[objectBody].x + 3, screen.width);
          }
        }
      },
      ArrowDown(object) {
        if (command.object === 'rivalCars') {
          for (const rival in object) {
            const random = Math.floor(Math.random() * 100);
            const right = Boolean(random % 2);
            //console.log(right);
            for (const rivalBody in object[rival]) {
              if (object[rival][rivalBody].y + 1 < 20) {
                object[rival][rivalBody].y = Math.min(object[rival][rivalBody].y + 1, 20);
              } else {
                if (object[rival][rivalBody].x + 3 <= 7) {
                  object[rival][rivalBody].x = Math.min(object[rival][rivalBody].x + 3, 10);
                }
                if (object[rival][rivalBody].x - 3 >= 2) {
                  object[rival][rivalBody].x = Math.max(object[rival][rivalBody].x - 3, 0);
                }
                object[rival][rivalBody].y = 0;
              }
            }
          }
        } else if (command.object === 'walls') {
          for (const objectBody in object) {
            if (object[objectBody].y + 1 < 20) {
              object[objectBody].y = Math.min(object[objectBody].y + 1, 20);
            } else {
              object[objectBody].y = 0;
            }
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

  function playGame() {
    const commandWalls = {
      object: 'walls',
      keyPressed: 'ArrowDown',
    };

    const commandRivalCars = {
      object: 'rivalCars',
      keyPressed: 'ArrowDown',
    };

    moveObject(commandWalls);
    moveObject(commandRivalCars);

    setTimeout(playGame, speed);
  }

  return {
    moveObject,
    state,
    playGame,
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
    if (object === 'rivalCars') {
      for (const rivals in game.state[object]) {
        for (const rivalBody in game.state[object][rivals]) {
          const body = game.state[object][rivals][rivalBody];
          context.fillStyle = '#922';
          context.fillRect(body.x, body.y, 1, 1);
        }
      }
    } else {
      for (const objectBody in game.state[object]) {
        const body = game.state[object][objectBody];
        context.fillStyle = object === 'walls' ? '#292' : '#000';
        context.fillRect(body.x, body.y, 1, 1);
      }
    }
  }

  requestAnimationFrame(renderScreen);
}
