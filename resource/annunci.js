fetch('../annunci.json')
.then(response=>response.json())
.then(data=>{
    console.log(data);
    
    let radioWrapper = document.querySelector('#radioWrapper')
    let cardsWrapper = document.querySelector('#cardsWrapper')
    
    
    
    
    // categorie
    function setCategory() {
        let uniche = []
        data.forEach(annuncio => {
            if (!uniche.includes(annuncio.categoria)) {
                uniche.push(annuncio.categoria)
            }
        });
        uniche.forEach((categoria)=>{
            let div= document.createElement('div')
            div.classList.add('form-check')
            div.innerHTML =`
            <input class="form-check-input" type="radio" name="categorie" id="${categoria}" >
            <label class="form-check-label" for="${categoria}">
                ${categoria}
            </label>
            `
            radioWrapper.appendChild(div)
        })
        
    }
    
    // cards
    function createCards(array) {
        cardsWrapper.innerHTML = ''
        array.forEach((annuncio=>{
            let div = document.createElement('div')
            div.classList.add('col-6', 'col-md-3', 'p-2')
            div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="../media/blog-2.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${annuncio.nome}</h5>
                    <p class="card-text">${annuncio.categoria}</p>
                    <p>${annuncio.prezzo}</p>
                    <a href="#" class="btn btn-primary">Acquista</a>
                </div>
            </div>
            `
            cardsWrapper.appendChild(div)
        }))
    }
    
    // filtri
    function filterByCategory(categoria) {
        if (categoria=="all") {
            createCards(data)
        }else{
            let filtered = data.filter((annuncio)=>annuncio.categoria==categoria)
            createCards(filtered)
            
        }
        
    }
    
    
    
    
    
    
    setCategory()
    createCards(data)
    
    let radioCategory = document.querySelectorAll('.form-check-input')
    radioCategory.forEach((radioButton)=>{
        radioButton.addEventListener('click', ()=>{
            console.log(radioButton.id);
            let categoria = radioButton.id
            filterByCategory(categoria)
            
        })
    })
})