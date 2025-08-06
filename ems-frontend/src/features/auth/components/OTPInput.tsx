import React, { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import type { VerificationType } from "./types";
import { isValidDigit } from "./helpers";

interface OTPInputProps {
  otp: string[];
  type: VerificationType;
  error: string;
  onChange: (index: number, value: string, type: VerificationType) => void;
  onComplete?: () => void;
}

interface OTPInputRef {
  focusFirstEmpty: () => void;
}

const OTPInput = forwardRef<OTPInputRef, OTPInputProps>(({
  otp,
  type,
  error,
  onChange,
  onComplete,
}, ref) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  },[type]);

  const handleChange = (index: number, value: string) => {
    if (!isValidDigit(value)) return;

    onChange(index, value, type);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (value && index === 5 && onComplete) {
      const newOtp = [...otp];
      newOtp[index] = value;
      if (newOtp.every(digit => digit !== "")) {
        onComplete();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (
      e.key === "Backspace" &&
      !(e.currentTarget as HTMLInputElement).value &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (pastedData.length === 6) {
      const newOtp = pastedData.split("");
      newOtp.forEach((digit, index) => {
        onChange(index, digit, type);
      });

      // Focus last input
      inputRefs.current[5]?.focus();
    }
  };

  const focusFirstEmpty = () => {
    const emptyIndex = otp.findIndex(digit => digit === "");
    const targetIndex = emptyIndex === -1 ? 0 : emptyIndex;
    inputRefs.current[targetIndex]?.focus();
  };

  // Expose focus method for parent component
  useImperativeHandle(ref, () => ({
    focusFirstEmpty,
  }), [otp]);

  return (
    <div className="flex justify-center space-x-3 mb-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={`w-9 h-9 sm:w-12 sm:h-12 text-center text-xl font-bold border-2 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 ${
            error
              ? "border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-400"
              : "border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
          } text-gray-900 dark:text-white`}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
});

OTPInput.displayName = 'OTPInput';

export default OTPInput;