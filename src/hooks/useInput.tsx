"use client";

import { useMemo, useState } from "react";

type InputChangeType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type InputHookReturnType = {
  value: string;
  error: boolean;
  init: () => void;
  onChange: (e: InputChangeType) => void;
};

export default function useInput(initValue?: string, rule?: (value: string) => boolean): InputHookReturnType {
  const [value, setValue] = useState<string>(initValue || "");

  const error = useMemo(() => (rule ? !rule(value) : false), [value]);

  const onChange = (e: InputChangeType) => setValue(() => e.target.value);

  const init = () => setValue(initValue || "");

  return { value, onChange, init, error };
}
