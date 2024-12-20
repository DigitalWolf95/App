import { render } from '@testing-library/react';

import UiMaterialTextHeading from './UiMaterialTextHeading';

describe('UiMaterialTextHeading', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialTextHeading />);
    expect(baseElement).toBeTruthy();
  });
});
