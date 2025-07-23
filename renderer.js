window.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('button[data-minutes]');
  const countdown = document.getElementById('countdown');
  const selectionScreen = document.getElementById('selection-screen');
  const timerScreen = document.getElementById('timer-screen');
  const backBtn = document.getElementById('back-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const resetBtn = document.getElementById('reset-btn');

  let interval;
  let remainingSeconds = 0;
  let originalSeconds = 0;
  let isPaused = false;

  function startTimer(minutes) {
    clearInterval(interval);
    remainingSeconds = minutes * 60;
	originalSeconds = remainingSeconds;
	isPaused = false;

	showTimerScreen();
	updateDisplay(remainingSeconds);

    interval = setInterval(() => {
	  if (!isPaused) {
		remainingSeconds--;
		updateDisplay(remainingSeconds);

		if (remainingSeconds <= 0) {
			clearInterval(interval);
			countdown.textContent = '🍳 ¡Huevos listos!';
		}
	  }
    }, 1000);
  }

  function updateDisplay(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    countdown.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function showTimerScreen() {
	selectionScreen.style.display = 'none';
	timerScreen.style.display = 'block';
  }

  function showSelectionScreen() {
	timerScreen.style.display = 'none';
	selectionScreen.style.display = 'block';
	clearInterval(interval);
	countdown.textContent = '00:00';
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const minutes = parseInt(btn.dataset.minutes);
      startTimer(minutes);
    });
  });

  pauseBtn.addEventListener('click', () => {
	isPaused = !isPaused;
	pauseBtn.textContent = isPaused ? '▶' : '⏸';
  });

  resetBtn.addEventListener('click', () => {
	clearInterval(interval);
	remainingSeconds = originalSeconds;
	isPaused = false;
	pauseBtn.textContent = '⏸';
	startTimer(originalSeconds / 60);
  });

  backBtn.addEventListener('click', showSelectionScreen);

  // Botones de la ventana personalizada
  document.getElementById('min-btn').addEventListener('click', () => {
    window.api.minimizar();
  });

  document.getElementById('close-btn').addEventListener('click', () => {
    window.api.cerrar();
  });
});
