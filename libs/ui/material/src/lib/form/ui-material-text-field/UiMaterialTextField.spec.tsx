import { render } from '@testing-library/react';

import UiMaterialTextField from './UiMaterialTextField';

describe('UiMaterialTextField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialTextField />);
    expect(baseElement).toBeTruthy();
  });
});
