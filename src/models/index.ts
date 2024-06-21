export type StateAbbrs =
  | 'al'
  | 'ak'
  | 'az'
  | 'ar'
  | 'ca'
  | 'co'
  | 'ct'
  | 'de'
  | 'fl'
  | 'ga'
  | 'hi'
  | 'id'
  | 'il'
  | 'in'
  | 'ia'
  | 'ks'
  | 'ky'
  | 'la'
  | 'me'
  | 'md'
  | 'ma'
  | 'mi'
  | 'mn'
  | 'ms'
  | 'mo'
  | 'mt'
  | 'ne'
  | 'nv'
  | 'nh'
  | 'nj'
  | 'nm'
  | 'ny'
  | 'nc'
  | 'nd'
  | 'oh'
  | 'ok'
  | 'or'
  | 'pa'
  | 'ri'
  | 'sc'
  | 'sd'
  | 'tn'
  | 'tx'
  | 'ut'
  | 'vt'
  | 'va'
  | 'wa'
  | 'wv'
  | 'wi'
  | 'wy';

export enum StateNames {
  al = 'Alabama',
  ak = 'Alaska',
  az = 'Arizona',
  ar = 'Arkansas',
  ca = 'California',
  co = 'Colorado',
  ct = 'Connecticut',
  de = 'Delaware',
  fl = 'Florida',
  ga = 'Georgia',
  hi = 'Hawaii',
  id = 'Idaho',
  il = 'Illinois',
  in = 'Indiana',
  ia = 'Iowa',
  ks = 'Kansas',
  ky = 'Kentucky',
  la = 'Louisiana',
  me = 'Maine',
  md = 'Maryland',
  ma = 'Massachusetts',
  mi = 'Michigan',
  mn = 'Minnesota',
  ms = 'Mississippi',
  mo = 'Missouri',
  mt = 'Montana',
  ne = 'Nebraska',
  nv = 'Nevada',
  nh = 'New Hampshire',
  nj = 'New Jersey',
  nm = 'New Mexico',
  ny = 'New York',
  nc = 'North Carolina',
  nd = 'North Dakota',
  oh = 'Ohio',
  ok = 'Oklahoma',
  or = 'Oregon',
  pa = 'Pennsylvania',
  ri = 'Rhode Island',
  sc = 'South Carolina',
  sd = 'South Dakota',
  tn = 'Tennessee',
  tx = 'Texas',
  ut = 'Utah',
  vt = 'Vermont',
  va = 'Virginia',
  wa = 'Washington',
  wv = 'West Virginia',
  wi = 'Wisconsin',
  wy = 'Wyoming',
}

export interface State {
  abbr: StateAbbrs;
  name: StateNames;
}

export const USStates: State[] = [
  { abbr: 'al', name: StateNames.al },
  { abbr: 'ak', name: StateNames.ak },
  { abbr: 'az', name: StateNames.az },
  { abbr: 'ar', name: StateNames.ar },
  { abbr: 'ca', name: StateNames.ca },
  { abbr: 'co', name: StateNames.co },
  { abbr: 'ct', name: StateNames.ct },
  { abbr: 'de', name: StateNames.de },
  { abbr: 'fl', name: StateNames.fl },
  { abbr: 'ga', name: StateNames.ga },
  { abbr: 'hi', name: StateNames.hi },
  { abbr: 'id', name: StateNames.id },
  { abbr: 'il', name: StateNames.il },
  { abbr: 'in', name: StateNames.in },
  { abbr: 'ia', name: StateNames.ia },
  { abbr: 'ks', name: StateNames.ks },
  { abbr: 'ky', name: StateNames.ky },
  { abbr: 'la', name: StateNames.la },
  { abbr: 'me', name: StateNames.me },
  { abbr: 'md', name: StateNames.md },
  { abbr: 'ma', name: StateNames.ma },
  { abbr: 'mi', name: StateNames.mi },
  { abbr: 'mn', name: StateNames.mn },
  { abbr: 'ms', name: StateNames.ms },
  { abbr: 'mo', name: StateNames.mo },
  { abbr: 'mt', name: StateNames.mt },
  { abbr: 'ne', name: StateNames.ne },
  { abbr: 'nv', name: StateNames.nv },
  { abbr: 'nh', name: StateNames.nh },
  { abbr: 'nj', name: StateNames.nj },
  { abbr: 'nm', name: StateNames.nm },
  { abbr: 'ny', name: StateNames.ny },
  { abbr: 'nc', name: StateNames.nc },
  { abbr: 'nd', name: StateNames.nd },
  { abbr: 'oh', name: StateNames.oh },
  { abbr: 'ok', name: StateNames.ok },
  { abbr: 'or', name: StateNames.or },
  { abbr: 'pa', name: StateNames.pa },
  { abbr: 'ri', name: StateNames.ri },
  { abbr: 'sc', name: StateNames.sc },
  { abbr: 'sd', name: StateNames.sd },
  { abbr: 'tn', name: StateNames.tn },
  { abbr: 'tx', name: StateNames.tx },
  { abbr: 'ut', name: StateNames.ut },
  { abbr: 'vt', name: StateNames.vt },
  { abbr: 'va', name: StateNames.va },
  { abbr: 'wa', name: StateNames.wa },
  { abbr: 'wv', name: StateNames.wv },
  { abbr: 'wi', name: StateNames.wi },
  { abbr: 'wy', name: StateNames.wy },
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
  ASC = '0',
  DESC = '1',
}
