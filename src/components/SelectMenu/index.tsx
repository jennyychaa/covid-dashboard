import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';

import { STATES, SortType, State, StateAbbrs } from '../../models';
import { useStatesDataContext } from '../../contexts/StatesDataProvider';

function SelectMenu() {
  const {
    data: { selectedState, sortOrder, states },
    action: { fetchStateData, sortStateData }
  } = useStatesDataContext();

  const handleOnSelectState = (event: SelectChangeEvent<string>) => {
    fetchStateData(event.target.value as StateAbbrs);
  };

  const handleSortStateData = (event: SelectChangeEvent<string>) => {
    sortStateData(event.target.value === String(SortType.ASC) ? SortType.ASC : SortType.DESC);
  };

  return (
    <header style={{ marginBottom: '120px' }}>
      <Typography variant="h5" component="h1" style={{ marginBottom: '40px', textTransform: 'uppercase' }}>
        COVID-19 Data Dashboard
      </Typography>
      <Grid container direction="row" justifyContent="space-around" spacing={4}>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <InputLabel htmlFor="select-state">Select a State</InputLabel>
            <Select
              disabled={STATES.length - states.length >= 5}
              autoWidth
              data-testid="select-state"
              defaultValue=""
              id="select-state"
              label="Select a state"
              onChange={handleOnSelectState}
              value={selectedState}
            >
              {states.map(({ abbr, name }: State) => <MenuItem key={abbr} value={abbr}>{name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel htmlFor="sort">Sort</InputLabel>
            <Select
              data-testid="sort"
              disabled={STATES.length - states.length === 0}
              id="sort"
              label="Sort States"
              onChange={handleSortStateData}
              value={String(sortOrder)}
            >
              <MenuItem value={SortType.ASC}>A to Z</MenuItem>
              <MenuItem value={SortType.DESC}>Z to A</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </header>
  );
}

export default SelectMenu;