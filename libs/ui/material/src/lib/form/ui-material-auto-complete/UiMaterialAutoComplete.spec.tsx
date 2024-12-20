import { render } from '@testing-library/react';

import UiMaterialAutoComplete from './UiMaterialAutoComplete';

describe('UiMaterialAutoComplete', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialAutoComplete />);
    expect(baseElement).toBeTruthy();
  });
});
