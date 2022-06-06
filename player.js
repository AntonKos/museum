const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressRange = document.querySelector('.play_range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.button_range_small');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const playBtnCenter = document.querySelector('.play_btn_center')
    // const currentTime = document.querySelector('.time-elapsed');
    // const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.button_resize');
const poster = document.querySelector('.video_poster')
const bigBtn = document.querySelector('.big_button ')
const posterImage = document.querySelector('.poster')
const parentOfVideo = document.querySelector('.container_video')
const imgInPoster = posterImage.children[0]

let isAllowPressButtonsForVideo = true

const options = {
    // родитель целевого элемента - область просмотра
    root: null,
    // без отступов
    rootMargin: '140px',
    // процент пересечения - половина изображения
    threshold: 1
}

const callback = function(entries, observer) {
    /* Content excerpted, show below */
    console.log(entries.isIntersection)
        // console.log(entries)
    if (!isAllowPressButtonsForVideo) {
        isAllowPressButtonsForVideo = true
    } else {
        isAllowPressButtonsForVideo = false
    }
    console.log(isAllowPressButtonsForVideo)

};

const observer = new IntersectionObserver(callback, options);

const target = video;
observer.observe(target);


const arrayOfPosters = [
    'assets/img/poster0.jpg', 'assets/img/poster1.jpg', 'assets/img/poster2.jpg', 'assets/img/poster3.jpg', 'assets/img/poster4.jpg'
]
const arrayOfVideos = [
    'assets/videos/video0.mp4', 'assets/videos/video1.mp4', 'assets/videos/video2.mp4', 'assets/videos/video3.mp4', 'assets/videos/video4.mp4'
]
let shift = false
    // Play & Pause ----------------------------------- //

function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    // playBtnCenter.classList.replace('hidPlayBtn', 'showPlayBtn')
    bigBtn.style.display = 'block'
    playBtn.setAttribute('title', 'Play');
}

function showPoster() {
    posterImage.style.display = 'block'
}

function togglePlay(e) {

    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        // playBtnCenter.classList.replace('showPlayBtn', 'hidPlayBtn')
        playBtn.setAttribute('title', 'Pause');
        bigBtn.style.display = 'none'
        posterImage.style.display = 'none'
    } else {
        video.pause();
        showPlayIcon();
    }

}

// On video end, show play button icon
video.addEventListener('ended', showPlayIcon);
video.addEventListener('ended', showPoster);

// Progress Bar ---------------------------------- //

// Format current time, duration
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}

// Update progress bar as video plays
function updateProgress() {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    // currentTime.textContent = `${displayTime(video.currentTime)} /`;
    // duration.textContent = `${displayTime(video.duration)}`;
}

// Click to seek within the video
function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

let lastVolume = 1;

// Mute
function toggleMute() {
    volumeIcon.className = '';
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
        volumeBar.style.width = 0;
    } else {
        video.volume = lastVolume;
        volumeIcon.classList.add('fas', 'fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute');
        volumeBar.style.width = `${lastVolume * 100}%`;
    }
}

// Volume Bar
function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    // Rounding volume up or down
    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;
    // Change icon depending on volume
    volumeIcon.className = '';
    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off');
    }
    lastVolume = volume;
}

// Change Playback Speed -------------------- //

function changeSpeed() {
    video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        /* Firefox */
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        /* IE/Edge */
        element.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
    poster.classList.add('poster-fullscreen')
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
    }
    poster.classList.remove('poster-fullscreen')
    video.classList.remove('video-fullscreen');

}

let fullscreen = false;

// Toggle fullscreen
function toggleFullscreen() {
    if (!fullscreen) {
        openFullscreen(player);
    } else {
        closeFullscreen();
    }
    fullscreen = !fullscreen;
}

window.addEventListener('keydown', function(e) {

    if (e.code === 'Space' && isAllowPressButtonsForVideo) {
        e.preventDefault()
        togglePlay(e)

    }
    if (e.code === 'KeyM' && isAllowPressButtonsForVideo) {
        toggleMute(e)
    }
    if (e.code === 'KeyF' && isAllowPressButtonsForVideo) {
        toggleFullscreen(e)
    }
    if (e.code === 'Comma' && shift === true && isAllowPressButtonsForVideo) { //backward

        if (speed.value > 0.5 && speed.value <= 1) {
            speed.value -= 0.25
        } else if (speed.value >= 1) {
            speed.value -= 0.5
        }
        changeSpeed()
            // console.log(speed)
    }
    if (e.code === 'Period' && shift === true) {
        // console.log(speedValue)

        if (speed.value >= 0.5 && speed.value < 1) {
            speed.value = +speed.value + 0.25

        } else if (speed.value >= 1 && speed.value < 2) {
            speed.value = +speed.value + 0.5
        }
        changeSpeed()
    }
})

window.addEventListener('keydown', function(e) {
    if (e.code === 'ShiftLeft') {
        shift = true
    }
})

window.addEventListener('keyup', function(e) {
    if (e.code === 'ShiftLeft') {
        shift = false
    }
})

// Event Listeners
bigBtn.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);