import { render } from '@testing-library/react';

import UiMaterialCardInput from './UiMaterialCardInput';

describe('UiMaterialCardInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialCardInput />);
    expect(baseElement).toBeTruthy();
  });
});
