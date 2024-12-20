import { render } from '@testing-library/react';

import UiMaterialGridInput from './UiMaterialGridInput';

describe('UiMaterialGridInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialGridInput />);
    expect(baseElement).toBeTruthy();
  });
});
