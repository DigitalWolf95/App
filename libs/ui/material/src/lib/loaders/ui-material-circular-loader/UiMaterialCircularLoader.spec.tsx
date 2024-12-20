import { render } from '@testing-library/react';

import UiMaterialCircularLoader from './UiMaterialCircularLoader';

describe('UiMaterialCircularLoader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialCircularLoader />);
    expect(baseElement).toBeTruthy();
  });
});
