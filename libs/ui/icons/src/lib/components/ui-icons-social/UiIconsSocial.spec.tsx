import { render } from '@testing-library/react';

import UiIconsSocial from './UiIconsSocial';

describe('UiIconsSocial', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiIconsSocial />);
    expect(baseElement).toBeTruthy();
  });
});
