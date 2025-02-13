import { Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { getDefaultValue } from '@digital-wolf/fns';

export interface ChaFlexProps extends FlexProps {
  fullScreen?: boolean;
  children?: ReactNode;
}

export function ChaFlex({ children, fullScreen, height, width, ...rest }: ChaFlexProps): ReactNode {
  const defaultHeight = getDefaultValue(height, '100vh', { condition: fullScreen });
  const defaultWidth = getDefaultValue(width, '100vw', { condition: fullScreen });

  return (
    <Flex height={defaultHeight} width={defaultWidth} {...rest}>
      {children}
    </Flex>
  );
}
