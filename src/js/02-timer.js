import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';

const { startButton, dateStrings } = {
  startButton: document.querySelector('button'),
  dateStrings: document.querySelectorAll('.value'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateNow = new Date();

    if (dateNow.getTime() >= selectedDates[0]) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.removeAttribute('disabled');
    }

    timer = selectedDates[0] - dateNow.getTime();
  },
};

let intervalIsActive = false;
let timer = 0;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onStartButtonClick(evt) {
  if (intervalIsActive) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(timer);

    intervalIsActive = true;
    timer -= 1000;

    [...dateStrings].forEach(el => {
      switch ([...el.attributes][1].nodeName) {
        case 'data-days':
          el.textContent = String(days).padStart(2, '0');
          break;
        case 'data-hours':
          el.textContent = String(hours).padStart(2, '0');
          break;
        case 'data-minutes':
          el.textContent = String(minutes).padStart(2, '0');
          break;
        case 'data-seconds':
          el.textContent = String(seconds).padStart(2, '0');
          break;

        default:
          break;
      }
    });
    if (timer <= 0) {
      clearInterval(timerInterval);
      Notiflix.Notify.success('Its Done!');
    }
  }, 1000);
}

startButton.setAttribute('disabled', true);

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', onStartButtonClick);
