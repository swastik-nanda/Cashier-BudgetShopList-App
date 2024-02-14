const totalAmount = document.querySelector("#amount");
const budgetInputElement = document.querySelector("#total-amount");
const budgetError = document.querySelector("#budget-error");
const setBudgetButton = document.querySelector("#total-amount-button");
const productNameInputElement = document.querySelector("#product-title");
const productCostInputElement = document.querySelector("#user-amount");
const productError = document.querySelector("#product-title-error");
const checkAmountButton = document.querySelector("#check-amount");
const expenses = document.querySelector("#expenditure-value");
const balance = document.querySelector("#balance-amount");
const listSummary = document.querySelector("#list");
const list = [];
listSummary.classList.add("hidelist");

setBudgetButton.addEventListener("click", () => {
  SetTotalBudget();
});

checkAmountButton.addEventListener("click", () => {
  listSummary.classList.remove("hidelist");
  SetExpenses();
});

listSummary.addEventListener("click", (event) => {
  if(event.target.tagName === "BUTTON"){
    const index = event.target.dataset.index;
    list.splice(index, 1);
    renderBudgetList();
  }

  if(list.length === 0){
    listSummary.classList.add("hidelist");
  }
});

function SetTotalBudget(){
  let budget = budgetInputElement.value;
  budget = Number(budget);

  if(budget === "" || budget < 0){
    budgetError.classList.remove("hide");
  }
  else{
    budgetError.classList.add("hide");
    totalAmount.innerHTML = budget;
    budgetInputElement.value = "";
  }
}

function SetExpenses(){
  let productName = productNameInputElement.value;
  let productCost = productCostInputElement.value;
  let budget = totalAmount.innerHTML;
  budget = Number(budget);
  productCost = Number(productCost);

  if(productName === "" || productCost < 0 || productCost === ""){
    productError.classList.remove("hide");
  }
  else{
    productError.classList.add("hide");
    list.push({ title: productName, cost: productCost });

    let totalExpenses = list.reduce((total, item) => total + item.cost,0);
    expenses.textContent = totalExpenses;

    let newBalance = budget - totalExpenses;
    balance.textContent = newBalance;
  }
  productNameInputElement.value = "";
  productCostInputElement.value = "";
  renderBudgetList();
}

function renderBudgetList(){
  let listSummaryHTML = "";
  list.forEach((listObject, index) => {
    const {title, cost} = listObject;
    const html = `
    <div>${title}</div>
    <div>${cost}</div>
    <button class="delete" data-index="${index}">Delete</button>
    `;
    listSummaryHTML+=html;
  });
  listSummary.innerHTML = listSummaryHTML;
}