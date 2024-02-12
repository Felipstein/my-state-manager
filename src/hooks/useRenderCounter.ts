import { useRef } from 'react';

export function useRenderCounter(componentName: string) {
  const counter = useRef(0);

  counter.current += 1;

  // eslint-disable-next-line no-console
  console.log(`${componentName} renderizou ${counter.current} vezes.`);
}
