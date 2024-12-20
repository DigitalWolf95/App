import { render } from '@testing-library/react';

import UiHelpersDragAndDrop from './UiHelpersDragAndDrop';

describe('UiHelpersDragAndDrop', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiHelpersDragAndDrop />);
    expect(baseElement).toBeTruthy();
  });
});
