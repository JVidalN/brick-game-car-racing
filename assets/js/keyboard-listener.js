const createKeyboardListener = (document) => {
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

export default createKeyboardListener;
