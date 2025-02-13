import { render } from '@testing-library/react';

import ChaStack from './cha-stack';

describe('ChaStack', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChaStack />);
    expect(baseElement).toBeTruthy();
  });
});
