import { useState } from 'react';
import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LineChart } from '@mui/x-charts';

import { StateData, StateNames } from '../../models';
import { buildChartData } from '../../utils/buildChartData';
import { useStatesDataContext } from '../../contexts/StatesDataProvider';

function StateCard({ data, state }: StateData) {
  const {
    action: { removeStateData }
  } = useStatesDataContext();

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const chartData = buildChartData(data);

  const handleOnChange = (_: any, value: any) => {
    setSelectedTab(value);
  };

  const handleOnRemoveState = () => {
    removeStateData(state);
  };

  return (
    <Box style={{ borderBottom: '2px solid #e3f2fd', paddingTop: '40px', paddingBottom: '40px' }}>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography
            component="h2"
            variant="h6"
            style={{
              marginBottom: '40px',
              fontWeight: 'normal',
              textTransform: 'uppercase',
              color: '#0288d1'
            }}
          >
            {`${StateNames[state]}`}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            aria-label={`Remove ${StateNames[state]}`}
            variant="outlined"
            color="secondary"
            onClick={handleOnRemoveState}
          >
            <CloseIcon />
          </Button>
        </Grid>
      </Grid>
      <Tabs
        aria-label={`${state} data tabs`}
        indicatorColor="primary"
        onChange={handleOnChange}
        textColor="primary"
        value={selectedTab}
      >
        <Tab aria-controls={`tabpanel-${state}`} id={`tab-${state}-0`} label="Cases" value={0} />
        <Tab aria-controls={`tabpanel-${state}`} id={`tab-${state}-1`} label="Hospitalizations" value={1} />
      </Tabs>
      {selectedTab === 0 ? (
        <div
          role="tabpanel"
          hidden={selectedTab !== 0}
          id={`tabpanel-${state}-0`}
          aria-labelledby={`tab-${state}-0`}
        >
          <LineChart
            {...chartData.cases}
            height={400}
            margin={{ left: 70 }}
          />
        </div>
      ) : (
        <div
          role="tabpanel"
          hidden={selectedTab !== 1}
          id={`tabpanel-${state}-1`}
          aria-labelledby={`tab-${state}-1`}
        >
          <LineChart
            {...chartData.hospitalizations}
            height={400}
            margin={{ left: 70 }}
          />
        </div>
      )}
    </Box>
  );
};

export default StateCard;