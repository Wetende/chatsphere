import { useEffect } from 'react';

export default function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
      };
    },
    [ref, handler]
  );
}

