import React from 'react';
import {render, screen} from '@testing-library/react-native';

import Hello from '../src/components/Hello';

describe('Hello', () => {
  it('renders the correct message', () => {
    render(<Hello />);
    expect(screen.getByText('Hello, world!')).toBeVisible();
  });
});
