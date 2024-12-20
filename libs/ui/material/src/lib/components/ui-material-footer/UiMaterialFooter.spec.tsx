import { render } from '@testing-library/react';

import UiMaterialFooter from './UiMaterialFooter';

describe('UiMaterialFooter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialFooter />);
    expect(baseElement).toBeTruthy();
  });
});
