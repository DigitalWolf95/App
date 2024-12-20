import { render } from '@testing-library/react';

import UtilsLayout from './UtilsLayout';

describe('UtilsLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UtilsLayout />);
    expect(baseElement).toBeTruthy();
  });
});
