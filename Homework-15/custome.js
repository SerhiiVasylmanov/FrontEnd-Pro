const sliders = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

let index = 0;

const activeSlide = n => {
    for (slide of sliders) {
        slide.classList.remove('active');
    }
    sliders[n].classList.add('active');
}

const activeDot = n => {
    for (dot of dots) {
        dot.classList.remove('active');
    }
    dots[n].classList.add('active');
}

const prepareCurrentSlide = index => {
    activeSlide(index);
    activeDot(index);
}

const nextSlide = () => {
    if (index == sliders.length - 1) {
        index = 0;
        prepareCurrentSlide(index);
    } else {
        index++;
        prepareCurrentSlide(index);
    }
}

const prevSlide = () => {
    if (index == 0) {
        index = sliders.length - 1;
        prepareCurrentSlide(index);
    } else {
        index--;
        prepareCurrentSlide(index);
    }
}

dots.forEach((item, indexDot) => {
    item.addEventListener('click', () => {
        index = indexDot;
        prepareCurrentSlide(index);
    })
})

btnNext.addEventListener('click', nextSlide);
btnPrev.addEventListener('click', prevSlide);

setInterval(nextSlide, 5000);