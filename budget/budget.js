const budgets = [
  { category: "Food", icon: "🍴", budget: 6000, spent: 5200 },
  { category: "Transport", icon: "🚗", budget: 3000, spent: 2800 },
  { category: "Bills", icon: "▣", budget: 3000, spent: 2200 },
  { category: "Entertainment", icon: "🎮", budget: 2000, spent: 1350 },
  { category: "Others", icon: "•••", budget: 2000, spent: 2000 }
];

const rowsContainer = document.getElementById("budgetRows");
const alertBox = document.getElementById("budgetAlert");
const alertTitle = document.getElementById("alertTitle");
const alertMessage = document.getElementById("alertMessage");

const modal = document.getElementById("budgetModal");
const openModal = document.getElementById("openBudgetModal");
const closeModal = document.getElementById("closeModal");
const categorySelect = document.getElementById("categorySelect");
const budgetInput = document.getElementById("budgetInput");
const saveBudget = document.getElementById("saveBudget");

function money(value) {
  return `₹ ${value.toLocaleString("en-IN")}`;
}

function renderBudgets() {
  rowsContainer.innerHTML = budgets.map(item => {
    const remaining = item.budget - item.spent;
    const percentage = item.budget > 0
      ? Math.round((item.spent / item.budget) * 100)
      : 0;

    const safePercentage = Math.min(percentage, 100);
    const isOver = remaining < 0;

    return `
      <div class="budget-row">
        <div class="category">
          <span class="category-icon">${item.icon}</span>
          <span>${item.category}</span>
        </div>
        <div class="amount">${money(item.budget)}</div>
        <div class="amount">${money(item.spent)}</div>
        <div class="amount remaining ${isOver ? "over" : ""}">
          ${money(Math.abs(remaining))}${isOver ? " over" : ""}
        </div>
        <div class="progress-wrap">
          <div class="progress-bar">
            <div class="progress ${isOver ? "over" : ""}" style="width:${safePercentage}%"></div>
          </div>
          <span class="percent">${percentage}%</span>
        </div>
      </div>
    `;
  }).join("");

  showExceededBudget();
  populateCategorySelect();
}

// Demonstrates Array.some() for checking whether ANY budget is exceeded.
function showExceededBudget() {
  const exceeded = budgets.some(item => item.spent > item.budget);

  if (!exceeded) {
    alertBox.hidden = true;
    return;
  }

  // Demonstrates Array.find() for getting the first exceeded category.
  const category = budgets.find(item => item.spent > item.budget);

  alertBox.hidden = false;
  alertTitle.textContent = `${category.category} budget exceeded!`;
  alertMessage.textContent =
    `You have spent ${money(category.spent - category.budget)} more than your budget.`;
}

function populateCategorySelect() {
  categorySelect.innerHTML = budgets.map(item =>
    `<option value="${item.category}">${item.category}</option>`
  ).join("");
}

openModal.addEventListener("click", () => {
  modal.classList.add("show");
  budgetInput.value = "";
  budgetInput.focus();
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", event => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    modal.classList.remove("show");
  }
});

saveBudget.addEventListener("click", () => {
  const categoryName = categorySelect.value;
  const newBudget = Number(budgetInput.value);

  if (!newBudget || newBudget < 0) {
    alert("Please enter a valid budget amount.");
    return;
  }

  // Demonstrates Array.find() for updating a selected category.
  const category = budgets.find(item => item.category === categoryName);

  if (category) {
    category.budget = newBudget;
    renderBudgets();
    modal.classList.remove("show");
  }
});

renderBudgets();
