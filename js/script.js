const nav = document.querySelector('.navbar')
const counterItems = document.querySelectorAll('.counter')
const counterBox = document.querySelector('.counter-box')
const rules = document.querySelector('.faq')
const accordionBtns = document.querySelectorAll('.faq-btn')
const footerYear = document.querySelector('.footer-year')

document.addEventListener('DOMContentLoaded', function () {
    function navShadow() {
        if (window.scrollY >= 200) {
            nav.classList.add('nav-shadow')
        } else {
            nav.classList.remove('nav-shadow')
        }
    }


    window.addEventListener('scroll', navShadow)
});

const options = {
    rootMargin: '0px',
}

const startCounter = entry => {
    if (entry[0].isIntersecting) {
        counterItems.forEach(counter => {
            const updateCounter = () => {
                const finalNumber = counter.getAttribute('data-number')
                const value = parseInt(counter.textContent)

                const speed = finalNumber / 300

                if (value < finalNumber) {
                    counter.textContent = `${Math.floor(value + speed)}`
                    setTimeout(updateCounter, 1)
                } else {
                    counter.textContent = finalNumber
                }
            }

            updateCounter()
        })
    }
}

function openAccordionItems() {
    if (this.nextElementSibling.classList.contains('active')) {
        this.nextElementSibling.classList.remove('active')
    } else {
        closeAccordionItems()
        this.nextElementSibling.classList.toggle('active')
    }
}

const closeAccordionItems = () => {
    const allActiveItems = document.querySelectorAll('.faq-info')
    allActiveItems.forEach(item => item.classList.remove('active'))
}

const clickOutsideAccordion = e => {
    if (
        e.target.classList.contains('faq-btn') ||
        e.target.classList.contains('faq-info') ||
        e.target.classList.contains('faq-info-text')
    ) {
        return
    } else {
        closeAccordionItems()
    }
}

accordionBtns.forEach(btn => btn.addEventListener('click', openAccordionItems))

window.addEventListener('click', clickOutsideAccordion)

const handleCurrentYear = () => {
    const year = new Date().getFullYear();
    footerYear.innerText = year;
};

handleCurrentYear();

const observer = new IntersectionObserver(startCounter, options)
observer.observe(counterBox)