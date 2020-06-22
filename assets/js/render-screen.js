const renderScreen = (screen, game, status, requestAnimationFrame) => {
  const context = screen.getContext('2d');
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
            context.fillStyle = 'rgba(0, 0, 0, 0.678)';
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

  updateStatus(status, game.state.status);
  requestAnimationFrame(() => {
    renderScreen(screen, game, status, requestAnimationFrame);
  });
};

const updateStatus = (divStatus, statusInfo) => {
  const score = () => {
    const clearScore = () => {
      const score = divStatus.querySelector('div.score > small');
      score.innerHTML = '';
    };

    const createTextNode = () => {
      const scorePoint = document.createTextNode(statusInfo.score);

      return scorePoint;
    };

    const append = () => {
      const scorePoint = createTextNode();
      const score = divStatus.querySelector('div.score > small');
      score.appendChild(scorePoint);
    };

    const updateScore = () => {
      clearScore();
      append();
    };

    return { updateScore };
  };

  const hiScore = () => {
    const clearHiScore = () => {
      const hiScore = divStatus.querySelector('div.hiScore > small');
      hiScore.innerHTML = '';
    };

    const createTextNode = () => {
      const hiScorePoint = document.createTextNode(statusInfo.hiScore);

      return hiScorePoint;
    };

    const append = () => {
      const hiScorePoint = createTextNode();
      const hiScore = divStatus.querySelector('div.hiScore > small');
      hiScore.appendChild(hiScorePoint);
    };

    const updateHiScore = () => {
      clearHiScore();
      append();
    };

    return { updateHiScore };
  };

  const life = () => {
    const clearLife = () => {
      const divLifeStatus = divStatus.querySelector('div.lifeStatus');
      divLifeStatus.innerHTML = '';
    };

    const createDiv = () => {
      const divLife = document.createElement('div');
      divLife.classList.add('life');

      return divLife;
    };

    const append = () => {
      const divLife = createDiv();
      const divLifeStatus = divStatus.querySelector('div.lifeStatus');
      const lifeLength = divStatus.querySelectorAll('div.life').length;
      if (lifeLength <= statusInfo.life) {
        divLifeStatus.appendChild(divLife);
      }
    };

    const updateLife = () => {
      clearLife();
      for (let i = 0; i < statusInfo.life; i++) {
        append();
      }
    };

    return { updateLife };
  };

  const speed = () => {
    const clearSpeed = () => {
      const speed = divStatus.querySelector('div.speed > small');
      speed.innerHTML = '';
    };

    const createTextNode = () => {
      const speedPoint = document.createTextNode(statusInfo.speed);

      return speedPoint;
    };

    const append = () => {
      const speedPoint = createTextNode();
      const speed = divStatus.querySelector('div.speed > small');
      speed.appendChild(speedPoint);
    };

    const updateSpeed = () => {
      clearSpeed();
      append();
    };

    return { updateSpeed };
  };

  const level = () => {
    const clearLevel = () => {
      const level = divStatus.querySelector('div.level > small');
      level.innerHTML = '';
    };

    const createTextNode = () => {
      const levelPoint = document.createTextNode(statusInfo.level);

      return levelPoint;
    };

    const append = () => {
      const levelPoint = createTextNode();
      const level = divStatus.querySelector('div.level > small');
      level.appendChild(levelPoint);
    };

    const updateLevel = () => {
      clearLevel();
      append();
    };

    return { updateLevel };
  };

  const goal = () => {
    const clearGoal = () => {
      const goal = divStatus.querySelector('div.goal > small');
      goal.innerHTML = '';
    };

    const createTextNode = () => {
      const goalPoint = document.createTextNode(
        `${statusInfo.goal.current}/${statusInfo.goal.max}`
      );

      return goalPoint;
    };

    const append = () => {
      const goalPoint = createTextNode();
      const goal = divStatus.querySelector('div.goal > small');
      goal.appendChild(goalPoint);
    };

    const updateGoal = () => {
      clearGoal();
      append();
    };

    return { updateGoal };
  };

  life().updateLife();
  score().updateScore();
  hiScore().updateHiScore();
  speed().updateSpeed();
  level().updateLevel();
  goal().updateGoal();
};

export default renderScreen;
