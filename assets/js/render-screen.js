const renderScreen = (screen, game, requestAnimationFrame) => {
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
            context.fillStyle = '#1a1a1a';
            context.fillRect(body.x, body.y, 1, 1);
          }
        }
        break;
      case 'walls':
        for (const objectBody in game.state[object]) {
          const body = game.state[object][objectBody];
          context.fillStyle = '#29429e';
          context.fillRect(body.x, body.y, 1, 1);
        }
        break;
    }
  }

  requestAnimationFrame(() => {
    renderScreen(screen, game, requestAnimationFrame);
  });
};

export default renderScreen;
