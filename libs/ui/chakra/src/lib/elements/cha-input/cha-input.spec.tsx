import { render } from '@testing-library/react';

import ChaInput from './cha-input';

describe('ChaInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChaInput />);
    expect(baseElement).toBeTruthy();
  });
});
