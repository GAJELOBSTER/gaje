"use client";

// Next
import { I18nLocaleType } from "@/i18n/i18nConfig";

// Hooks
import useLocale from "@/hooks/useLocale";

export default function LocaleSelect({ className }: { className?: string }) {
  const locale = useLocale();
  return (
    <select
      className={`${className} typo-body2-m cursor-pointer rounded-2 p-1 text-neutral-400 outline outline-1 outline-neutral-200`}
      value={locale.value}
      name="locale"
      onChange={(e) => locale.onChange(e.target.value as I18nLocaleType)}
    >
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  );
}
