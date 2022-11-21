import { isSameMonth, isSameWeek, isSameYear } from "date-fns";
import { TimeRangeProps } from "types/chart.interface";

const getValueOfDataFromTimePeriod = <
  T extends { date: number; value: number }
>(
  data: T[],
  timeRange: TimeRangeProps,
  chosenDate: Date | number = new Date()
) => {
  const filteredData = getDataFromTimePeriod(data, timeRange, chosenDate);

  const sumOfValuesFromTimePeriod = filteredData.reduce(
    (acc, curr) => acc + curr.value,
    0
  );

  return sumOfValuesFromTimePeriod;
};

const getSummaryValueFromTimePeriod = <
  T extends { date: number; summary: number }
>(
  data: T[],
  timeRange: TimeRangeProps,
  chosenDate: Date | number = new Date()
) => {
  const filteredData = getDataFromTimePeriod(data, timeRange, chosenDate);
  console.log(filteredData);

  const sumOfValuesFromTimePeriod = filteredData.reduce(
    (acc, curr) => acc + curr.summary,
    0
  );

  return sumOfValuesFromTimePeriod;
};

const getDataFromTimePeriod = <T extends { date: number }>(
  data: T[],
  timeRange: TimeRangeProps,
  chosenDate: Date | number = new Date()
) => {
  let filteredData = [] as T[];

  switch (timeRange) {
    case "week":
      filteredData = getDataFromWeeklyPeriod(data, chosenDate);
      break;
    case "month":
      filteredData = getDataFromMonthlyPeriod(data, chosenDate);
      break;
    case "year":
      filteredData = getDataFromYearlyPeriod(data, chosenDate);
      break;
    default:
      filteredData = data;
      break;
  }

  return filteredData;
};

const getDataFromWeeklyPeriod = <T extends { date: number }>(
  data: T[],
  chosenDate: Date | number
) => {
  return data.filter((el) => isSameWeek(el.date, chosenDate));
};

const getDataFromMonthlyPeriod = <T extends { date: number }>(
  data: T[],
  chosenDate: Date | number
) => {
  return data.filter((el) => isSameMonth(el.date, chosenDate));
};

const getDataFromYearlyPeriod = <T extends { date: number }>(
  data: T[],
  chosenDate: Date | number
) => {
  return data.filter((el) => isSameYear(el.date, chosenDate));
};

const getPayoutDataFromTimePeriod = <T extends { payoutDate: number }>(
  data: T[],
  timeRange: TimeRangeProps,
  chosenDate: Date | number = new Date()
) => {
  let filteredData = [] as T[];

  switch (timeRange) {
    case "week":
      filteredData = getPayoutDataFromWeeklyPeriod(data, chosenDate);
      break;
    case "month":
      filteredData = getPayoutDataFromMonthlyPeriod(data, chosenDate);
      break;
    case "year":
      filteredData = getPayoutDataFromYearlyPeriod(data, chosenDate);
      break;
    default:
      filteredData = data;
      break;
  }

  return filteredData;
};

const getPayoutDataFromWeeklyPeriod = <T extends { payoutDate: number }>(
  data: T[],
  chosenDate: Date | number
) => {
  return data.filter((el) => isSameWeek(el.payoutDate, chosenDate));
};

const getPayoutDataFromMonthlyPeriod = <T extends { payoutDate: number }>(
  data: T[],
  chosenDate: Date | number
) => {
  return data.filter((el) => isSameMonth(el.payoutDate, chosenDate));
};

const getPayoutDataFromYearlyPeriod = <T extends { payoutDate: number }>(
  data: T[],
  chosenDate: Date | number
) => {
  return data.filter((el) => isSameYear(el.payoutDate, chosenDate));
};

export {
  getDataFromTimePeriod,
  getPayoutDataFromTimePeriod,
  getValueOfDataFromTimePeriod,
  getSummaryValueFromTimePeriod,
};
