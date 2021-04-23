const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: 'Guitar.House-Josh.Pan-1',
    displayName: 'Guitar House',
    artist: 'Josh Pan'
  },
  {
    name: 'June-Bobby.Richards-2',
    displayName: 'June',
    artist: 'Bobby Richards'
  },
  {
    name: 'Lights-Patrick.Patrikios-3',
    displayName: 'Lights',
    artist: 'Patrick Patrikios'
  },
  {
    name: 'Snake.on.the.Beach-Nico.Staf-4',
    displayName: 'Snake on the Beach',
    artist: 'Nico Staf'
  },
  {
    name: 'Tak-Bobby.Richards-5',
    displayName: 'Tak',
    artist: 'Bobby Richards'
  }
];

// Check if Playing
let isPlaying = false;

function playSong(){
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

function pauseSong(){
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener( 'click', ()=> (isPlaying ? pauseSong() : playSong()) );

// Update DOM
function loadSong(song){
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

function prevSong(){
  songIndex--;
  if(songIndex < 0){
    songIndex = songs.length -1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong(){
  songIndex++;
  if(songIndex > songs.length -1){
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex])

// Update Progress Bar & Time
function updateProgressBar(e){
  if(isPlaying){
    const {duration, currentTime} = e.srcElement;

    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if(durationSeconds < 10){
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if(durationSeconds){
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if(currentSeconds < 10){
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

function setProgressBar(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const{duration} = music;
  music.currentTime = (clickX / width ) * duration;
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);