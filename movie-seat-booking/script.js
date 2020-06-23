// * DOM ELEMENTS
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// * Get Data from localStorage, based on previous selected Info from the Client
populateUI();

let ticketPrice = +movieSelect.value;

// * @fn
// * 1. Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // * Cycle through the dom elements to find there index in the structure
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  // * LocalStorage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// * 2. Set Movie Data to LocalStorage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// * 3. Populate UI based on the LocalStored Data or Defaults
function populateUI() {
  // * 1. Seats:
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  // * Check if there is something
  if (!selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  // * 2. Movie
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// * EVENT LISTENERS
// * 1. Movie Select Event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  console.log(e.target.selectedIndex, e.target.value);

  // * Save Movie Data to localStorage
  setMovieData(e.target.selectedIndex, e.target.value);

  updateSelectedCount();
});
// * 2. Seat Click Event
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// * Initial Count and total set
updateSelectedCount();
