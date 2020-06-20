const createGame = () => {
  const toRandomMove = () => {
    return Boolean(Math.floor(Math.random() * 100) % 2);
  };
  const state = {
    pause: false,
    speed: 1000,
    walls: {},
    mainCar: {},
    rivalCars: {},
    screen: {
      width: 10,
      height: 20,
    },
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
            if (object[rival]['position'].y + 1 < state.screen.height) {
              object[rival]['position'].y = Math.min(
                object[rival]['position'].y + 1,
                state.screen.height
              );
            } else {
              toRandomMove() ? moveToLeft(object[rival]) : moveToRight(object[rival]);

              object[rival]['position'].y = -4;
            }
          }
        } else if (command.object === 'walls') {
          for (const objectBody in object) {
            object[objectBody].y + 1 < state.screen.height
              ? (object[objectBody].y = Math.min(object[objectBody].y + 1, state.screen.height))
              : (object[objectBody].y = 0);
          }
        }
      },
    };

    const keyPressed = command.keyPressed;
    const object = state[command.object];
    const moveFunction = acceptMoves[keyPressed];

    if (object && !state.pause && moveFunction) {
      checkForCarCollision();
      moveFunction(object);
    }
  };

  const addCars = () => {
    const addMainCar = (command) => {
      const mainCarId = command.mainCarId;
      const mainCarX = command.mainCarX;
      const mainCarY = command.mainCarY;

      state[mainCarId] = {
        position: { x: Number(mainCarX), y: Number(mainCarY) },
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
      };
    };
    const addRivalCar = (command) => {
      const rivalCarId = command.rivalCarId;
      const rivalCarX = command.rivalCarX;
      const rivalCarY = command.rivalCarY;

      state.rivalCars[rivalCarId] = {
        position: { x: Number(rivalCarX), y: Number(rivalCarY) },
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
      };
    };

    const commandAddMainCar = {
      mainCarId: 'mainCar',
      mainCarX: toRandomMove() ? 3 : 6,
      mainCarY: 16,
    };

    const commandAddRivalCar1 = {
      rivalCarId: 'rival1',
      rivalCarX: 6,
      rivalCarY: -1,
    };

    const commandAddRivalCar2 = {
      rivalCarId: 'rival2',
      rivalCarX: 6,
      rivalCarY: -11,
    };

    addMainCar(commandAddMainCar);
    addRivalCar(commandAddRivalCar1);
    addRivalCar(commandAddRivalCar2);
  };

  const addWall = () => {
    const addBricks = (command) => {
      const brickId = command.brickId;
      const brickX = command.brickX;
      const brickY = command.brickY;

      state.walls[brickId] = { x: brickX, y: brickY };
    };

    const voidSpaces = [3, 7, 11, 15, 19];

    for (let i = 0; i < state.screen.height; i++) {
      if (!voidSpaces.includes(i)) {
        const commandAddBrickLeft = {
          brickId: `brickLeft${i + 1}`,
          brickX: 0,
          brickY: i,
        };
        const commandAddBrickRight = {
          brickId: `brickRight${i + 1}`,
          brickX: state.screen.width - 1,
          brickY: i,
        };
        addBricks(commandAddBrickLeft);
        addBricks(commandAddBrickRight);
      }
    }
  };

  const playGame = () => {
    const commandWalls = {
      object: 'walls',
      keyPressed: 'ArrowDown',
    };

    const commandRivalCars = {
      object: 'rivalCars',
      keyPressed: 'ArrowDown',
    };

    moveObject(commandRivalCars);
    moveObject(commandWalls);

    setTimeout(playGame, state.speed);
  };

  const changeSpeed = (speedLevel) => {
    switch (speedLevel) {
      case 1:
        state.speed = 250;
        break;
      case 2:
        state.speed = 150;
        break;
      case 3:
        state.speed = 100;
        break;
      case 4:
        state.speed = 80;
        break;
      case 5:
        state.speed = 50;
        break;
      default:
        state.speed = newSpeed;
        break;
    }
  };

  const checkForCarCollision = () => {
    if (
      Object.values(state.rivalCars).some((rivalCar) => {
        return (
          rivalCar.position.y >= state.mainCar.position.y - 3 &&
          rivalCar.position.x === state.mainCar.position.x
        );
      })
    ) {
      state.pause = true;
    }
  };

  return {
    state,
    addWall,
    addCars,
    playGame,
    moveObject,
    changeSpeed,
  };
};

export default createGame;
