import { render } from '@testing-library/react';

import ChaFlex from './cha-flex';

describe('ChaFlex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChaFlex />);
    expect(baseElement).toBeTruthy();
  });
});
