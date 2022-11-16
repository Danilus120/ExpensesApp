import { InvestmentI } from "types/user.interface";

const generateInvestmentPayoutData = (
  investment: InvestmentI,
  currenciesExchange: Record<string, number>
) => {
  const payoutExchangeRate = currenciesExchange[investment.name.toLowerCase()];
  const payoutValue = investment.quantity / payoutExchangeRate;
  const summary = investment.value - payoutValue;

  const data = {
    payoutValue,
    payoutDate: new Date().getTime(),
    payoutExchangeRate,
    summary,
    withdrawn: true,
  };

  return data;
};

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

export {
  generateInvestmentPayoutData,
  generateInvestmentData,
  calculateExchangeRate,
};
