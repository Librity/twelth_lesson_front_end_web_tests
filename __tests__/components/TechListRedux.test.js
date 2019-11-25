import React from 'react';
import { useSelector } from 'react-redux';
import { render } from '@testing-library/react';

import TechListRedux from '~/components/TechListRedux';

jest.mock('react-redux');

describe('TechList component', () => {
  it('should render the tech list', () => {
    useSelector.mockImplementation(cb =>
      cb({
        techs: ['Node.js', 'ReactJS'],
      })
    );

    const { getByText, getByTestId, debug } = render(<TechListRedux />);

    debug();
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByTestId('tech-list')).toContainElement(getByText('ReactJS'));
  });
});
