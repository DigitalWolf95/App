import { render } from '@testing-library/react';

import UiMaterialGridSwitch from './UiMaterialGridSwitch';

describe('UiMaterialGridSwitch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialGridSwitch />);
    expect(baseElement).toBeTruthy();
  });
});
