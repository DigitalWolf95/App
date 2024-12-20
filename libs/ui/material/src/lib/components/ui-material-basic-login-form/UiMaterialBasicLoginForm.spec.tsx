import { render } from '@testing-library/react';

import UiMaterialBasicLoginForm from './UiMaterialBasicLoginForm';

describe('UiMaterialBasicLoginForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialBasicLoginForm />);
    expect(baseElement).toBeTruthy();
  });
});
