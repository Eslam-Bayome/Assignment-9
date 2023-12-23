let nameInp = document.querySelector("#siteName");
let urlInp = document.querySelector("#siteUrl");
let textFill = document.querySelector(".fill");
let btnSub = document.querySelector(".add");
let closeBtn = document.querySelector(".close");
let overlay = document.querySelector(".overlay");
console.log(overlay);
let productArr = [];
if (localStorage.getItem("products")) {
  productArr = JSON.parse(localStorage.getItem("products"));
  displayProduct();
}
btnSub.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    myRegex(nameInp, /^[\w]{3,44}$/) &&
    myRegex(urlInp, /^(http|https):\/\/[^ "]+$/)
  ) {
    let product = {
      name: nameInp.value,
      url: urlInp.value,
    };

    productArr.push(product);
    localStorage.setItem("products", JSON.stringify(productArr));
    nameInp.value = urlInp.value = "";

    displayProduct();
  } else {
    overlay.classList.remove("d-none");
  }
});
// ======================
function displayProduct() {
  let text = "";
  for (let i = 0; i < productArr.length; i++) {
    text += `
    <tr>
    <td>${i + 1}</td>
    <td>${productArr[i].name}</td>
    <td><a href="${
      productArr[i].url
    }" class="btn  btn-danger" target="_blank"><i class="fa-solid fa-eye me-2"></i> Visit</a></td>
    <td><button class="btn  btn-danger" onclick="deleteItem(${i})" ><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
  </tr>`;
  }
  textFill.innerHTML = text;
}
function deleteItem(index) {
  productArr.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productArr));
  displayProduct();
}

function myRegex(input, reg) {
  let myurl = input.value;
  return reg.test(myurl);
}
// ======================
nameInp.addEventListener("input", function () {
  if (myRegex(nameInp, /^[\w]{3,44}$/)) {
    nameInp.classList.add("is-valid");
    nameInp.classList.remove("is-invalid");
  } else {
    nameInp.classList.remove("is-valid");
    nameInp.classList.add("is-invalid");
  }
});

urlInp.addEventListener("input", function () {
  if (myRegex(urlInp, /^(http|https):\/\/[^ "]+$/)) {
    urlInp.classList.add("is-valid");
    urlInp.classList.remove("is-invalid");
  } else {
    urlInp.classList.remove("is-valid");
    urlInp.classList.add("is-invalid");
  }
});
// ======================
document.body.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    overlay.classList.add("d-none");
  }
});
closeBtn.addEventListener("click", function () {
  overlay.classList.add("d-none");
});
