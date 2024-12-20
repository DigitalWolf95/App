import { render } from '@testing-library/react';

import UiMaterialGridBreak from './UiMaterialGridBreak';

describe('UiMaterialGridBreak', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialGridBreak />);
    expect(baseElement).toBeTruthy();
  });
});
