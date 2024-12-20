import { render } from '@testing-library/react';

import ChaAuthForm from './cha-auth-form';

describe('ChaAuthForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChaAuthForm />);
    expect(baseElement).toBeTruthy();
  });
});
