import { render } from '@testing-library/react';

import UiMaterialGridContainer from './UiMaterialGridContainer';

describe('UiMaterialGridContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialGridContainer />);
    expect(baseElement).toBeTruthy();
  });
});
