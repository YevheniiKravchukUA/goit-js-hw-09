const { body, buttonStart, buttonStop } = {
  body: document.querySelector('body'),
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStop.setAttribute('disabled', true);

buttonStart.addEventListener('click', e => {
  colorSwitcher = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  buttonStart.setAttribute('disabled', true);
  buttonStop.removeAttribute('disabled');
});

buttonStop.addEventListener('click', e => {
  clearInterval(colorSwitcher);

  buttonStop.setAttribute('disabled', true);
  buttonStart.removeAttribute('disabled');
});
