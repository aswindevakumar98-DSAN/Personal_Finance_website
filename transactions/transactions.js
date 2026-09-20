let transactions = [
    {
        date:"2026-09-05",
        description:"Grocery Shopping",
        category:"Food",
        amount:1200,
        type:"Expense"
    },

    {
        date:"2026-09-04",
        description:"Salary",
        category:"Income",
        amount:20000,
        type:"Income"
    },

    {
        date:"2026-09-03",
        description:"Movie",
        category:"Entertainment",
        amount:600,
        type:"Expense"
    },

    {
        date:"2026-09-02",
        description:"Vegetables",
        category:"Food",
        amount:450,
        type:"Expense"
    },

    {
        date:"2026-09-01",
        description:"Internet",
        category:"Bills",
        amount:799,
        type:"Expense"
    },

    {
        date:"2026-08-31",
        description:"Milk",
        category:"Food",
        amount:320,
        type:"Expense"
    }
    
];

leteditingIndex = -1;

/* Diplay Transactions */
function displayTransactions(data)
{
    const table =document.getElementById("transactionTable");
    
    table.innerHTML ="";
    
    data.forEach((transaction,index)=>{
        const row = document.createElement("tr");

        let sign = transaction.type ==="Income"?
        "+":"-";

        let amountClass = transaction.type ==="Income"? "income":"expense";

        let typeClass = transaction.type === "Income"?"type-income":"type-expense";

        row.innerHTML = `$ {formatDate(transactions.date)} </td>
        <td>${transcation.description}</td>
        <td >$transaction.category</td>
        <td class="${amountClass}"> ${sign} ₹ ${transaction.amount.toLocaleString()}</td>
        <td class="${typeClass}">${transaction.type}</td>
        <td>
            <button class="edit-btn" onclick="editTransaction(${index})">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button class="delete-btn" onclick="deleteTransaction(${index})">
                <i class="fa-solid fa-transh"></i>
            </button>
        </td>
        `;
        table.appendChild(row);
    });
}

/* Date Format */
function formatDate(date){
    const dateOject = new date(date);
    return dateObject.toLocalDateString("en-GB",{
        day:"2-digit",
        month:"short",
        year:"numeric"
    });
}

/* Search + Category Filter */
function filterTransactions(){
    const search = document.getElementById("searchInput")
    .value
    .toLowerCsae();
    const category = document.getElementById("categoryFilter").value;

    const filtered = transaction.filter(transaction =>{
    const matchesSearch = transaction.description.toLowercase().includes(search);

    const matchesCategory = category === "all" || transaction.category === category;
    return matchesSearch && matchesCategory;
    });
    displayTransactions(filtered);
}

/* Sort */
function sortTransaction(){
    const sortVlaue = document.getElemnetById("sortFilter").value;

    let sorted = [...transactions];

    if(sortVlue === "date-desc")
    {
        sorted.sort((a,b)=> new Date(b.date)-new Date(a.date)
    );
    }

    if(sortValue ==="date-asc")
    {
        sorted.sort((a,b)=> new Date(a.date)- new Date(b.date)
    );
    }

    if(sortValue ==="amount-high"){
        sorted.sort((a,b) => b.amount -b.amount
    );
    }

    if(sortValue === "amount-low"){
        sorted.sort((a,b)=> a.amount-b.amount
    );
    }
    displayTransactions(sorted);
}

/* Open Model */
function openModal(){
    document.getElementById("transactionModel").style.display = "flex";
}

/* Close Model */
function closeModal(){
    document.getElementById("transcationModel").style.display ="none";

    document.getElementById("transactionForm")
    .reset();

    editingIndex =-1;
    document.getElementById("modelTitle").textContent = "Add Transaction";
}

/* Add / Update */

document.getElementById("transactionForm").addEventListener("submit",function(event){
    event.preventDefault();
   const transaction = {
    date: document.getElementById("date").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
    amount: Number(document.getElementById("amount").value),
    type: document.getElementById("type").value
};

    if(editingIndex === -1){
        transactions.push(transaction);
    }else{
        transactions[editingIndex] = transaction;
    }
    displayTransactions(transactions);closeModal();
});

/* Delete */
function deleteTransaction(index){
    const confirmDelete = confirm("Are you sure you want to Delete this transaction?");

    if(confirmDelete){
        transaction.splice(index,1);
        displayTransactions(transactions);
    }
}

/* Edit */
function editTransaction(index){
    const transaction = transaction[index];
    editingIndex = index;

    document.getElementById("date").value = transaction.date;
    document.getElementById("description").value = transaction.description;
    document.getElementById("category").value = transaction.category;
    document.getElementById("amount").value = transaction.amount;
    document.getElementById("type").value = transaction.type;
    document.getElementById("modelTitle").textContent = "Edit Transacton";

    openModel();
}
/* Initial Display */
displayTransactions(ransactions);