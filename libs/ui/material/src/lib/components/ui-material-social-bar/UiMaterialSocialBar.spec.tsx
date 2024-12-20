import { render } from '@testing-library/react';

import UiMaterialSocialBar from './UiMaterialSocialBar';

describe('UiMaterialSocialBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialSocialBar />);
    expect(baseElement).toBeTruthy();
  });
});
