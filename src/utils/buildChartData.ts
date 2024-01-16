import { CovidData, CovidDataType } from "../models";

const parseCovidData = (data: CovidData[]) => {
  const dates: Date[] = [],
        cases: CovidDataType[] = [],
        currentHospitalizations: CovidDataType[] = [],
        currentIcus: CovidDataType[] = [],
        currentVentilators: CovidDataType[] = [],
        hospitalizations: CovidDataType[] = [],
        pcrTests: CovidDataType[] = [],
        recovered: CovidDataType[] = [];

  for (let i = 0; i < data.length; i++) {
    const {
      date,
      currentIcuCount,
      currentVentilatorCount,
      currentHospitalizationCount,
      totalCases,
      totalHospitalized,
      totalPcrTests,
      totalRecovered
    } = data[i];

    dates.push(new Date(date));
    cases.push(totalCases);
    currentIcus.push(currentIcuCount);
    currentVentilators.push(currentVentilatorCount);
    currentHospitalizations.push(currentHospitalizationCount);
    hospitalizations.push(totalHospitalized);
    pcrTests.push(totalPcrTests);
    recovered.push(totalRecovered);
  }

  return {
    dates,
    cases,
    currentHospitalizations,
    currentIcus,
    currentVentilators,
    hospitalizations,
    pcrTests,
    recovered,
  }
}

const dateFormatter = (date: Date) => date instanceof Date ? date.toLocaleDateString() : new Date(date).toLocaleDateString();

export const buildChartData = (data: CovidData[]) => {
  const { dates, cases, currentHospitalizations, currentIcus, currentVentilators, hospitalizations, pcrTests, recovered } = parseCovidData(data);

  return {
    cases: {
      series: [
        { data: cases, label: 'Total Cases', connectNulls: true, showMark: false },
        { data: pcrTests, label: 'PCR Tests', connectNulls: true, showMark: false },
        { data: recovered, label: 'Recovered Cases', connectNulls: true, showMark: false }
      ],
      xAxis: [{ data: dates, scaleTyle: 'time', valueFormatter: dateFormatter }],
    },
    hospitalizations: {
      series: [
        { data: hospitalizations, label: 'Total Hospitalizations', connectNulls: true, showMark: false },
        { data: currentHospitalizations, label: 'Currently Hospitalized', connectNulls: true, showMark: false },
        { data: currentIcus, label: 'Currently in ICU', connectNulls: true, showMark: false },
        { data: currentVentilators, label: 'Currently on Ventilators', connectNulls: true, showMark: false }
      ],
      xAxis: [{ data: dates, scaleTyle: 'time', valueFormatter: dateFormatter }],
    }
  }
};