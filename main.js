const spendingInput = document.querySelector("#spending");
const priceInput = document.querySelector("#price");
const statusCheck = document.querySelector("#status-input");
const formBtn = document.querySelector(".add-btn");
const list = document.querySelector(".list");
const totalİnformation = document.querySelector("#total-information");
const selectFilter = document.querySelector("#filter-select");

// monitoring operations(izleme işlemleri)
formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

//total state'i (durum)
let total = 0;

function uptadeTotal(price) {
  total += Number(price);
  totalİnformation.innerText = total;
}

//creating expenses(Harcama Oluşturma)
function addExpense(e) {
  e.preventDefault();

  if (!priceInput.value || !spendingInput.value) {
    alert("fill out the form");
    // function stop
    return;
  }

  // div oluşturma
  const spendingDiv = document.createElement("div");

  // add class
  spendingDiv.classList.add("spending");
  if (statusCheck.checked) {
    spendingDiv.classList.add("payed");
  }

  //içeriğini ayarlama
  spendingDiv.innerHTML = ` 
<h2>${spendingInput.value}</h2>
<h2 id="value">${priceInput.value}</h2>
<div class="buttons">
  <img id="payment" src="img/pay.png" alt="" />
  <img id="remove" src="img/remove.png" alt="" />
</div>
</div>
`;

  // oluşan harcamayı htmle gönderme (listeye ekleme)
  list.appendChild(spendingDiv);

  // toplamı güncelle
  uptadeTotal(priceInput.value);

  // form clean
  spendingInput.value = "";
  priceInput.value = "0";
}

//managing the event of clicking on the list(listeye tıklanma olayını yönetme)
function handleClick(e) {
  //tıklanılan elemanı alma
  const element = e.target;
  if (element.id === "remove") {
    // tıklanılan sil butonunun kapsayıcısını alma

    const wrapperElement = element.parentElement.parentElement;
    // kapsayıcıyı htmlden kaldırma
    wrapperElement.remove();

    //silinen elemanın fiyatını alma
    const deletedPrice = wrapperElement.querySelector("#value").innerText;

    // silinenin fiyatını toplamdan çıkarma
    uptadeTotal(-Number(deletedPrice));
  }
}

//filtreleme işlemi
function handleFilter(e) {
  const items = list.childNodes;
  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }

        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
