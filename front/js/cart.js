let panierProduits = JSON.parse(
    localStorage.getItem("produitsChoisis") || "[]"
);

// console.log (panierProduits);
affichagePanier();
function affichagePanier() {
    //console.log(panierProduits);
    let prixTotal = 0;
    let qteTotale = 0;
    for (const produit of panierProduits) {
        //console.log(produit);
        prixTotal =
            prixTotal + parseFloat(produit.qte) * parseFloat(produit.prix);
        qteTotale = qteTotale + parseInt(produit.qte);
        document.getElementById("cart__items").insertAdjacentHTML(
            "beforeend",
            `<article class="cart__item">
                <div class="cart__item__img">
                <img src="${produit.imgUrl}" alt="${produit.altTxt}">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${produit.nom}</h2>
                    <p class="color">${produit.color}</p>
                    <p>${formatMonetaire(produit.prix)}€</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input id="${produit.id}"
                type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.qte}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p onclick="supprimerProduit('${
                        produit.id
                    }','${produit.color}')" class="deleteItem">Supprimer</p>
                    </div>
                </div>
                </div>
            </article>`
        );
    }
    document.getElementById("totalPrice").innerText =
        formatMonetaire(prixTotal);
    document.getElementById("totalQuantity").innerText = qteTotale;
}
function formatMonetaire(prix) {
    const prixFormate = parseFloat(prix).toFixed(2);
    return prixFormate;
}
function supprimerProduit(idDelete,colorDelete) {
    
    
    let confirmDelete = confirm('Etes-vous sur de vouloir retirer ce produit?');
    if (confirmDelete){
        let panierFiltre = panierProduits.filter(checkProduct);
        let formatTextProduitChoisi = JSON.stringify(panierFiltre);
        localStorage.setItem("produitsChoisis", formatTextProduitChoisi);
        document.getElementById("cart__items").innerHTML = "";
    
        panierProduits = panierFiltre;
        affichagePanier();
        function checkProduct(produit) {
            return ((produit.id != idDelete)||(produit.color !=colorDelete));
        }
        majSitckersPanier();

    }

}



function changerQte() {
    inputQt = document.querySelectorAll(".itemQuantity");
    classColor = document.getElementsByClassName('color');

    for (let i=0; i<inputQt.length; i++){
        inputQt[i].addEventListener("change", function(e) {
            e.preventDefault();
            let newQuantity = inputQt[i].valueAsNumber;
            let idProduit = inputQt[i].id;
            let color = classColor[i].innerHTML;
            console.log(panierProduits);
            panierProduits.forEach(function(comp){
                if(comp.qte !== newQuantity && comp.id == idProduit && comp.color == color && newQuantity >= 0) {
                    comp.qte = newQuantity;
                    localStorage.setItem("produitsChoisis", JSON.stringify(panierProduits));
                }


                console.log(comp.qte);
            });
            let prixTotal = 0;
            let qteTotale = 0;
            for (const produit of panierProduits) {
                prixTotal = prixTotal + parseFloat(produit.qte) * parseFloat(produit.prix);
                qteTotale = qteTotale + parseInt(produit.qte);
            }
            document.getElementById("totalPrice").innerText = formatMonetaire(prixTotal);
            document.getElementById("totalQuantity").innerText = qteTotale;




        });
    }


}

changerQte();

function formulaireValide() {
    const regexName = /^[A-Z][A-Za-zéç]+(\s[A-Z][A-Za-zéç]+)*$/;
    const regexAddress = /^[A-Za-z0-9éç°',]+(\s[A-Za-z0-9éç°',]+)*$/;
    const regexCity = /^[A-Z][A-Za-zéç]+(\s[A-Z][A-Za-zéç]+)*$/;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let errorMsg = null; 
    const prenom = document.getElementById("firstName").value;
    if (prenom === "") {
        errorMsg = ["firstNameErrorMsg", "Veuillez renseigner votre prénom"]; 
        return errorMsg;

    }
    if (!regexName.test(prenom)) {
        errorMsg = ["firstNameErrorMsg", "Veuillez renseigner un prénom valide"]; 
        return errorMsg;
    }
    const nom = document.getElementById("lastName").value;
    if (nom === "") {
        errorMsg = ["lastNameErrorMsg", "Veuillez renseigner votre nom"]; 
        return errorMsg;
    }
    if (!regexName.test(nom)) {
        errorMsg = ["lastNameErrorMsg", "Veuillez renseigner un nom valide"]; 
        return errorMsg;
    }
    const adresse = document.getElementById("address").value;
    if (adresse === ""){
        errorMsg = ["addressErrorMsg", "Veuillez renseigner une adresse"]; 
        return errorMsg;
    };
    if (!regexAddress.test(adresse)){
        errorMsg = ["addressErrorMsg", "Veuillez renseigner une adresse valide"]; 
        return errorMsg;
    }
    const ville = document.getElementById("city").value;
    if (ville === ""){
        errorMsg = ["cityErrorMsg", "Veuillez renseigner la ville"]; 
        return errorMsg;
    };
    if (!regexCity.test(ville)){
        errorMsg = ["cityErrorMsg", "Veuillez renseigner une ville valide"]; 
        return errorMsg;
    }
    const email = document.getElementById("email").value;
    if (email === ""){
        errorMsg = ["emailErrorMsg", "Veuillez renseigner une adresse email"]; 
        return errorMsg;
    };
    if (!regexEmail.test(email)){
        errorMsg = ["emailErrorMsg", "Veuillez renseigner une adresse email valide"]; 
        return errorMsg; 
    }
}

function validerCommande() {
    if(panierProduits.length===0){  
        alert ("votre panier est vide");
        return;
    } 
    // afficher les messages d'erreur   
    let errorMsg = formulaireValide();
    if (errorMsg) {
        let cart = document.querySelectorAll('.cart__order p');
        cart.forEach(p => {
            p.innerHTML ="";
        });
        document.getElementById(errorMsg[0]).innerHTML = errorMsg[1];
        return; 
    }
    

   
    const prenom = document.getElementById("firstName").value;
    const nom = document.getElementById("lastName").value;
    const adresse = document.getElementById("address").value;
    const ville = document.getElementById("city").value;
    const email = document.getElementById("email").value;

    const infos = {
        firstName: prenom,
        lastName: nom,
        address: adresse,
        city: ville,
        email: email,
    };
    console.log("formulaire");

    const order = {
        contact: infos,
        products: panierProduits.map((produit) => produit.id),
    };
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
    };

    fetch("http://localhost:3000/api/products/order", requestOptions)
        .then((response) => {
            console.log("response back end");
            console.log(response);
            if (response.ok == true) {
                //suppression du panier dans le local storage
                localStorage.removeItem("produitsChoisis"); 

                //ouvrir un modal de confirmation
                let modal = document.getElementById("myModal");
                let span = document.getElementsByClassName("close")[0];
                modal.style.display = "block";
                span.onclick = function() {
                    // alert ("Votre Commande reçu avec succés!");
                    //console.log(json);
                    response.json().then((informationsData) => {
                        window.location.replace(
                            `confirmation.html?ic=${informationsData.orderId}`
                        ); //ouvrir une page avec js
                        return;
                });
                }
                // window.onclick = function(event) {
                //     if (event.target == modal) {
                //       modal.style.display = "none";
                //     }
                // }

            } else {
                console.log("Erreur!");
                return;
            }
        })
        .catch((error) => {
            console.log(error);
        });



    
    
}

majSitckersPanier();

// Affichage sticker quantité panier
function majSitckersPanier(){
    let stickersPanier = document.getElementById("checkout_items");
    if(!panierProduits || panierProduits.length == 0){
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

