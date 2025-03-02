import {
  AlertCircle,
  Award,
  Download,
  Lightbulb,
  type LucideIcon,
  type LucideProps
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  // Icons used in budget-variance.tsx
  download: Download,
  lightbulb: Lightbulb,
  alertCircle: AlertCircle,
  award: Award,
  
  // Feel free to add more icons as needed for the application
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
      <path d="M7 15v-6" />
      <path d="M11 15v-4" />
      <path d="M15 15v-2" />
      <path d="M19 7l-3 2l3 2" />
    </svg>
  ),
  
  spinner: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
};
