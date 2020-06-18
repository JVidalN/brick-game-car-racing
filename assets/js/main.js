'use strict';

const canvas = document.querySelector("canvas[id='brickGame']");
const context = canvas.getContext('2d');

const createGame = () => {
  let speed = 250;
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
      position: { x: 3, y: 16 },
      get body1() {
        return { x: this.position.x, y: this.position.y };
      },
      get body2() {
        return { x: this.position.x + 1, y: this.position.y + 1 };
      },
      get body3() {
        return { x: this.position.x - 1, y: this.position.y + 1 };
      },
      get body4() {
        return { x: this.position.x, y: this.position.y + 1 };
      },
      get body5() {
        return { x: this.position.x, y: this.position.y + 2 };
      },
      get body6() {
        return { x: this.position.x + 1, y: this.position.y + 3 };
      },
      get body7() {
        return { x: this.position.x - 1, y: this.position.y + 3 };
      },
    },
    rivalCars: {
      rival1: {
        position: { x: 6, y: -11 },
        get body1() {
          return { x: this.position.x, y: this.position.y };
        },
        get body2() {
          return { x: this.position.x + 1, y: this.position.y - 1 };
        },
        get body3() {
          return { x: this.position.x - 1, y: this.position.y - 1 };
        },
        get body4() {
          return { x: this.position.x, y: this.position.y - 1 };
        },
        get body5() {
          return { x: this.position.x, y: this.position.y - 2 };
        },
        get body6() {
          return { x: this.position.x + 1, y: this.position.y - 3 };
        },
        get body7() {
          return { x: this.position.x - 1, y: this.position.y - 3 };
        },
      },
      rival2: {
        position: { x: 6, y: -1 },
        get body1() {
          return { x: this.position.x, y: this.position.y };
        },
        get body2() {
          return { x: this.position.x + 1, y: this.position.y - 1 };
        },
        get body3() {
          return { x: this.position.x - 1, y: this.position.y - 1 };
        },
        get body4() {
          return { x: this.position.x, y: this.position.y - 1 };
        },
        get body5() {
          return { x: this.position.x, y: this.position.y - 2 };
        },
        get body6() {
          return { x: this.position.x + 1, y: this.position.y - 3 };
        },
        get body7() {
          return { x: this.position.x - 1, y: this.position.y - 3 };
        },
      },
    },
  };

  const toRandomMove = () => {
    return Boolean(Math.floor(Math.random() * 100) % 2);
  };

  const moveToLeft = (object) => {
    if (object['position'].x - 3 >= 2) {
      object['position'].x = Math.max(object['position'].x - 3, 0);
    }
  };

  const moveToRight = (object) => {
    if (object['position'].x + 3 <= 7) {
      object['position'].x = Math.max(object['position'].x + 3, 0);
    }
  };

  const moveObject = (command) => {
    const acceptMoves = {
      ArrowLeft(object) {
        moveToLeft(object);
      },
      ArrowRight(object) {
        moveToRight(object);
      },
      ArrowDown(object) {
        if (command.object === 'rivalCars') {
          for (const rival in object) {
            if (object[rival]['position'].y + 1 < 24) {
              object[rival]['position'].y = Math.min(object[rival]['position'].y + 1, 24);
            } else {
              toRandomMove() ? moveToLeft(object[rival]) : moveToRight(object[rival]);

              object[rival]['position'].y = 0;
            }
          }
        } else if (command.object === 'walls') {
          for (const objectBody in object) {
            object[objectBody].y + 1 < 20
              ? (object[objectBody].y = Math.min(object[objectBody].y + 1, 20))
              : (object[objectBody].y = 0);
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
  };

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

  function changeSpeed(speedLevel) {
    switch (speedLevel) {
      case 1:
        speed = 250;
        break;
      case 2:
        speed = 150;
        break;
      case 3:
        speed = 100;
        break;
      case 4:
        speed = 80;
        break;
      case 5:
        speed = 50;
        break;
      default:
        speed = newSpeed;
        break;
    }
  }

  return {
    moveObject,
    state,
    playGame,
    changeSpeed,
  };
};

const createKeyboardListener = () => {
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
};

const renderScreen = () => {
  context.fillStyle = 'silver';
  context.clearRect(0, 0, 10, 20);

  for (const object in game.state) {
    switch (object) {
      case 'rivalCars':
        for (const rivals in game.state[object]) {
          for (const rivalBody in game.state[object][rivals]) {
            const body = game.state[object][rivals][rivalBody];
            context.fillStyle = '#922';
            context.fillRect(body.x, body.y, 1, 1);
          }
        }
        break;
      case 'mainCar':
        for (const objectBody in game.state[object]) {
          if (objectBody !== 'position') {
            const body = game.state[object][objectBody];
            context.fillStyle = '#000';
            context.fillRect(body.x, body.y, 1, 1);
          }
        }
        break;
      case 'walls':
        for (const objectBody in game.state[object]) {
          const body = game.state[object][objectBody];
          context.fillStyle = '#292';
          context.fillRect(body.x, body.y, 1, 1);
        }
        break;
    }
  }

  requestAnimationFrame(renderScreen);
};

const game = createGame();
const keyboardListener = createKeyboardListener();
keyboardListener.subscribe(game.moveObject);

renderScreen();
