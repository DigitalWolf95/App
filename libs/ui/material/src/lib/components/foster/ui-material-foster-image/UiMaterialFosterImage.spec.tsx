import { render } from '@testing-library/react';

import UiMaterialFosterImage from './UiMaterialFosterImage';

describe('UiMaterialFosterImage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialFosterImage />);
    expect(baseElement).toBeTruthy();
  });
});
