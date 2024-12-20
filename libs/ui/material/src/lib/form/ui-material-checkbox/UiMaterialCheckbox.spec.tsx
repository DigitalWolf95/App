import { render } from '@testing-library/react';

import UiMaterialCheckbox from './UiMaterialCheckbox';

describe('UiMaterialCheckbox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialCheckbox />);
    expect(baseElement).toBeTruthy();
  });
});
