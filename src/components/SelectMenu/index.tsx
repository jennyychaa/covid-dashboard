import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

import { USStates, SortType, State, StateAbbrs } from '../../models';
import { useStatesDataContext } from '../../contexts/StatesDataProvider';

function SelectMenu() {
  const {
    data: { selectedState, sortOrder, states },
    action: { fetchStateData, sortStateData },
  } = useStatesDataContext();

  const handleOnSelectState = (event: SelectChangeEvent<string>) => {
    fetchStateData(event.target.value as StateAbbrs);
  };

  const handleSortStateData = (event: SelectChangeEvent<string>) => {
    sortStateData(
      event.target.value === String(SortType.ASC) ? SortType.ASC : SortType.DESC
    );
  };

  return (
    <Box
      component='header'
      style={{
        marginBottom: '40px',
        borderRadius: '16px',
        backgroundColor: '#e3f2fd',
        padding: '40px',
      }}>
      <Typography variant='h5' component='h1' style={{ marginBottom: '120px' }}>
        COVID-19 Data Dashboard
      </Typography>
      <Grid container direction='row' justifyContent='space-around' spacing={4}>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <InputLabel htmlFor='select-state'>Select a State</InputLabel>
            <Select
              id='select-state'
              autoWidth
              data-testid='select-state'
              defaultValue=''
              disabled={USStates.length - states.length >= 5}
              label='Select a state'
              onChange={handleOnSelectState}
              value={selectedState}>
              {states.map(({ abbr, name }: State) => (
                <MenuItem key={abbr} value={abbr}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel htmlFor='sort'>Sort</InputLabel>
            <Select
              data-testid='sort'
              disabled={USStates.length - states.length === 0}
              id='sort'
              label='Sort States'
              onChange={handleSortStateData}
              value={String(sortOrder)}>
              <MenuItem value={SortType.ASC}>A to Z</MenuItem>
              <MenuItem value={SortType.DESC}>Z to A</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SelectMenu;
