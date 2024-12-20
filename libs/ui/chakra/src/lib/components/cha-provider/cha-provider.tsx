import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface ChaProviderProps {
  children?: ReactNode;
}

export function ChaProvider({ children }: ChaProviderProps) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
