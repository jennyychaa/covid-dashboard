import { PropsWithChildren, createContext, useContext, useState } from 'react';

import {
  USStates,
  CovidData,
  SortType,
  State,
  StateAbbrs,
  StateData,
  StateNames,
} from '../models';

type LoadingState = {
  [key in StateAbbrs]?: boolean;
};

interface ContextProps {
  data: {
    isLoading: LoadingState;
    isUpdating: boolean;
    selectedState: StateAbbrs | '';
    sortOrder: SortType | '';
    states: State[];
    statesData: StateData[];
  };
  action: {
    fetchStateData: (state: StateAbbrs) => Promise<void>;
    sortStateData: (sort?: SortType) => void;
    removeStateData: (state: StateAbbrs) => void;
  };
}

const Context = createContext<ContextProps | null>(null);

export function useStatesDataContext() {
  const statesDataContext = useContext(Context);

  if (!statesDataContext) {
    throw new Error(
      'Auto-refill consent context is null. Did you forget to include AutoRefillConsentProvider in your tree?'
    );
  }

  return statesDataContext;
}

function StatesDataProvider({ children }: PropsWithChildren<{}>) {
  const [selectedState, setSelectedState] = useState<StateAbbrs | ''>('');
  const [sortOrder, setSortOrder] = useState<SortType | ''>('');
  const [states, setStates] = useState<State[]>(USStates);
  const [statesData, setStatesData] = useState<StateData[]>([]);
  const [isLoading, setIsLoading] = useState<LoadingState>({});
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);

  const fetchStateData = async (state: StateAbbrs) => {
    setIsLoading((prevIsLoading) => ({
      ...prevIsLoading,
      [state]: true,
    }));
    setSelectedState(state);

    try {
      const response = await fetch(
        `https://api.covidtracking.com/v2/states/${state}/daily/simple.json`
      );

      if (response.status === 200) {
        const results = await response.json();
        // Note: For the scope of this exercise, the API response data type is typed as any.
        // Normally, the response schema would be defined to maintain the data integrity.
        const covidData: CovidData[] = results.data.map(
          ({ cases, date, outcomes, tests }: any) => ({
            state,
            date: date,
            currentIcuCount: outcomes.hospitalized.in_icu.currently,
            currentVentilatorCount:
              outcomes.hospitalized.on_ventilator.currently,
            currentHospitalizationCount: outcomes.hospitalized.currently,
            totalCases: cases.total,
            totalHospitalized: outcomes.hospitalized.total,
            totalPcrTests: tests.pcr.total,
            totalRecovered: outcomes.recovered,
          })
        );
        setStatesData((prevStatesData) => [
          ...prevStatesData,
          {
            state,
            data: covidData,
          },
        ]);
        setStates((prevStates) =>
          prevStates.filter(({ abbr }: State) => abbr !== state)
        );
        setSortOrder('');
      } else {
        console.error('An error occured fetching the data', response.status);
      }
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error(String(error));
    }

    setSelectedState('');
    setIsLoading((prevIsLoading) => ({
      ...prevIsLoading,
      [state]: false,
    }));
  };

  const sortStateData = (sort: SortType = SortType.ASC) => {
    if (sortOrder !== sort) {
      setIsSorting(true);

      if (sort === SortType.ASC) {
        setStatesData((prevStatesData) => {
          return prevStatesData.sort((a, b) => {
            if (a.state < b.state) return -1;
            if (a.state > b.state) return 1;
            return 0;
          });
        });
      } else {
        setStatesData((prevStatesData) => {
          return prevStatesData.sort((a, b) => {
            if (b.state < a.state) return -1;
            if (b.state > a.state) return 1;
            return 0;
          });
        });
      }
      setSortOrder(sort);
      setIsSorting(false);
    }
  };

  const removeStateData = (state: StateAbbrs) => {
    setIsRemoving(true);
    setStatesData((prevStatesData) =>
      prevStatesData.filter((data) => data.state !== state)
    );
    setStates((prevStates) => {
      const stateList = [
        ...prevStates,
        {
          abbr: state,
          name: StateNames[state],
        },
      ];
      return stateList.sort((a, b) => {
        if (a.abbr < b.abbr) return -1;
        if (a.abbr > b.abbr) return 1;
        return 0;
      });
    });
    setIsRemoving(false);
  };

  return (
    <Context.Provider
      value={{
        data: {
          isLoading,
          isUpdating: isSorting || isRemoving,
          selectedState,
          sortOrder,
          states,
          statesData,
        },
        action: {
          fetchStateData,
          removeStateData,
          sortStateData,
        },
      }}>
      {children}
    </Context.Provider>
  );
}

export default StatesDataProvider;
