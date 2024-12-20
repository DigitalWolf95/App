import { ReactNode } from 'react';
import { getNamedChild } from '../utils/namedChildUtils';

export function useNamedChildren<T extends string>(children?: ReactNode & { name?: T }): { [K in T]: ReactNode } {
  const names = (() => {
    if (Array.isArray(children)) return children.map((ch) => ch['data-name'] ?? ch['name'] ?? ch.props?.['data-name'] ?? ch.props?.['name'] ?? 'Default');
    if ((typeof children === 'object' || typeof children === 'function') && children !== null) {
      const nodes = children as { name?: string; props?: { 'data-name': string; name: string } };
      return [nodes.name || nodes.props?.['data-name'] || nodes.props?.['name'] || 'Default'];
    }
    return ['Default'];
  })();

  // console.log('dawdawd => ', children, names);

  return names.reduce((acc, name) => ({ ...acc, [name]: getNamedChild(children, name) }), {}) as { [k in T]: ReactNode };
}
