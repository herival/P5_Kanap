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
    })