import './style.css';
import songsJson from './src/data/songs.json';



//Elementos del DOM
const duration = document.querySelector("#duration");
const time = document.querySelector("#time");
const iconPlayPause = document.querySelector("#iconPlayPause");
const progress = document.querySelector('.status-box-progress');

const buttonPlayPause = document.querySelector("#playPause");
const buttonForward = document.querySelector("#forward");
const buttonBackward = document.querySelector("#backward");

const playList = document.querySelector('.playlist');
const playListSongs = document.querySelector('.playlist-songs');
const iconPlayList = document.querySelector('.art-box-play');

const titleSong = document.querySelector(".controls-box-title");
const authorSong = document.querySelector(".controls-box-author");

const imageSong = document.querySelector(".art-box-img");


let numSong = 0;

const audio = document.createElement("audio");
audio.preload = "auto";
audio.src = songsJson[0].url;


document.addEventListener('DOMContentLoaded', () => {
  
  insertSongs(songsJson);
  
});



iconPlayList.addEventListener("click", () => {
  playList.classList.toggle("show-play");
});

  buttonPlayPause.addEventListener("click", () => {
    if(audio.paused) {
      audio.play();
      return;
    }
    audio.pause();

    
  });

  buttonForward.addEventListener("click", () => {
    
    numSong++;
    if(songsJson.length === numSong) {
      numSong = 0;
    }
    audio.src = songsJson[numSong].url;
    audio.play();
  });

  buttonBackward.addEventListener("click", () => {
    numSong--;

    if(numSong < 0) {
      numSong = 0;
    }
    
    audio.src = songsJson[numSong].url;
    audio.play();
  });

  playListSongs.addEventListener("click", (event) => {
    numSong = event.target.id;
    audio.src = songsJson[numSong].url;
    audio.play();
    
  });
  
  


  audio.addEventListener("timeupdate", () => {
    time.textContent = secondsToString(Number.parseInt(audio.currentTime));
    progress.value =  Number.parseInt(audio.currentTime);
  });
 
  audio.addEventListener("durationchange", () => {
    duration.textContent = secondsToString(Number.parseInt(audio.duration));
    progress.max = Number.parseInt(audio.duration);   
  })

  progress.addEventListener('change', () => {
    audio.currentTime = progress.value;
  });

  audio.addEventListener("loadstart", () => {
    titleSong.textContent = songsJson[numSong].title;
    authorSong.textContent = songsJson[numSong].artist;
    imageSong.src =  `./images/${songsJson[numSong].image}`;
   
  });

  audio.addEventListener("ended", () => {
    numSong++
    if(songsJson.length === numSong) {
      numSong = 0;
    }
    audio.src = songsJson[numSong].url;
    audio.play();
  });

  
audio.onplay = () => {
    iconPlayPause.src = "./images/pause.svg";
  
}

audio.onpause = () => {
 
    iconPlayPause.src = "./images/play.svg"

}


const insertSongs = (songs) => {
  songs.forEach(song => {
      const li = document.createElement("li");
      li.innerHTML = song.title;
      li.id = song.id;
      li.className = 'playlist-song';
      return playListSongs.appendChild(li);
  });
}

const secondsToString = (seconds) => {
  let minute = Math.floor((seconds / 60) % 60);
  minute = (minute < 10)? '0' + minute : minute;
  let second = seconds % 60;
  second = (second < 10)? '0' + second : second;
  return minute + ':' + second;
}
