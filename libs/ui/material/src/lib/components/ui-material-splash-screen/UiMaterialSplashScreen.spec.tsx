import { render } from '@testing-library/react';

import UiMaterialSplashScreen from './UiMaterialSplashScreen';

describe('UiMaterialSplashScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiMaterialSplashScreen />);
    expect(baseElement).toBeTruthy();
  });
});
