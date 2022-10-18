const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: "rgb(52, 57, 66);",
    cursor: "pointer",
  }),
  control: (provided) => ({
    ...provided,
    width: "100%",
    margin: "5px 0px",
    backgroundColor: "transparent",
    border: "1px solid rgba(230, 230, 230, 0.2)",
    "&:focus": {
      border: "3px solid rgb(42, 252, 164)",
    },
  }),
  container: (provided) => ({
    ...provided,
    width: "100%",
    margin: "0",
  }),
  menu: (provided) => ({
    ...provided,
    margin: "0",
    backgroundColor: "rgb(52, 57, 66);",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  input: (provided) => ({
    ...provided,
    color: "white",
  }),
};

export { customStyles };
