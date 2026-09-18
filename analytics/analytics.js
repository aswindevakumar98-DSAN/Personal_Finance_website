// GET DATA FROM DASHBOARD

const income = Number(localStorage.getItem("income")) || 0;

const expenses = Number(localStorage.getItem("expenses")) || 0;



// CALCULATE NET BALANCE


function calculateBalance() {

    return income - expenses;

}



// FORMAT MONEY


function formatMoney(amount) {

    return "₹" + amount.toLocaleString("en-IN");

}



// GET HTML ELEMENTS


const incomeCard =
    document.querySelector(".Analytic__display1 h2");

const expenseCard =
    document.querySelector(".Analytic__display2 h2");

const balanceCard =
    document.querySelector(".Analytic__display3 h2");
    


// DISPLAY ANALYTICS


function displayAnalytics() {

    // Total Income
    if (incomeCard) {

        incomeCard.textContent =
            formatMoney(income);

    }


    // Total Expenses
    if (expenseCard) {

        expenseCard.textContent =
            formatMoney(expenses);

    }


    // Net Balance
    if (balanceCard) {

        balanceCard.textContent =
            formatMoney(calculateBalance());

    }

}



// BUTTONS


const incomeVsExpenseButton =
    document.querySelector(".button__1");

const categoryButton =
    document.querySelector(".button__2");

const monthlyButton =
    document.querySelector(".button__3");






function showIncomeVsExpenses() {

    const balance = calculateBalance();

    alert(
        "Income vs Expenses\n\n" +

        "Total Income: " +
        formatMoney(income) +

        "\nTotal Expenses: " +
        formatMoney(expenses) +

        "\nNet Balance: " +
        formatMoney(balance)
    );

}


if (incomeVsExpenseButton) {

    incomeVsExpenseButton.addEventListener(
        "click",
        showIncomeVsExpenses
    );

}



// CATEGORY-WISE EXPENSE


function showCategoryWise() {

    const categoryData =
        JSON.parse(
            localStorage.getItem("categoryExpenses")
        ) || {};


    let message =
        "Category-wise Expenses\n\n";


    for (const category in categoryData) {

        message +=
            category +
            " : " +
            formatMoney(categoryData[category]) +
            "\n";

    }


    if (Object.keys(categoryData).length === 0) {

        message =
            "No category expense data available.";

    }


    alert(message);

}


if (categoryButton) {

    categoryButton.addEventListener(
        "click",
        showCategoryWise
    );

}



// MONTHLY SPENDING


function showMonthlySpending() {

    const monthlyData =
        JSON.parse(
            localStorage.getItem("monthlyData")
        ) || [];


    let message =
        "Monthly Spending\n\n";


    monthlyData.forEach(function (data) {

        const balance =
            data.income - data.expense;


        message +=
            data.month +

            "\nIncome: " +
            formatMoney(data.income) +

            "\nExpense: " +
            formatMoney(data.expense) +

            "\nBalance: " +
            formatMoney(balance) +

            "\n\n";

    });


    if (monthlyData.length === 0) {

        message =
            "No monthly data available.";

    }


    alert(message);

}


if (monthlyButton) {

    monthlyButton.addEventListener(
        "click",
        showMonthlySpending
    );

}



// UPDATE MONTHLY TABLE


function updateMonthlyTable() {

    const table =
        document.querySelector(".monthly-summary");


    if (!table) {

        return;

    }


    const monthlyData =
        JSON.parse(
            localStorage.getItem("monthlyData")
        ) || [];


    const rows =
        table.querySelectorAll("tr");


    monthlyData.forEach(function (data, index) {

        const row =
            rows[index + 1];


        if (!row) {

            return;

        }


        const cells =
            row.querySelectorAll("td");


        const balance =
            data.income - data.expense;


        if (cells.length >= 4) {

            cells[0].textContent =
                data.month;

            cells[1].textContent =
                formatMoney(data.income);

            cells[2].textContent =
                formatMoney(data.expense);

            cells[3].textContent =
                formatMoney(balance);

        }

    });

}



// RUN WHEN PAGE LOADS


displayAnalytics();

updateMonthlyTable();



// LIGHT / DARK MODE


const sunIcon = document.querySelector("#sunIcon");
const moonIcon = document.querySelector("#moonIcon");

if (sunIcon) {
sunIcon.addEventListener("click", function () {

document.body.classList.remove("dark-mode");  

});

}

if (moonIcon) {
moonIcon.addEventListener("click", function () {

document.body.classList.add("dark-mode");  

});

}


// PROFILE ICON


const profileIcon = document.querySelector("#profileIcon");

if (profileIcon) {

    profileIcon.addEventListener("click", function () {

        alert(
            "Profile\n\n" +
            "Name: Abi Soniya\n" +
            "Email: abisoniya@example.com"
        );

    });

}
