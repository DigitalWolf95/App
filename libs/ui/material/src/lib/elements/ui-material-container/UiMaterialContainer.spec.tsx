import { render } from '@testing-library/react';

import UiMaterialContainer from './UiMaterialContainer';

describe('UiMaterialContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialContainer />);
    expect(baseElement).toBeTruthy();
  });
});
