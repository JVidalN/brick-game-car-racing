import createKeyboardListener from './keyboard-listener.js';
import createGame from './game.js';
import renderScreen from './render-screen.js';

const game = createGame();
const keyboardListener = createKeyboardListener(document);
keyboardListener.subscribe(game.moveObject);

const screen = document.getElementById('brickGame');
renderScreen(screen, game, requestAnimationFrame);

const init = () => {
  game.addWall();
  game.addCars();
  game.playGame();

  renderScreen(screen, game, requestAnimationFrame);
};

init();
