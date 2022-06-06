let prevIndex = 0
let index = 0
let quantityOfSlides = 1
let slider = document.getElementById('welcome_slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');
const welcome_dots = document.querySelector('.welcome_dots').children
const numSlide = document.querySelector('.pannel').children[0]

// const buttonsWrapper = document.querySelector(".map");

function setDot() {
    welcome_dots[prevIndex].classList.remove('active')
    welcome_dots[index].classList.add('active')
    numSlide.innerHTML = ("0" + (index + 1)) + "|" + "05"
}

// Transition events
function slide(wrapper, items, prev, next) {
    let posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName('slide'),
        slidesLength = slides.length,
        slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        allowShift = true;

    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add('loaded');

    // Mouse events
    items.onmousedown = dragStart;

    // Touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);

    // Click events
    prev.addEventListener('click', function() { shiftSlide(-1) });
    next.addEventListener('click', function() { shiftSlide(1) });

    // Transition events
    items.addEventListener('transitionend', checkIndex);

    for (let i = 0; i < welcome_dots.length; i++) {

        welcome_dots[i].addEventListener('click', function(e) {
            quantityOfSlides = e.target.id - index

            if (quantityOfSlides > 0) {
                shiftSlide(1)
            } else if (quantityOfSlides < 0) {
                quantityOfSlides *= -1
                shiftSlide(-1)
            }
        })

    }

    function dragStart(e) {

        e = e || window.event;
        e.preventDefault();
        posInitial = items.offsetLeft;

        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    function dragAction(e) {
        e = e || window.event;

        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        items.style.left = (items.offsetLeft - posX2) + "px";
    }

    function dragEnd(e) {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag');
        } else {
            items.style.left = (posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }



    function shiftSlide(dir, action) {

        items.classList.add('shifting');

        if (allowShift) {
            prevIndex = index
            if (!action) { posInitial = items.offsetLeft; }

            if (dir == 1) {
                items.style.left = (posInitial - slideSize * quantityOfSlides) + "px";
                // alert(items.style.left)
                index += quantityOfSlides;
            } else if (dir == -1) {

                items.style.left = (posInitial + slideSize * quantityOfSlides) + "px";
                // alert(items.style.left)
                index -= quantityOfSlides;
            }
            if (quantityOfSlides > 1) {
                quantityOfSlides = 1
            }
        };

        allowShift = false;
    }

    function checkIndex() {
        items.classList.remove('shifting');

        if (index == -1) {
            items.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            items.style.left = -(1 * slideSize) + "px";
            index = 0;
        }
        setDot()
        allowShift = true;
    }
}

slide(slider, sliderItems, prev, next);