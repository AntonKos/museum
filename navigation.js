const container_welcome = document.querySelector('.welcome_container')

function openNav() {
    document.getElementById("mySidenav").style.width = "297px"
    document.querySelector('.menu_label').style.display = 'none'
    document.querySelector('.close_icon').style.display = 'block'
    for (let i = 1; i < 4; i++) {
        container_welcome.children[i].style.zIndex = '-1'
        alert(container_welcome.children[i])
    }
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0"
    document.querySelector('.menu_label').style.display = 'block'
    document.querySelector('.close_icon').style.display = 'none'
    for (let i = 1; i < 4; i++) {
        container_welcome.children[i].style.zIndex = '2'
    }
}