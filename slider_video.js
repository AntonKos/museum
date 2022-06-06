let index_video_slider = 0
let prev_index_video_slider = 0
let quantityOfSlides1 = 1
let slider1 = document.getElementById('carousel'),
    sliderItems1 = document.getElementById('item-container'),
    prev1 = document.getElementById('btn_back'),
    next1 = document.getElementById('btn_forward');
const video_dots = document.querySelectorAll('.video_dot')

function setVideoDot() {
    video_dots[prev_index_video_slider].classList.remove('active')
    video_dots[index_video_slider].classList.add('active')
}

function slide_videos(wrapper, sliderItems1, prev, next) {

    var posInitial,
        slides = sliderItems1.getElementsByClassName('item'),
        slidesLength = slides.length, // 5
        slideSize = sliderItems1.getElementsByClassName('item')[0].offsetWidth, // ширина слайда 

        firstSlide = slides[0],
        secondSlide = slides[1],
        thirdSlide = slides[2],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneSecond = secondSlide.cloneNode(true),
        cloneThird = thirdSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        allowShift = true;


    // Clone first and last slide
    sliderItems1.appendChild(cloneFirst);
    sliderItems1.appendChild(cloneSecond);
    sliderItems1.appendChild(cloneThird);
    sliderItems1.insertBefore(cloneLast, firstSlide);

    // Click events
    prev.addEventListener('click', function() { shiftSlide(-1) });
    next.addEventListener('click', function() { shiftSlide(1) });
    // Transition events
    sliderItems1.addEventListener('transitionend', checkIndex);

    for (let i = 0; i < video_dots.length; i++) {

        video_dots[i].addEventListener('click', function(e) {
            quantityOfSlides1 = e.target.id - index_video_slider

            if (quantityOfSlides1 > 0) {
                shiftSlide(1)
            } else if (quantityOfSlides1 < 0) {
                quantityOfSlides1 *= -1
                shiftSlide(-1)
            }
        })

    }

    function shiftSlide(dir, action) {

        if (!video.paused) {
            showPoster()
            togglePlay()
        } else {
            showPoster()
        }

        sliderItems1.classList.add('shifting');

        if (allowShift) {

            prev_index_video_slider = index_video_slider

            if (!action) { posInitial = sliderItems1.offsetLeft; } // 1.-400px  (2.-2000px) ;

            if (dir == 1) {

                sliderItems1.style.left = (posInitial - slideSize * quantityOfSlides1) + "px"; // -800px
                index_video_slider += quantityOfSlides1;
            } else if (dir == -1) {

                sliderItems1.style.left = (posInitial + slideSize * quantityOfSlides1) + "px"; // 0px
                index_video_slider -= quantityOfSlides1;
            }
            if (quantityOfSlides1 > 1) {
                quantityOfSlides1 = 1
            }
        };
        imgInPoster.src = arrayOfPosters[index_video_slider]
        video.src = arrayOfVideos[index_video_slider]
        allowShift = false;
    }

    function checkIndex() {
        sliderItems1.classList.remove('shifting');
        if (index_video_slider == -1) {

            sliderItems1.style.left = -(slidesLength * slideSize) + "px"; // = -(5 * 400) = -2000
            index_video_slider = slidesLength - 1;
        }

        if (index_video_slider == slidesLength) {
            // alert(index_video_slider)

            sliderItems1.style.left = -(1 * slideSize) + "px"; // -400px
            index_video_slider = 0;
        }
        // alert(sliderItems1.style.left)
        setVideoDot()
        allowShift = true;
        imgInPoster.src = arrayOfPosters[index_video_slider]
        video.src = arrayOfVideos[index_video_slider]

    }
}

slide_videos(slider1, sliderItems1, prev1, next1);