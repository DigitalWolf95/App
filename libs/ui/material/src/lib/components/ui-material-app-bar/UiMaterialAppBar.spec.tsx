import { render } from '@testing-library/react';

import UiMaterialAppBar from './UiMaterialAppBar';

describe('UiMaterialAppBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialAppBar />);
    expect(baseElement).toBeTruthy();
  });
});
