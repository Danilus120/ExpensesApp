const generateInvestmentData = (
  data: { cryptocurrency: string; value: number },
  currenciesExchange: Record<string, number>
) => {
  const cryptoName = data.cryptocurrency.toLowerCase();

  const investmentData = {
    date: new Date(),
    name: data.cryptocurrency,
    value: data.value,
    exchangeRate: currenciesExchange[cryptoName],
    quantity: calculateExchangeRate(cryptoName, data.value, currenciesExchange),
  };

  return investmentData;
};

const calculateExchangeRate = (
  cryptoName: string,
  value: number,
  currenciesExchange: Record<string, number>
) => {
  const cryptoExchangeRate = currenciesExchange[cryptoName];

  return value * cryptoExchangeRate;
};

export { generateInvestmentData, calculateExchangeRate };
