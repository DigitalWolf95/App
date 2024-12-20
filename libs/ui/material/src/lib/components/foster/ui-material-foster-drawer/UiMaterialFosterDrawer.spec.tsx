import { render } from '@testing-library/react';

import UiMaterialFosterDrawer from './UiMaterialFosterDrawer';

describe('UiMaterialFosterDrawer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialFosterDrawer />);
    expect(baseElement).toBeTruthy();
  });
});
