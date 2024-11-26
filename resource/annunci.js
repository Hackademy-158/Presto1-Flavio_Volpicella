fetch('../annunci.json')
.then(response=>response.json())
.then(data=>{
    console.log(data);
    
    let radioWrapper = document.querySelector('#radioWrapper')
    let cardsWrapper = document.querySelector('#cardsWrapper')
    let inputRange = document.querySelector('#inputRange')
    let numberPrice = document.querySelector('#numberPrice')
    let wordInput = document.querySelector('#wordInput')
    
    
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

    function setInputPrice(){
        let prices = data.map( (annuncio)=> Number(annuncio.prezzo) )
        prices.sort( (a,b)=> a-b )
        let maxPrice = prices.pop()
        console.log(maxPrice);
        
        inputRange.max = maxPrice
        inputRange.value = maxPrice
        numberPrice.innerHTML = `${maxPrice} €`
    }
    
    // cards
    function createCards(array) {
        cardsWrapper.innerHTML = ''
        array.forEach(annuncio=>{
            let div = document.createElement('div')
            div.classList.add('col-12', 'col-md-3', 'p-2')
            div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="../media/blog-2.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${annuncio.nome}</h5>
                    <p class="card-text">${annuncio.categoria}</p>
                    <p>${annuncio.prezzo} €</p>
                    <a href="#" class="btn btn-primary">Acquista</a>
                </div>
                </div>
                `
                cardsWrapper.appendChild(div)
            })
        }
        
        setInputPrice()
        setCategory()
        createCards(data)
    // filtri
    let radioCategory = document.querySelectorAll('.form-check-input')
    function filterByCategory(array) {
        let arrayFromNodelist = Array.from(radioCategory)
        let checkedCategory = arrayFromNodelist.find(radioButton=>radioButton.checked)
        let categoria = checkedCategory.id
        if (categoria=="All") {
            return array
        }else{
            let filtered = data.filter((annuncio)=>annuncio.categoria==categoria)
            return filtered
            
        }
        
    }
    
    
    
    
    
    
    
    
        
        
        function filterByPrice(array){
            let filtered = array.filter(annuncio=> Number(annuncio.prezzo) <= Number(inputRange.value))
            
            return filtered
        }
    
        
        function filterByWord(array){
            let filtered = array.filter(annuncio=> annuncio.nome.toLowerCase().includes(wordInput.value.toLowerCase()))
            return filtered
            
        }
        
        
        
        
        
        radioCategory.forEach((radioButton)=>{
            radioButton.addEventListener('click', ()=>{
                
                globalFilter()
                
            })
        })
        
        
        
        inputRange.addEventListener( 'input', ()=>{
            globalFilter()
            numberPrice.innerHTML = `${inputRange.value} €`
            
        })
        
        
        
        wordInput.addEventListener( 'input', ()=>{
            setTimeout(()=>{
                globalFilter()
            }, 1000)
        })
        
        
        function globalFilter(){
            let resultFilterByCategory = filterByCategory(data);
            let resultFilterByPrice = filterByPrice(resultFilterByCategory);
            let resultFilterByWord = filterByWord(resultFilterByPrice);
            
            createCards(resultFilterByWord)
        }
        
        
        
        
        
        let btnReset = document.querySelector('#btnReset')
        
        btnReset.addEventListener('click', ()=>{
            radioCategory[0].checked = true;
            
            setInputPrice();
            
            wordInput.value = ''
            
            globalFilter()
        })
        
        
        



        
    })
        
        
        
        


