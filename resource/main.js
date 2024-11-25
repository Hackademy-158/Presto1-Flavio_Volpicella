let containerNavbar = document.querySelector(".container-navbar")
let containerHeader = document.querySelector("#container-header")



// scroll navbar
window.addEventListener('scroll', ()=>{
    let scroll = window.scrollY
    
    if (scroll > 0) {
        containerNavbar.classList.remove('my-border', 'container-fluid')
        containerNavbar.classList.add('container', 'sticky-top' , 'rounded-3')
        containerNavbar.style.backgroundColor = 'var(--darkblue)'
    } else {
        containerNavbar.classList.add('my-border' , 'container-fluid')
        containerNavbar.classList.remove('container','sticky-top' , 'rounded-3')
        containerNavbar.style.backgroundColor = 'unset'
    }
})

let firstNumber = document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber');
let thirdNumber = document.querySelector('#thirdNumber');
let fourthNumber = document.querySelector('#fourthNumber');


function incremento(elemento, num, tempo) {
    let counter = 0;
    
    let interval = setInterval(()=>{
        if (counter<num) {
            counter++;
            elemento.innerHTML = counter
        }else{
            clearInterval(interval);
        }
    },tempo)
}




// incremento(firstNumber,456,10)
// incremento(secondNumber,513,10)
// incremento(thirdNumber,53,100)
// incremento(fourthNumber,17,100)

let check = false;
let observ = new IntersectionObserver((entries) =>{
    entries.forEach(entry=>{
        if (entry.isIntersecting==true && check == false) {
            incremento(firstNumber,456,10)
            incremento(secondNumber,513,10)
            incremento(thirdNumber,53,100)
            incremento(fourthNumber,17,300)
            check = true
        }
    })
})
observ.observe(thirdNumber)
