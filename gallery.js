const gallery_images = document.querySelectorAll('.gallery_img')

const imagesArray = [
    "assets/img/galery1.jpg",
    "assets/img/galery2.jpg",
    "assets/img/galery3.jpg",
    "assets/img/galery4.jpg",
    "assets/img/galery5.jpg",
    "assets/img/galery6.jpg",
    "assets/img/galery7.jpg",
    "assets/img/galery8.jpg",
    "assets/img/galery9.jpg",
    "assets/img/galery10.jpg",
    "assets/img/galery11.jpg",
    "assets/img/galery12.jpg",
    "assets/img/galery13.jpg",
    "assets/img/galery14.jpg",
    "assets/img/galery15.jpg",
]

function shuffle(array) {
    array.sort(() => Math.random() - 0.5)
}

function setImages() {
    for (let i = 0; i < gallery_images.length; i++) {
        gallery_images[i].src = imagesArray[i]
    }
}

shuffle(imagesArray)
setImages()