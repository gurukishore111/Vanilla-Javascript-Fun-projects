const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieselect = document.getElementById("movies");
// + = paresInt covert the string ti number
let ticketPrice = +movieselect.value;

populateUI();

// console.log(ticketPrice);
//Save Moive Index and Price:
function setMoiveData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//Update the total count:
function selectUpdateCount() {
  const selectSeats = document.querySelectorAll(".row .seat.selected");
  const selectSeatCount = selectSeats.length;

  const selectedIndex = [...selectSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("SelectSeats", JSON.stringify(selectedIndex));

  //console.log(selectedIndex);
  count.innerText = selectSeatCount;
  total.innerText = selectSeatCount * ticketPrice;
  //console.log(selectSeatCount);
}
//Moive clicked event
movieselect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMoiveData(e.target.selectedIndex, +e.target.value);
  selectUpdateCount();
});

//Populate in UI from the localStorage
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("SelectSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMoiveIndex = JSON.parse(
    localStorage.getItem("selectedMovieIndex")
  );
  if (selectedMoiveIndex !== null) {
    movieselect.selectedIndex = selectedMoiveIndex;
  }
}

//Seat clicked event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    // console.log("Seat Selected:", e.target);

    selectUpdateCount();
  }
});

//InitalCount
selectUpdateCount();
