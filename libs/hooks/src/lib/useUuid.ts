'use client';

import { useState } from 'react';
import { v4 } from 'uuid';

export function useUuid({ primaryValue }: { primaryValue?: string } = {}) {
  const [uuid, setUuid] = useState(primaryValue || v4());

  function resetUuid() {
    setUuid(v4());
  }

  return { uuid, resetUuid };
}
