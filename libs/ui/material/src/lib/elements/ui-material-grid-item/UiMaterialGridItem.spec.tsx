import { render } from '@testing-library/react';

import UiMaterialGridItem from './UiMaterialGridItem';

describe('UiMaterialGridItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialGridItem />);
    expect(baseElement).toBeTruthy();
  });
});
