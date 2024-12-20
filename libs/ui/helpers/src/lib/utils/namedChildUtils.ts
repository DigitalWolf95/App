import { ReactNode, Children, isValidElement, ReactElement } from 'react';

export function getNamedChild(children: ReactNode, name: string): ReactElement[] | undefined {
  const elements = Children.toArray(children)
    .filter((child) => {
      const isPrivileged = typeof child === 'string' || typeof child === 'number';
      if (!isValidElement(child) && !isPrivileged) return undefined;
      const childName = isPrivileged ? 'Default' : child.props?.['RNamedChild'] || child.props?.['name'] || 'Default';
      return childName === name;
    })
    .map((child) => {
      const isPrivileged = typeof child === 'string' || typeof child === 'number';
      return isPrivileged || !isValidElement(child) || !child.props['RNamedChild'] ? child : child.props.children;
    }) as ReactElement[];

  return elements.length > 0 ? elements : undefined;
}
