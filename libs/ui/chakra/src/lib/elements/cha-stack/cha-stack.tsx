import { Stack, StackProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ChatStackProps extends StackProps {
  children?: ReactNode;
}

export function ChaStack({ children, ...rest }: ChatStackProps) {
  return <Stack {...rest}>{children}</Stack>;
}
