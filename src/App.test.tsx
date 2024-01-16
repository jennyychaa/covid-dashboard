import React from 'react';
import ReactDOM from 'react-dom';
import { screen } from '@testing-library/react';

import App from './App';

/*
* Due the project's limited time, Jest parse issue is unresolved and the test coverage is incomplete.
* If this parse issues were resolved and there were additional time, the following test coverage would have been considered:
* - Verify that there are 10 states to choose in the select menu
* - Verify that StateCard component loads when a state is selected
* - Verify that there is a tab menu with "Cases" and "Hospitalizations" menu items and LineGraph component renders
* - Verify that there is a X button which removes the StateCard component and adds the state name to the select menu
* - Verify that the select menu disables when there are 5 states selected
*/
test('renders the initial dashboard', () => {
  ReactDOM.render(<App />, document.createElement('div'));

  const title = screen.getByText(/Covid-19 Data Dashboard/i);
  const selectState = screen.getByTestId('select-state');
  const sort = screen.getByTestId('sort');

  expect(title).toBeInTheDocument();
  expect(selectState).toBeInTheDocument();
  expect(sort).toBeInTheDocument();
});
