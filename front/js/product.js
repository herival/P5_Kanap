//recuperer id d'un produit depuis l'url depuis la page en cours
const textUrl = window.location.search;
console.log(textUrl); 
const objetParamsUrl = new URLSearchParams(textUrl);
const productId = objetParamsUrl.get("id");
console.log(productId);

//faire "une requête http" (fetch par défaut c'est get)avec l'id du produit
//récupérer un produit par son id  
fetch(`http://localhost:3000/api/products/${productId}`)
.then((response)=>{
    console.log(response);
    response.json().then((produit)=>{
    console.log(produit);
    //manipulation du DOM
        document.getElementById("title").textContent=produit.name;
        document.getElementById("description").textContent=produit.description;
        document.getElementById("price").textContent= formatMonetaire(produit.price);
        document.getElementById("product-img").innerHTML=`<img id="imageUrl"
        src="${produit.imageUrl}"
        alt="${produit.altTxt}"
    />`;
    for(let couleur of produit.colors){
        console.log(couleur);
        document.getElementById("colors")
        .insertAdjacentHTML("afterbegin",` <option value="${couleur}">${couleur}</option>`)
    };
    });
});


function formatMonetaire(prix){
    const prixFormate = parseFloat(prix).toFixed(2);
    return prixFormate;
}




