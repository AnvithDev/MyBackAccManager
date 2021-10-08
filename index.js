var GlobalAccData = [];
var EnteredContent = document.getElementById("accountContents");
var GlobalAccCopy =[];

// The card details

let insertAccount= () =>{
    var newAcc={
        FullName:document.getElementById("Fullname").value.toUpperCase(),
        DOB:document.getElementById("DOB").value,
        PhoneNo:document.getElementById("phoneNo").value,
        BankName:document.getElementById("BankName").value.toUpperCase(),
        AccNo:document.getElementById("accNo").value,
        Balance:document.getElementById("Deposit").value,
        Password:document.getElementById("password").value
    };

    if(!newAcc.Balance)
        newAcc.Balance=0;
    const notEmpty= newAcc.AccNo  && newAcc.BankName  && newAcc.Password && newAcc.PhoneNo;

    if(notEmpty){
    EnteredContent.insertAdjacentHTML("beforeend",generateAccountDetails(newAcc));
    GlobalAccData.push(newAcc);
    console.log(GlobalAccData)
    saveToLocalStorage()
  }
}

// Creating the card structure

let generateAccountDetails=({FullName,DOB,BankName,AccNo,PhoneNo,Balance,Password}) =>{
    return(
        ` <div class="col-md-6 col-lg-4 mt-3">
        <div class="card123" id=${AccNo}>
        <div  class="col card-content123">
          <div><b>Full Name</b> : <span>${FullName}</span></div>
          <div><b>DOB </b>: <span>${DOB}<span> </div>
          <div><b>Mobile No.</b> : +91 <span>${PhoneNo}</span></div>
          <div><b>Bank</b>: <span>${BankName}</span></div>
          <div><b>Account No.</b> : <span>${AccNo}</span></div>
         <div id="ChangeAmt"><b>Balance </b>: $<span>${Balance}</span></div>
         <div class="button">
            <button type="button" class="btn btn-outline-info action-btn" onclick="editData(this)">
              <i class="fas fa-pencil-alt" onclick="editData(this)"></i>
            </button>
            <button type="button" class="btn btn-outline-danger action-btn" name=${AccNo} onclick="deleteData(this)" style="margin-left:5px">
              <i class="far fa-trash-alt" onclick="deleteData(this)"></i>
            </button>
          </div>
          <div class="savebtn">
        <button type="button" class="btn btn-primary" name=${AccNo} style="display:none;margin-top:0.4rem">Save changes</button>
          </div>
        </div>
        </div>
      </div>`
    )
}

// Saving data to local storage

const saveToLocalStorage = () => {
    localStorage.setItem("acc_key", JSON.stringify({accounts: GlobalAccData}));
}

// Retrieving the data on reloading the page

const reloadContents = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("acc_key"));
    console.log(localStorageCopy);
    if(localStorageCopy) {
        GlobalAccData = localStorageCopy.accounts;
    }
    console.log(GlobalAccData)
    GlobalAccData.map((cardData) => {
        EnteredContent.insertAdjacentHTML('beforeend', generateAccountDetails(cardData));
    })
}

// Deleting the contents

const deleteData = (e) => {
    const targetID = e.getAttribute("name");
    console.log(targetID);
    GlobalAccData = GlobalAccData.filter((cardData) => {if(cardData.AccNo!==targetID || targetID===undefined)
                                                                                return cardData;});
    saveToLocalStorage();
    window.location.reload();
}

// Editing the card contents

const editData=(e) =>{
    console.log(e.parentNode.parentNode.childNodes[1])
    console.log(e.parentNode.parentNode.childNodes[15])
    e.parentNode.parentNode.childNodes[15].childNodes[1].style.transition="0.2s all ease-in"
    e.parentNode.parentNode.childNodes[15].childNodes[1].style.display="initial"

    console.log(e.parentNode.parentNode.childNodes[1].childNodes[2])
    e.parentNode.parentNode.childNodes[1].childNodes[2].setAttribute("contenteditable","true")
    e.parentNode.parentNode.childNodes[1].childNodes[2].style.border="1px ridge red"
    e.parentNode.parentNode.childNodes[1].childNodes[2].style.padding="0 4px";

    console.log(e.parentNode.parentNode.childNodes[3].childNodes[2])
    e.parentNode.parentNode.childNodes[3].childNodes[2].setAttribute("contenteditable","true")
    e.parentNode.parentNode.childNodes[3].childNodes[2].style.border="1px ridge red"
    e.parentNode.parentNode.childNodes[3].childNodes[2].style.padding="0 4px";

    console.log(e.parentNode.parentNode.childNodes[5].childNodes[2])
    e.parentNode.parentNode.childNodes[5].childNodes[2].setAttribute("contenteditable","true")
    e.parentNode.parentNode.childNodes[5].childNodes[2].style.border="1px ridge red"
    e.parentNode.parentNode.childNodes[5].childNodes[2].style.padding="0 4px";

    e.parentNode.parentNode.childNodes[15].childNodes[1].setAttribute("onclick","saveData(this)");
}

const saveData = (e) => {
     console.log(e)
     console.log(e.parentNode.parentNode.childNodes[1].childNodes[2])
     const targetID = e.getAttribute("name");
     console.log(targetID)
     let copy=GlobalAccData;
     copy=copy.map((obj)=>{
       if(obj.AccNo === targetID){
         obj.FullName =e.parentNode.parentNode.childNodes[1].childNodes[2].innerHTML;
         obj.DOB =e.parentNode.parentNode.childNodes[3].childNodes[2].innerHTML;
         obj.PhoneNo =e.parentNode.parentNode.childNodes[5].childNodes[2].innerHTML;
         obj.BankName=obj.BankName
         obj.AccNo=obj.AccNo;
         obj.Balance=obj.Balance
         obj.Password=obj.Password;
       }
       return obj
     })

     console.log(copy)
     GlobalAccData=copy;
     saveToLocalStorage();

     console.log(e.parentNode.parentNode.childNodes[1].childNodes[2])
    e.parentNode.parentNode.childNodes[1].childNodes[2].setAttribute("contenteditable","false")
    e.parentNode.parentNode.childNodes[1].childNodes[2].style.border="none"
    e.parentNode.parentNode.childNodes[1].childNodes[2].style.padding="0"
    console.log(e.parentNode.parentNode.childNodes[3].childNodes[2])
    e.parentNode.parentNode.childNodes[3].childNodes[2].setAttribute("contenteditable","false")
    e.parentNode.parentNode.childNodes[3].childNodes[2].style.border="none"
    e.parentNode.parentNode.childNodes[3].childNodes[2].style.padding="0 ";

    console.log(e.parentNode.parentNode.childNodes[5].childNodes[2])
    e.parentNode.parentNode.childNodes[5].childNodes[2].setAttribute("contenteditable","false")
    e.parentNode.parentNode.childNodes[5].childNodes[2].style.border="none"
    e.parentNode.parentNode.childNodes[5].childNodes[2].style.padding="0 ";

    e.style.display="none"
}

// Withdrawing the money

let withdraw = (e) => {
  var WithdrawInfo={
    WBankName:document.getElementById("WBankName").value.toUpperCase(),
    WAccNo:document.getElementById("WaccNo").value,
    WithdrawAmt:document.getElementById("WithdrawAmt").value,
    WPassword:document.getElementById("Wpassword").value
  };
  
  copy=GlobalAccData;
  copy=copy.map((obj)=>{
    if(obj.BankName===WithdrawInfo.WBankName && obj.AccNo===WithdrawInfo.WAccNo)
    {
      if(WithdrawInfo.WPassword===obj.Password)
      {
        if(obj.Balance-WithdrawInfo.WithdrawAmt>=0 && WithdrawInfo.WithdrawAmt>0){
          obj.Balance=obj.Balance-WithdrawInfo.WithdrawAmt;
          const SubstractAmt = document.getElementById("ChangeAmt")
          SubstractAmt.insertAdjacentHTML("beforeend",`<span style="color:red">   -$${WithdrawInfo.WithdrawAmt}</span>`);
          console.log(SubstractAmt.childNodes[3]);
          setTimeout(function(){ 
            SubstractAmt.childNodes[3].remove(); 
          }, 3000);
          SubstractAmt.childNodes[2].innerHTML=`${obj.Balance}`;
        }
        else{
          alert("Cannot Withdarw more than current Balance");
        }
      }
      else{
        alert("Incorrect Password")
      }
    }
    return obj
  })

    console.log(copy);
    GlobalAccData=copy;
    console.log(GlobalAccData)
    saveToLocalStorage();
}

// Depositing the money

let deposit = () => {
  var DepositInfo={
    DBankName:document.getElementById("DBankName").value.toUpperCase(),
    DAccNo:document.getElementById("DaccNo").value,
    DepositAmt:document.getElementById("DepositAmt").value,
    DPassword:document.getElementById("Dpassword").value
  };

  copy=GlobalAccData;
  console.log(copy);
  copy=copy.map((obj)=>{
    if(obj.BankName===DepositInfo.DBankName && obj.AccNo===DepositInfo.DAccNo)
    {
      if(DepositInfo.DPassword===obj.Password)
      {
        if(DepositInfo.DepositAmt>0)
            {
              obj.Balance=obj.Balance+Number(DepositInfo.DepositAmt);
              const AddAmt = document.getElementById("ChangeAmt")
            AddAmt.insertAdjacentHTML("beforeend",`<span style="color:green">   +$${DepositInfo.DepositAmt}</span>`);
            console.log(AddAmt.childNodes[3]);
            setTimeout(function(){ AddAmt.childNodes[3].remove(); }, 3000);
            AddAmt.childNodes[2].innerHTML=`${obj.Balance}`;
            }
        else  {
          alert("Enter valid Amount");
        }
      }
      else{
        alert("Wrong Password");
      }
    }
    return obj
  })

    
    GlobalAccData=copy;
    console.log(GlobalAccData)
    saveToLocalStorage();
}

// Search Bar
const searchBar = document.getElementById("searchBar");

searchBar.addEventListener('keyup',(e)=>{
  const searchInput = e.target.value.toUpperCase();
  const filteredCards = GlobalAccData.filter((card)=>{
    if(card.FullName.includes(searchInput) || card.BankName.includes(searchInput) || card.AccNo.includes(searchInput) || card.PhoneNo.includes(searchInput)){
      return card;
    }
  })
  displayFilterdCards(filteredCards);
})

const displayFilterdCards = (filteredCards) => {
  while (EnteredContent.firstChild) {
    EnteredContent.removeChild(EnteredContent.firstChild);
  }
  filteredCards.map((cardData) => {
    EnteredContent.insertAdjacentHTML('beforeend', generateAccountDetails(cardData));
})
};

// Form validation in the modal

const formModal = document.getElementsByClassName("Modal-form");

for(var i=0;i<formModal.length;i++)
formModal[i].addEventListener("submit", function(e){
  console.log(e)
  e.preventDefault();
  this.reset();
});