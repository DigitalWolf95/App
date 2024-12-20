import { render } from '@testing-library/react';

import UiMaterialUploadImage from './UiMaterialUploadImage';

describe('UiMaterialUploadImage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialUploadImage />);
    expect(baseElement).toBeTruthy();
  });
});
