const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');
const paragraphs = document.querySelectorAll('.glass-box');
let currentHighlight = 0;

// تشغيل/إيقاف الصوت
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// تحديث شريط التقدم
audioPlayer.addEventListener('timeupdate', () => {
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = `${percent}%`;
    
    // تحديث الوقت الحالي
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    
    // تظليل الفقرة الحالية
    paragraphs.forEach(p => p.classList.remove('highlight'));
    const durationPerParagraph = audioPlayer.duration / paragraphs.length;
    currentHighlight = Math.floor(audioPlayer.currentTime / durationPerParagraph);
    if (paragraphs[currentHighlight]) {
        paragraphs[currentHighlight].classList.add('highlight');
        paragraphs[currentHighlight].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// تحديث الوقت الكلي
audioPlayer.addEventListener('loadedmetadata', () => {
    totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
});

// تقديم/تأخير الصوت
document.getElementById('forward-btn').addEventListener('click', () => {
    audioPlayer.currentTime += 15;
});

document.getElementById('rewind-btn').addEventListener('click', () => {
    audioPlayer.currentTime -= 15;
});

// تغيير السرعة
document.getElementById('speed-select').addEventListener('change', (e) => {
    audioPlayer.playbackRate = e.target.value;
});

// تحويل الوقت إلى تنسيق MM:SS
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}