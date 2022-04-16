
//recupérer id d'un produit depuis l'url
const textUrl = window.location.search;
console.log(textUrl);
const objetParamsUrl = new URLSearchParams(textUrl);
const productId = objetParamsUrl.get("id");
console.log(productId);
const url = "http://localhost:3000/api/products/"+ productId; 
console.log(url);
//requete http fetch id du produit

fetch(url)
    .then((response)=>response.json())
    .then(function(data){
        let product = data;
        console.log(product);
        document.getElementById("title").innerHTML = product.name;
        document.getElementById("description").innerHTML = product.description;
        document.getElementById("price").innerHTML = product.price;
        document.getElementById("product-img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        document.getElementById('quantity').value = 1;
        console.log(product.colors);
        for(let color of product.colors){
            console.log(color);
            document.getElementById("colors").insertAdjacentHTML(
                "afterbegin",
                `<option value="${color}">${color}</option>`
            )
        };

    });

function formatMonetaire(prix){
    const prixFormate = parseFloat(prix).toFixed(2);
    return prixFormate;
}

//le clic du bouton "ajouter au panier"
function addToCart() {
    
    let panier = JSON.parse(localStorage.getItem("panier"));
    if (!panier){panier=[]};

    // récupération de l'ID
    const textUrl = window.location.search;
    const objetParamsUrl = new URLSearchParams(textUrl);
    const productId = objetParamsUrl.get("id");
    console.log(productId);

    const nomProduit = document.getElementById("title").textContent;
    const price = document.getElementById("price").textContent;
    const quantite = document.getElementById("quantity").value;
    const color = document.getElementById("colors").value;
    const imageUrl = document.getElementById("product-img").firstChild.getAttribute("src");
    const altImg = document.getElementById("product-img").firstChild.getAttribute("alt");

    if(!color) {
        alert('Veuillez choisir une couleur');
    }
    else if (quantite < 1 ){
        alert('La quantité ne peut être inférieur à 1')
    }
    else{
        
        let produitChoisi = {id:productId, nom:nomProduit, prix:price, qte:quantite, color:color, imgUrl:imageUrl, altTxt:altImg};
        let produitExistant = panier.find(produit=>(produit.id==produitChoisi.id && produit.color==produitChoisi.color));        
        
        if(!produitExistant){
            panier.push(produitChoisi);
        }
        else{produitExistant.qte=parseInt(produitExistant.qte)+parseInt(produitChoisi.qte);
            let panierFiltre = paniefr.filter(produit=>(produit.id!=produitExistant.id && produit.color!=produitExistant.color));
            panierFiltre.push(produitExistant);
            panier=panierFiltre;
        }
    
        let formatTextProduitChoisi = JSON.stringify(panier);    
        //stocker dans le stockage local
        localStorage.setItem("panier",formatTextProduitChoisi);

        modal();
        //redirection vers panier ou continuer achat
        let cart_btn = document.getElementById("cart-btn");
        cart_btn.onclick = function() {
            window.location.href = "cart.html";
        }; 

        majSitckersPanier();
        
    }
    
    
} 
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

function modal(){
    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }    
}


