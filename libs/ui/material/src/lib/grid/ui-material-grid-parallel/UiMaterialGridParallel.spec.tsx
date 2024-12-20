import { render } from '@testing-library/react';

import UiMaterialGridParallel from './UiMaterialGridParallel';

describe('UiMaterialGridParallel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialGridParallel />);
    expect(baseElement).toBeTruthy();
  });
});
