import { render } from '@testing-library/react';

import UiMaterialForm from './UiMaterialForm';

describe('UiMaterialForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialForm />);
    expect(baseElement).toBeTruthy();
  });
});
