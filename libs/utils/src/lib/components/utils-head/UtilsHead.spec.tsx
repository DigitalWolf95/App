import { render } from '@testing-library/react';

import UtilsHead from './UtilsHead';

describe('UtilsHead', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UtilsHead />);
    expect(baseElement).toBeTruthy();
  });
});
