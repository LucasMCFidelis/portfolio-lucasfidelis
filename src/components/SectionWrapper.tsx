import { ReactNode } from "react";
import { twMerge } from 'tailwind-merge'

interface SectionWrapperProps {
children: ReactNode
className?: string
id?: string
}
export default function SectionWrapper({children, className, id}: SectionWrapperProps) {
  return (
    <section id={id} className={twMerge("w-full min-h-[45vh] flex flex-col items-start justify-center gap-8", className)}>
      {children}
    </section>
  );
}
