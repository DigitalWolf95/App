import { render } from '@testing-library/react';

import UiMaterialBox from './UiMaterialBox';

describe('UiMaterialBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialBox />);
    expect(baseElement).toBeTruthy();
  });
});
