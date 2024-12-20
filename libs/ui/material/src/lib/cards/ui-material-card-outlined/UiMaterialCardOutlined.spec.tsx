import { render } from '@testing-library/react';

import UiMaterialCardOutlined from './UiMaterialCardOutlined';

describe('UiMaterialCardOutlined', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialCardOutlined />);
    expect(baseElement).toBeTruthy();
  });
});
