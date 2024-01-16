export enum StateAbbrs {
  az = 'az',
  fl = 'fl',
  ga = 'ga',
  ky = 'ky',
  md = 'md',
  oh = 'oh',
  ri = 'ri',
  tn = 'tn',
  wa = 'wa',
  wi = 'wi',
}

export enum StateNames {
  az = 'Arizona',
  fl = 'Florida',
  ga = 'Georgia',
  ky = 'Kentucky',
  md = 'Maryland',
  oh = 'Ohio',
  ri = ' Rhode Island',
  tn = 'Tennessee',
  wa = 'Washington',
  wi = 'Wisconsin',
}

export interface State {
  abbr: StateAbbrs;
  name: StateNames;
}

export const STATES: State[] = [
  {
    abbr: StateAbbrs.az,
    name: StateNames.az
  },
  {
    abbr: StateAbbrs.fl,
    name: StateNames.fl
  },
  {
    abbr: StateAbbrs.ga,
    name: StateNames.ga
  },
  {
    abbr: StateAbbrs.ky,
    name: StateNames.ky
  },
  {
    abbr: StateAbbrs.md,
    name: StateNames.md
  },
  {
    abbr: StateAbbrs.oh,
    name: StateNames.oh
  },
  {
    abbr: StateAbbrs.ri,
    name: StateNames.ri
  },
  {
    abbr: StateAbbrs.tn,
    name: StateNames.tn
  },
  {
    abbr: StateAbbrs.wa,
    name: StateNames.wa
  },
  {
    abbr: StateAbbrs.wi,
    name: StateNames.wi
  },
];

export type CovidDataType = number | null;

export interface CovidData {
  date: string;
  currentHospitalizationCount: CovidDataType;
  currentIcuCount: CovidDataType;
  currentVentilatorCount: CovidDataType;
  totalCases: CovidDataType;
  totalHospitalized: CovidDataType;
  totalPcrTests: CovidDataType;
  totalRecovered: CovidDataType;
}

export interface StateData {
  state: StateAbbrs;
  data: CovidData[];
}

export enum SortType {
  ASC,
  DESC
}