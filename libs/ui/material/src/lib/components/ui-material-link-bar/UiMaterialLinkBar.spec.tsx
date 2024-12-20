import { render } from '@testing-library/react';

import UiMaterialLinkBar from './UiMaterialLinkBar';

describe('UiMaterialLinkBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialLinkBar />);
    expect(baseElement).toBeTruthy();
  });
});
