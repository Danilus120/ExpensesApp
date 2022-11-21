const getChartsDataFromCategories = <
  T extends { value: number; category: string }
>(
  data: T[],
  categories: { label: string; value: string; allowedInSelect: boolean }[]
) => {
  const chartData = categories.reduce((accumulator, category) => {
    // Filter expenses having that category
    const filteredExpenses = data.filter(
      (el) => el.category === category.value
    );

    // Accumulate expenses
    const accumulateCategoryValue = filteredExpenses.reduce(
      (acc, income) => acc + income.value,
      0
    );

    return [
      ...accumulator,
      { name: category.label, value: accumulateCategoryValue },
    ];
  }, [] as { name: string; value: number }[]);

  return chartData;
};

const getChartsDataFromCrypto = <
  T extends { name: string; payoutDate: number; summary: number }
>(
  data: T[],
  categories: { label: string; value: string }[]
) => {
  const chartData = categories.reduce((accumulator, category) => {
    // Filter expenses having that category
    const filteredExpenses = data.filter((el) => el.name === category.value);

    // Accumulate expenses
    const accumulateCategoryValue = filteredExpenses.reduce(
      (acc, income) => acc + income.summary,
      0
    );

    return [
      ...accumulator,
      { name: category.label, value: accumulateCategoryValue },
    ];
  }, [] as { name: string; value: number }[]);

  return chartData;
};

export { getChartsDataFromCategories, getChartsDataFromCrypto };
