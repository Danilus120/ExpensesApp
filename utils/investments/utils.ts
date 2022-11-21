import { InvestmentI } from "types/user.interface";

const generateInvestmentPayoutData = (
  investment: InvestmentI,
  currenciesExchange: Record<string, number>
) => {
  const payoutExchangeRate = currenciesExchange[investment.name.toLowerCase()];
  const payoutValue = Number(
    (investment.quantity / payoutExchangeRate).toFixed(0)
  );
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
  data: { name: string; value: number },
  currenciesExchange: Record<string, number>
) => {
  const cryptoName = data.name.toLowerCase();

  const investmentData = {
    date: new Date(),
    name: data.name,
    value: Number(data.value.toFixed(0)),
    exchangeRate: Number(currenciesExchange[cryptoName].toFixed(6)),
    quantity: Number(
      calculateExchangeRate(cryptoName, data.value, currenciesExchange)
    ),
  };

  return investmentData;
};

const calculateExchangeRate = (
  cryptoName: string,
  value: number,
  currenciesExchange: Record<string, number>
) => {
  const cryptoExchangeRate = currenciesExchange[cryptoName];

  return strip(value * Number(cryptoExchangeRate));
};

function strip(number: number) {
  return Number(number.toPrecision(12));
}

export {
  generateInvestmentPayoutData,
  generateInvestmentData,
  calculateExchangeRate,
  strip,
};
