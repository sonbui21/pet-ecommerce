import { useCallback, useState } from "react";

type StateType = [boolean, () => void, () => void, () => void] & {
  state: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useToggleState = (initial = false): StateType => {
  const [state, setState] = useState<boolean>(initial);

  const open = useCallback(() => setState(true), []);
  const close = useCallback(() => setState(false), []);
  const toggle = useCallback(() => setState((prev) => !prev), []);

  const tuple = [state, open, close, toggle] as [boolean, () => void, () => void, () => void];
  return Object.assign(tuple, { state, open, close, toggle });
};
