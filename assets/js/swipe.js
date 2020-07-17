//REFERENCE: https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android

const swipe = () => {
  var xDown = null;
  var yDown = null;

  const init = () => {
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
  };

  const getTouches = (evt) => {
    return (
      evt.touches || evt.originalEvent.touches // browser API
    ); // jQuery
  };

  const handleTouchStart = (evt) => {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };

  const handleTouchMove = (evt) => {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
        let keyEvent = new KeyboardEvent('keydown', {
          key: 'ArrowLeft',
        });
        document.dispatchEvent(keyEvent);
      } else {
        /* right swipe */
        let keyEvent = new KeyboardEvent('keydown', {
          key: 'ArrowRight',
        });
        document.dispatchEvent(keyEvent);
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        console.log('UP');
      } else {
        /* down swipe */
        console.log('DOWN');
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  };

  return { init };
};
export default swipe;
