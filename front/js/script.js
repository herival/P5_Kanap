const url = "http://localhost:3000/api/products"; 

fetch(url)
    .then((response)=>response.json())
    .then(function(data) {
        let products = data;
        console.log(products);
        
        products.forEach(product => {
            console.log(product._id);
            document.getElementById('items').insertAdjacentHTML(
                "beforeend",
                `<a href="./product.html?id=${product._id}">
                <article>
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                  <h3 class="productName">${product.name}</h3>
                  <p class="productDescription">${product.description}</p>
                </article>
              </a>`
            )
            
        });

    })
    .catch(function(error){
        console.log(error);
    })

majSitckersPanier();

// Affichage sticker quantité panier
function majSitckersPanier(){
    let stickersPanier = document.getElementById("checkout_items");
    let panierProduits = JSON.parse(localStorage.getItem("panier"));
    if(!panierProduits || panierProduits.length==0){
        stickersPanier.style.display = "none";
    }
    else{
        stickersPanier.style.display = "flex";
        let qtepanier=0; 
        for (const produit of panierProduits) {
            qtepanier = qtepanier + parseInt(produit.qte);
        }
        stickersPanier.innerHTML = qtepanier;
    }
}