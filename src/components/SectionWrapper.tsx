import { ReactNode } from "react";
import { twMerge } from 'tailwind-merge'

interface SectionWrapperProps {
children: ReactNode
className?: string
}
export default function SectionWrapper({children, className}: SectionWrapperProps) {
  return (
    <section className={twMerge("w-full flex flex-col items-start gap-8", className)}>
      {children}
    </section>
  );
}
