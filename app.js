// js for hamburger nav bar
const hamburger=document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", ()=>{
    navLinks.classList.toggle("open");
})

links.forEach(link =>{
    link.addEventListener("click", ()=>{
        navLinks.classList.remove("open");
    })
})
// end of ja for hamburger

// variables
const incomeRadios = document.getElementsByName("radio-income");
const costRadios = document.getElementsByName("radio-cost");
let costType = "";
let incomeList = [];
let costList = [];
let incomeRecord = {};
let costRecord = {};
let btnAdd = document.querySelector(".btn-add");
let btnDevide = document.querySelector(".btn-devide");


btnAdd.addEventListener("click", addIncome);
// add income record and save in localStorage
function addIncome() {
    const income = Number(document.querySelector("#incomeValue").value);
    let incomeType = "";
    Storage.getIncome();
    for (i = 0; i < incomeRadios.length; i++) {
        if (incomeRadios[i].checked) {
            incomeType = incomeRadios[i].value;
            console.log(incomeType);
            break;
        }
    }
    for(i=0; i<incomeList.length;i++){
        if (incomeType==incomeList[i].incomeType){
            incomeList[i].income +=income;
            Storage.saveIncome(incomeList);
            uppdateIncome();
            uppdateVinst();
            uppdateIncomeList();
            return;
        }
    }

    incomeRecord = {
        incomeType,
        income,
    }
    incomeList.push(incomeRecord);
    Storage.saveIncome(incomeList);
    uppdateIncome();
    uppdateVinst();
    uppdateIncomeList();
}


function caculateIncome(){
    Storage.getIncome();
    let incomeTotal = 0;
    for (const element of incomeList) {
        incomeTotal += Number(element.income);
        console.log(incomeTotal);
    }
    return incomeTotal;
}

// show income at websites
function uppdateIncome() {
    const incomeTotalDiv = document.querySelector(".income-total");
    incomeTotalDiv.innerText = caculateIncome();
}

btnDevide.addEventListener("click", addCost)

// add cost record and save in localStorage
function addCost() {
    const cost = Number(document.querySelector("#costValue").value);
    let costType = "";
    Storage.getCost();
    for (i = 0; i < costRadios.length; i++) {
        if (costRadios[i].checked) {
            costType = costRadios[i].value;
            break;
        }
    }
    for(i=0; i<costList.length;i++){
        if (costType==costList[i].costType){
            costList[i].cost +=cost;
            Storage.saveCost(costList);
            uppdateCost();
            uppdateVinst();
            uppdatecostList();
            return;
        }
    }
    costRecord = {
        costType,
        cost,
    }
    costList.push(costRecord);
    Storage.saveCost(costList);
    uppdateCost();
    uppdateVinst();
    uppdateCostList();
}

// caculate total cost according to costlist
function caculateCost(){
    Storage.getCost();
    let costTotal = 0;
    for (const element of costList) {
        costTotal += Number(element.cost);
    }
    return costTotal;
}
// show total cost at websites
function uppdateCost() {
    const costTotalDiv = document.querySelector(".cost-total");
    costTotalDiv.innerText = caculateCost();
}
// caculate vinst
function caculateVinst() {
    let vinst = 0;
    vinst=caculateIncome()-caculateCost();
    return vinst;
}
// show vinst at webistes
function uppdateVinst(){
    const vinstDiv=document.querySelector(".vinst");
    vinstDiv.innerText=caculateVinst();
    const showVinst=document.querySelector(".show-vinst");
    showVinst.innerHTML="Vinst: "+caculateVinst();
}

// show income list at websites
function uppdateIncomeList(){
    let result="";
    Storage.getIncome();
    for(const element of incomeList){
      result += `<li>${element.incomeType}: ${element.income}</li>`;
    }
    const inkomstLista=document.querySelector(".inkomstLista");
    inkomstLista.innerHTML=result;
}
// show cost list at websites
function uppdateCostList(){
    let result="";
    Storage.getCost();
    console.log(costList)
    for(const element of costList){
      result += `<li>${element.costType}: ${element.cost}</li>`;
    }
    console.log(result)
    const kostnadLista=document.querySelector(".kostnadLista");
    kostnadLista.innerHTML=result;
}

class Storage {
    static saveIncome(incomeList) {
        localStorage.setItem("incomeList", JSON.stringify(incomeList));
    }
    static getIncome() {
        return localStorage.getItem("incomeList") ?
            JSON.parse(localStorage.getItem("incomeList")) : [];
    }
    static saveCost(costList) {
        localStorage.setItem("incomeList", JSON.stringify(costList));
    }
    static getCost() {
        return localStorage.getItem("costList") ?
            JSON.parse(localStorage.getItem("costList")) : [];
    }
}
