import { render } from '@testing-library/react';
import ChaProvider from './cha-provider';

describe('ChaProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChaProvider />);
    expect(baseElement).toBeTruthy();
  });
});
