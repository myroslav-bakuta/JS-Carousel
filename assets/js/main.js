(function (time) {
    let carousel = document.querySelector('.carousel');
    let slides = carousel.querySelectorAll('.slide');
    let controls = carousel.querySelector('.controls');
    let pausePlayBtn = controls.querySelector('#pause');
    let nextBtn = controls.querySelector('#next');
    let prevBtn = controls.querySelector('#previous');
    let indicatorContainer = carousel.querySelector('.indicators');
    let indicators = indicatorContainer.querySelectorAll('.indicator');

    let currentSlide = 0;
    let isPlaying = true;
    let slideCount = slides.length;
    let interval = time;
    let swipeStartX = null;
    let swipeEndX = null;

    const LEFT = 'ArrowLeft';
    const RIGHT = 'ArrowRight';
    const SPACE = ' ';

    const goToSlide = (n) => {
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
    }

    const nextSlide = () => goToSlide(currentSlide + 1);

    const prevSlide = () => goToSlide(currentSlide - 1);

    const play = () => {
        pausePlayBtn.innerHTML = 'Pause';
        interval = setInterval(nextSlide, 2000);
        isPlaying = true;
    }

    const pause = () => {
        if (isPlaying) {
            pausePlayBtn.innerHTML = 'Play';
            clearInterval(interval);
            isPlaying = false;
        }
    }

    const clickPause = () => isPlaying ? pause() : play();

    const clickNext = () => {
        pause();
        nextSlide();
    }

    const clickPrev = () => {
        pause();
        prevSlide();
    }

    const clickIndicator = (e) => {
        // console.log(e);
        let target = e.target;
        if (target.classList.contains('indicator')) {
            clickPause();
            goToSlide(+target.getAttribute('data-slide-to'));
        }
    }

    const pressKey = (e) => {
        // console.log(e);
        if (e.key === LEFT) clickPrev();
        if (e.key === RIGHT) clickNext();
        if (e.key === SPACE) clickPause();
    }

    const swipeStart = (e) => swipeStartX = e.changedTouches[0].pageX;

    const swipeEnd = (e) => {
        swipeEndX = e.changedTouches[0].pageX;
        swipeStartX - swipeEndX > 150 && clickNext();
        swipeStartX - swipeEndX < -150 && clickPrev();
        // console.log(swipeStartX - swipeEndX);
    }

    const setListeners = () => {
        pausePlayBtn.addEventListener('click', clickPause);
        nextBtn.addEventListener('click', clickNext);
        prevBtn.addEventListener('click', clickPrev);
        indicatorContainer.addEventListener('click', clickIndicator);
        document.addEventListener('keydown', pressKey);
        carousel.addEventListener('touchstart', swipeStart);
        carousel.addEventListener('touchend', swipeEnd);
    }

    let init = () => {
        indicatorContainer.style.display = 'flex';
        controls.style.display = 'block';
        setListeners();
        interval = setInterval(nextSlide, 2000);
    }

    init();

    // console.log(time);
}());