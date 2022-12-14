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
    Header: "Name",
    accessor: "shopName",
  },
  {
    Header: "Value",
    accessor: "value",
  },
  // {
  //   Header: "Currency",
  //   accessor: "currency",
  // },
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
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Value",
    accessor: "value",
  },
  // {
  //   Header: "Currency",
  //   accessor: "currency",
  // },
  {
    Header: "Description",
    accessor: "description",
  },
];

const investmentsTableColumns = [
  { Header: "Payout Date", accessor: "payoutDate" },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Value",
    accessor: "value",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Payout Value",
    accessor: "payoutValue",
  },
];

export { expensesTableColumns, incomeTableColumns, investmentsTableColumns };
