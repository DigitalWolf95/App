import { render } from '@testing-library/react';

import UiMaterialCardDescription from './UiMaterialCardDescription';

describe('UiMaterialCardDescription', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialCardDescription />);
    expect(baseElement).toBeTruthy();
  });
});
