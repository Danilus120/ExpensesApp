const getCurrenciesExchange = async (default_Currency: string) => {
  try {
    const res = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${default_Currency.toLowerCase()}.json`
    );

    const data = await res.json();

    const exchangeRate = data[default_Currency.toLowerCase()];

    return exchangeRate;
  } catch (err: any) {
    return err.message;
  }
};

export { getCurrenciesExchange };
