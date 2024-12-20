import { render } from '@testing-library/react';

import UiMaterialAvatar from './UiMaterialAvatar';

describe('UiMaterialAvatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialAvatar />);
    expect(baseElement).toBeTruthy();
  });
});
