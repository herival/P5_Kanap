
const textUrl = window.location.search;
const objetParamsUrl = new URLSearchParams(textUrl);
const idcommande = objetParamsUrl.get("ic");
// console.log(idcommande);
document.getElementById("orderId").innerText=idcommande;