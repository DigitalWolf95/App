import { render } from '@testing-library/react';

import UiMaterialUploadFile from './UiMaterialUploadFile';

describe('UiMaterialUploadFile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialUploadFile />);
    expect(baseElement).toBeTruthy();
  });
});
