import { CircularProgress, Container, Grid } from '@material-ui/core';

import { StateData } from './models';
import { useStatesDataContext } from './contexts/StatesDataProvider';
import SelectMenu from './components/SelectMenu';
import StateCard from './components/StateCard';

function App() {
  const {
    data: { isUpdating, isLoading, statesData }
  } = useStatesDataContext();

  return (
    <Container maxWidth="lg" style={{ padding: '80px 40px' }}>
      <SelectMenu />
      {isUpdating ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : statesData.length > 0 && (
        statesData.map(({ state, data }: StateData) => {
          if (isLoading[state]) return <CircularProgress key={state} size="25px" />
          return <StateCard key={state} state={state} data={data} />;
        })
      )}
    </Container>
  );
}

export default App;
