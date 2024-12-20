import { render } from '@testing-library/react';

import UiMaterialText from './UiMaterialText';

describe('UiMaterialText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialText />);
    expect(baseElement).toBeTruthy();
  });
});
