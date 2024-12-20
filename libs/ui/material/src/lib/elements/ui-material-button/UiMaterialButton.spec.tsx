import { render } from '@testing-library/react';

import UiMaterialButton from './UiMaterialButton';

describe('UiMaterialButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialButton />);
    expect(baseElement).toBeTruthy();
  });
});
