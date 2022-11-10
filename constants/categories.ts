const expensesCategories = [
  {
    label: "Car and transport",
    value: "car-and-transport",
    allowedInSelect: true,
  },
  {
    label: "Clothing and footwear",
    value: "clothing-and-footwear",
    allowedInSelect: true,
  },
  {
    label: "Entertainment and travel",
    value: "entertainment-and-travel",
    allowedInSelect: true,
  },
  { label: "Finance", value: "finance", allowedInSelect: true },
  { label: "Investment", value: "investment", allowedInSelect: false },
  { label: "Food", value: "food", allowedInSelect: true },
  {
    label: "Health and beauty",
    value: "health-and-beauty",
    allowedInSelect: true,
  },
  { label: "Home and bills", value: "home-and-bills", allowedInSelect: true },
  { label: "Others", value: "others", allowedInSelect: true },
];

const incomeCategories = [
  { label: "Job", value: "job", allowedInSelect: true },
  { label: "Freelance", value: "freelance", allowedInSelect: true },
  { label: "Investment", value: "investment", allowedInSelect: false },
  { label: "Others", value: "others", allowedInSelect: true },
];

export { expensesCategories, incomeCategories };
