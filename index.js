let desserts = document.querySelector("#desserts-section")
let toto = document.querySelectorAll(".totalprice")
let shoppingCart = []
let tot = 0
let somme 
desserts.addEventListener("click",function(event){  
    if (event.target.className === "dessert-add"){
        let dessert = event.target.parentElement.parentElement
        let name = dessert.querySelector(".dessert-name").innerText
        let price = dessert.querySelector(".dessert-price").innerText

        let dessertimage= event.target.parentElement
        let photo = dessertimage.querySelector(".pic");
        let adress =photo.src;
        
        
        
        //filter === Elle filtre la liste selon la condition du filtre
        let includesProduct = shoppingCart.filter((produit)=>(produit.name===name))
        //find === elle recherche l'élément dans la liste selon la condition du filtre
        let elementExiste = shoppingCart.find((produit)=>(produit.name ===name))
        if (elementExiste){
            elementExiste.quantity += 1
        }else{
            shoppingCart.push({
                name:name,
                price:price,
                quantity:1,
                source:adress,
                
        })
        }
        console.log(shoppingCart)
        localStorage.setItem("cart",JSON.stringify(shoppingCart))
        mettreAJourCart()
    }
})
//Créer une fonction qui va faire apparaitre l'élément dans le cart
function mettreAJourCart(){
    let shoppingSection = document.querySelector("#shopping-cart")
    
    //Etape 1 : vider le shoppingSection
    shoppingSection.innerHTML = ""

    //etape2: ajouter l'en tete total quantité
    let tete = document.createElement("p")
    shoppingSection.appendChild(tete)
    tete.classList.add("font-tete")
    
    

    let listItems = document.createElement("ul")
    shoppingSection.appendChild(listItems)
    listItems.classList.add("cart")
    shoppingCart.forEach((item,index)=>{
        const li = document.createElement("li")
        li.classList.add("cart-item")
        const divLeft = document.createElement("div")
        const nameProduit = document.createElement("p")
        nameProduit.textContent= `${item.name}`
        nameProduit.classList.add("nom-produit")


       


        const quantityProduit = document.createElement("span")
        quantityProduit.textContent = `x${item.quantity}`
        quantityProduit.classList.add("qte")
        const priceProduit = document.createElement("span")
        priceProduit.textContent = `@ ${item.price}`
        priceProduit.classList.add("price")
         const totalpriceProduit = document.createElement("span")
        totalpriceProduit.textContent = `$${(item.quantity * parseFloat(item.price.replace("$",0))).toFixed(2)}`
        totalpriceProduit.classList.add("totalprice")
       // tot=tot + `${(item.quantity * parseFloat(item.price.replace("$",0))).toFixed(2)}`
       
        divLeft.appendChild(nameProduit)
        divLeft.appendChild(quantityProduit)
        divLeft.appendChild(priceProduit)
        divLeft.appendChild(totalpriceProduit)
        
        

        const ligne = document.createElement("hr")
        divLeft.appendChild(ligne)
        ligne.classList.add("separation")
        divLeft.classList.add("gauche")

        const divRight = document.createElement("div")
        const removeButton = document.createElement("input")
        removeButton.type="button"
        removeButton.value = "X"
        removeButton.classList.add("supprimer")
        divRight.appendChild(removeButton)
        divRight.classList.add("droite")


        


        li.appendChild(divLeft)
        li.appendChild(divRight)
        listItems.appendChild(li)
    })


     const lix = document.createElement("li")
        lix.classList.add("cart-item")
        
        const texto = document.createElement("p")
        const valeur = document.createElement("p")
       

     tot = shoppingCart.reduce((accumulator, currentvalue) => {
       return accumulator + currentvalue.quantity * parseFloat(currentvalue.price.replace("$",0));
     },0);

        

        texto.textContent=  "Order Total :" 
        lix.appendChild(texto)
        texto.classList.add("total_text")
        

        valeur.textContent=  "$" + tot.toFixed(2)
        lix.appendChild(valeur)
        valeur.classList.add("total_valeur")

        listItems.appendChild(lix)

          somme = shoppingCart.reduce((accumulator, currentvalue) => {
       return accumulator + currentvalue.quantity ;
     },0);

      tete.textContent = "Your Cart (" + somme + ")"



const carbondiv = document.createElement("div")
const carbonimage = document.createElement("img")
const carbontext = document.createElement("p")

carbondiv.classList.add("carbondiv")
carbonimage.src = "assets/images/icon-carbon-neutral.svg"
carbonimage.classList.add("carbonimage")
carbontext.textContent= "This is a carbon neutral Delivery"
carbontext.classList.add("carbontext")
carbondiv.appendChild(carbonimage)
carbondiv.appendChild(carbontext)

shoppingSection.appendChild(carbondiv)

    const purchaseButton = document.createElement("input")
    purchaseButton.type = "button"
    purchaseButton.value = "Confirm Order"
    purchaseButton.classList.add("purchase-button")
    purchaseButton.addEventListener("click",validerCommande)
    
   
    shoppingSection.appendChild(purchaseButton)
}

function validerCommande(){
    //Le role de cette fonction est de faire apparaitre une modale
    //Une modale c'est une page web qui se superpose sur une autre page web
    
    let modal = document.querySelector("#modal-cart")
    modal.classList.add("modal")
    let listItems = document.querySelector(".cart-modal-items")
    shoppingCart.forEach((item,index)=>{
       
        const li = document.createElement("li")
        li.classList.add("cart-item")
        
        const divLeft = document.createElement("div")
        const divTextes = document.createElement("div")
        const nameProduit = document.createElement("p")
        
        nameProduit.textContent= `${item.name}`
        
        const quantityProduit = document.createElement("span")
        quantityProduit.textContent = `x${item.quantity}`
        quantityProduit.classList.add("qte2")
        const priceProduit = document.createElement("span")
        priceProduit.textContent = `@${item.price}`

        const totalpriceProduit = document.createElement("span")
        totalpriceProduit.textContent = `$${(item.quantity * parseFloat(item.price.replace("$",0))).toFixed(2)}`
        totalpriceProduit.classList.add("totalprice1")
        
       
        const photo = document.createElement("img")
        photo.src = `${item.source}`
        photo.classList.add("taille_photo")
        divTextes.classList.add("divtextes")

        divTextes.appendChild(nameProduit)
        divTextes.appendChild(quantityProduit)
        divTextes.appendChild(priceProduit)

        divLeft.appendChild(photo)
        divLeft.appendChild(divTextes)
        
        
        divLeft.classList.add("gauche1")
        


        const divRight = document.createElement("div")
        //const removeButton = document.createElement("input")
        //removeButton.type="button"
        //removeButton.value = "X"
        divRight.appendChild(totalpriceProduit)
        divRight.classList.add("qq")

        const ligne2 = document.createElement("hr")
        
        ligne2.classList.add("separation2")
        
//li.appendChild(ligne2)  
        li.appendChild(divLeft)
        li.appendChild(divRight)
        //li.appendChild(ligne2)
       // divTextes.appendChild(ligne2)
        listItems.appendChild(li)




    })

    const lix2 = document.createElement("li")
        lix2.classList.add("cart-item2")
        
        const texto1 = document.createElement("p")
        const valeur1 = document.createElement("p")
       

     tot = shoppingCart.reduce((accumulator, currentvalue) => {
       return accumulator + currentvalue.quantity * parseFloat(currentvalue.price.replace("$",0));
     },0);

        

        texto1.textContent=  "Order Total :" 
        lix2.appendChild(texto1)
        texto1.classList.add("total_text1")
        

        valeur1.textContent=  "$" + tot.toFixed(2)
        lix2.appendChild(valeur1)
        valeur1.classList.add("total_valeur")

        listItems.appendChild(lix2)
}





let newOrderButton = document.querySelector(".new-order")
//newOrderButton.classList.add("modal")
newOrderButton.addEventListener("click",function(){
    shoppingCart = []
    localStorage.removeItem("cart")
    window.location = "index.html"
})
function restoreCart(){
    const savedCart = localStorage.getItem("cart")
    if(savedCart){
        shoppingCart = JSON.parse(savedCart)
        mettreAJourCart()
    }
}

window.addEventListener("load",restoreCart)