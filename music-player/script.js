const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

//Song title
const songs = ["hey", "summer", "ukulele"];

//Index of song start
let songIndex = 2;
//Load songs index
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}
//Play Song
const playSong = () => {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
};
const pauseSong = () => {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
};

//Event Listener

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
//Previous song
const preSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);

  audio.play();
};

//Nxt song
const nxtSong = () => {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
};

const updateProgress = (e) => {
  const { duration, currentTime } = e.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
};

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//Change song :

prevBtn.addEventListener("click", preSong);
nextBtn.addEventListener("click", nxtSong);

//Time/song update:

audio.addEventListener("timeupdate", updateProgress);

//Click on progress change:

progressContainer.addEventListener("click", setProgress);

//song ended:

audio.addEventListener("ended", nxtSong);
