const STORAGE_KEY = "financeDashboardData";
const USER_KEYS = ["loggedInUser", "username", "userName"];

let totalAmount = 10000;
let monthlyIncome = 0;
let expenses = [
  { description: "Food", category: "Food", amount: 500, date: "2026-09-12" },
  { description: "Travel", category: "Travel", amount: 300, date: "2026-09-11" },
  { description: "Other", category: "Other", amount: 200, date: "2026-09-10" }
];

const totalBalanceValue = document.getElementById("totalBalanceValue");
const totalIncomeValue = document.getElementById("totalIncomeValue");
const totalExpenseValue = document.getElementById("totalExpenseValue");
const remainingBalanceValue = document.getElementById("remainingBalanceValue");
const expenseList = document.getElementById("expenseList");
const categoryList = document.getElementById("categoryList");
const expenseCountBadge = document.getElementById("expenseCountBadge");
const formMessage = document.getElementById("formMessage");
const initialAmountInput = document.getElementById("initialAmount");
const monthlyIncomeInput = document.getElementById("monthlyIncome");
const incomeForm = document.getElementById("incomeForm");
const expenseDescriptionInput = document.getElementById("expenseDescription");
const expenseCategoryInput = document.getElementById("expenseCategory");
const expenseAmountInput = document.getElementById("expenseAmount");
const expenseForm = document.getElementById("expenseForm");
const savedValue = document.getElementById("savedValue");
const spentValue = document.getElementById("spentValue");
const dashboardGreeting = document.getElementById("dashboardGreeting");
const profileName = document.getElementById("profileName");
const userProfileName = document.getElementById("userProfileName");
const profileAvatar = document.getElementById("profileAvatar");
const profileAvatarLarge = document.getElementById("profileAvatarLarge");
const resetDataButton = document.getElementById("resetDataButton");

function safeStoreData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ totalAmount, monthlyIncome, expenses }));
  } catch (error) {
    console.log("Local storage is not available.");
  }
}

function loadSavedData() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return;
    }

    const parsedData = JSON.parse(savedData);

    if (parsedData.totalAmount !== undefined) {
      totalAmount = Number(parsedData.totalAmount);
    }

    if (parsedData.monthlyIncome !== undefined) {
      monthlyIncome = Number(parsedData.monthlyIncome);
    }

    if (Array.isArray(parsedData.expenses)) {
      expenses = parsedData.expenses;
    }
  } catch (error) {
    console.log("Could not load saved dashboard data.");
  }
}

function getUserNameFromStorage() {
  for (let i = 0; i < USER_KEYS.length; i++) {
    const key = USER_KEYS[i];

    try {
      const value = localStorage.getItem(key);
      if (value && value.trim() !== "") {
        return value.trim();
      }
    } catch (error) {
      console.log("Login data is not available.");
    }
  }

  return "User";
}

function updateUserInfo() {
  const loggedInUser = getUserNameFromStorage();
  const firstLetter = loggedInUser.charAt(0).toUpperCase();

  dashboardGreeting.textContent = `Good Morning, ${loggedInUser}`;
  profileName.textContent = loggedInUser;
  userProfileName.textContent = loggedInUser;
  profileAvatar.textContent = firstLetter;
  profileAvatarLarge.textContent = firstLetter;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
}

function getTotalExpense() {
  return expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
}

function getRemainingBalance() {
  return totalAmount - getTotalExpense();
}

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = "form-message " + type;
}

function createCategorySummary() {
  const categoryMap = expenses.reduce((map, expense) => {
    const key = expense.category;
    map[key] = (map[key] || 0) + Number(expense.amount);
    return map;
  }, {});

  const entries = Object.entries(categoryMap);

  if (entries.length === 0) {
    categoryList.innerHTML = '<p class="empty-state">No category summary yet.</p>';
    return;
  }

  const summaryHTML = entries
    .map(([category, amount]) => {
      return `
        <div class="category-row">
          <span>${category}</span>
          <strong>${formatCurrency(amount)}</strong>
        </div>
      `;
    })
    .join("");

  categoryList.innerHTML = summaryHTML;
}

function renderExpenses() {
  if (expenses.length === 0) {
    expenseList.innerHTML = '<li class="empty-state">No expenses added yet.</li>';
    expenseCountBadge.textContent = "0 items";
    return;
  }

  const reverseExpenses = [...expenses].reverse();

  expenseList.innerHTML = reverseExpenses
    .map((expense) => {
      const date = new Date(expense.date).toLocaleDateString("en-IN");
      return `
        <li class="expense-item">
          <div class="expense-text">
            <strong>${expense.description}</strong>
            <small>${expense.category}</small>
          </div>
          <div class="expense-meta">
            <span class="expense-amount">-${formatCurrency(expense.amount)}</span>
            <small>${date}</small>
          </div>
        </li>
      `;
    })
    .join("");

  expenseCountBadge.textContent = `${expenses.length} items`;
}

function updateDashboard() {
  const totalExpense = getTotalExpense();
  const remainingBalance = getRemainingBalance();

  totalBalanceValue.textContent = formatCurrency(totalAmount);
  totalIncomeValue.textContent = formatCurrency(monthlyIncome);
  totalExpenseValue.textContent = formatCurrency(totalExpense);
  remainingBalanceValue.textContent = formatCurrency(remainingBalance);
  savedValue.textContent = formatCurrency(remainingBalance);
  spentValue.textContent = formatCurrency(totalExpense);

  createCategorySummary();
  renderExpenses();
  initialAmountInput.value = totalAmount;
  monthlyIncomeInput.value = monthlyIncome;
  safeStoreData();
}

incomeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const incomeValue = Number(monthlyIncomeInput.value.trim());

  if (Number.isNaN(incomeValue) || incomeValue < 0) {
    window.alert("Please enter a valid monthly income.");
    return;
  }

  monthlyIncome = incomeValue;
  updateDashboard();
});

function validateForm(initialAmount, description, category, expenseValue) {
  if (!initialAmount || initialAmount < 0) {
    return "Please enter a valid initial amount.";
  }

  if (!description.trim()) {
    return "Expense description is required.";
  }

  if (!category.trim()) {
    return "Expense category is required.";
  }

  if (!expenseValue || expenseValue <= 0 || Number.isNaN(expenseValue)) {
    return "Expense amount must be a valid positive number.";
  }

  return "";
}

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const initialAmount = Number(initialAmountInput.value.trim());
  const description = expenseDescriptionInput.value.trim();
  const category = expenseCategoryInput.value.trim();
  const expenseValue = Number(expenseAmountInput.value.trim());

  const validationMessage = validateForm(initialAmount, description, category, expenseValue);

  if (validationMessage) {
    showMessage(validationMessage, "error");
    return;
  }

  totalAmount = initialAmount;

  expenses.push({
    description,
    category,
    amount: expenseValue,
    date: new Date().toISOString()
  });

  showMessage("Expense added successfully.", "success");
  expenseForm.reset();
  updateDashboard();
});

resetDataButton.addEventListener("click", () => {
  const shouldReset = window.confirm("Clear all dashboard data?");

  if (!shouldReset) {
    return;
  }

  totalAmount = 0;
  monthlyIncome = 0;
  expenses = [];
  expenseForm.reset();
  updateDashboard();
  showMessage("All dashboard data has been cleared.", "success");
});

loadSavedData();
updateUserInfo();
initialAmountInput.value = totalAmount;
updateDashboard();
