const expensesTableColumns = [
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Shop Name",
    accessor: "shopName",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Currency",
    accessor: "currency",
  },
  {
    Header: "Description",
    accessor: "description",
  },
];

const incomeTableColumns = [
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Income Value",
    accessor: "income",
  },
  {
    Header: "Currency",
    accessor: "currency",
  },
  {
    Header: "Description",
    accessor: "description",
  },
];

export { expensesTableColumns, incomeTableColumns };
