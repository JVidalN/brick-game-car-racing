const createGame = () => {
  const state = {
    pause: false,
    collision: false,
    status: {
      speed: 1,
      life: 5,
      level: 1,
      score: 0,
      hiScore: 0,
      goal: {
        current: 0,
        max: 25,
      },
    },
    walls: {},
    mainCar: {},
    rivalCars: {},
    screen: {
      width: 10,
      height: 20,
    },
  };

  const randomNumber = () => {
    return Boolean(Math.floor(Math.random() * 100) % 2);
  };

  const moveObject = (command) => {
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
              randomNumber() ? moveToLeft(object[rival]) : moveToRight(object[rival]);

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
      collision().checkForCarCollision();
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
      mainCarX: randomNumber() ? 3 : 6,
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

  const speed = () => {
    const getSpeed = () => {
      let speedTime = {};
      speedTime = 300 - 50 * state.status.speed;

      return speedTime;
    };

    const setSpeed = (speedLevel) => {
      state.status.speed = speedLevel;
    };

    return {
      getSpeed,
      setSpeed,
    };
  };

  const updateStatus = () => {
    const updateScore = () => {
      state.status.score += 25 + 25 * state.status.level;
    };

    const updateSpeed = () => {
      speed().setSpeed(state.status.speed + 1);
    };

    const updateLevel = () => {
      switch (state.status.speed) {
        case 1:
        case 2:
          state.status.level = 1;
          break;
        case 3:
        case 4:
          state.status.level = 2;
          break;
        case 5:
        case 6:
          state.status.level = 3;
          break;
      }
    };

    const updateHiScore = () => {
      //INCLUIR VERIFICAÇÃO DE MAIOR PONTUAÇÃO SALVA
      state.status.hiScore = state.status.score;
    };

    const updateGoal = (value) => {
      state.status.goal.current = value;
    };

    const checkOvertaking = () => {
      return Object.values(state.rivalCars).some((rivalCar) => {
        return (
          !state.collision &&
          rivalCar.position.y === state.mainCar.position.y &&
          rivalCar.position.x !== state.mainCar.position.x
        );
      });
    };

    const updateAll = () => {
      if (!state.pause && checkOvertaking()) {
        if (state.status.goal.current < state.status.goal.max) {
          const newGoal = state.status.goal.current + 1;
          updateGoal(newGoal);
        } else {
          updateGoal(0);
        }
        if (state.status.goal.current === state.status.goal.max) {
          updateSpeed();
          updateLevel();
        }
        updateScore();
        updateHiScore();
      }
    };

    const reset = () => {
      state.status.speed = 1;
      state.status.life = 5;
      state.status.level = 1;
      state.status.score = 0;
      state.status.hiScore = 0;
      state.status.goal.current = 0;
    };

    return {
      updateAll,
      reset,
    };
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
    updateStatus().updateAll();

    setTimeout(playGame, speed().getSpeed());
  };

  const collision = () => {
    const action = () => {
      state.status.life--;
      state.pause = true;
      state.collision = true;
      if (state.status.life === 0) {
        resetGame(true, 5);
      } else {
        resetGame(false, 2);
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
        action();
      }
    };

    const resetGame = (gameOver = false, seconds = 1) => {
      if (wait(seconds)) {
        if (gameOver) {
          updateStatus().reset();
        }
        state.collision = false;
        state.pause = false;
        addCars();
      }
    };

    return { checkForCarCollision };
  };

  const wait = (sec) => {
    let passed = false;
    const goalTime = new Date().getSeconds() + sec;

    while (!passed) {
      let current = new Date().getSeconds();
      if (current === goalTime) passed = true;
    }

    return passed;
  };

  return {
    state,
    addWall,
    addCars,
    playGame,
    moveObject,
  };
};

export default createGame;
