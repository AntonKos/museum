

const progress = document.querySelector('.progress');
let isOpen = false
const buttons = document.querySelectorAll('.buy')

buttons.forEach(button => {
    button.addEventListener('click', function(e) {

        if (!isOpen) {
            openForm()
            isOpen = true
        } else {
            closeForm()
            isOpen = false
        }

        const x = e.pageX
        const y = e.pageY

        const buttonTop = e.target.offsetTop
        const buttonLeft = e.target.offsetLeft


        const xInside = x - buttonLeft
        const yInside = y - buttonTop

        const circle = document.createElement('span')
        circle.classList.add('circle')
        circle.style.top = yInside + 'px'
        circle.style.left = xInside + 'px'

        this.appendChild(circle)


        setTimeout(() => circle.remove(), 500)
    })

  
