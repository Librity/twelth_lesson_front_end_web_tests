import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import TechList from '~/components/TechList';

describe('TechList component', () => {
  // test should never include an external API, like localStorage. We use Mocks.
  beforeEach(() => {
    localStorage.clear();
  });

  it('should be able to add new a tech', () => {
    const { getByText, getByTestId, getByLabelText, debug } = render(
      <TechList />
    );

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
    fireEvent.submit(getByTestId('tech-form'));
    // debug();

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByLabelText('Tech')).toHaveValue('');
  });

  it('should store techs in storage', () => {
    let { getByText, getByTestId, getByLabelText } = render(<TechList />);

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
    fireEvent.submit(getByTestId('tech-form'));

    cleanup();

    ({ getByText, getByTestId, getByLabelText } = render(<TechList />));

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'techs',
      JSON.stringify(['Node.js'])
    );
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
  });
});
