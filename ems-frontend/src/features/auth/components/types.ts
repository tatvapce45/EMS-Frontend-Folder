export interface OTPVerificationProps {
    onBack: () => void;
    onVerifySuccess: () => void;
    userEmail: string;
  }
  
  export type StepType = "email" | "sms" | "complete";
  export type VerificationType = "email" | "sms";