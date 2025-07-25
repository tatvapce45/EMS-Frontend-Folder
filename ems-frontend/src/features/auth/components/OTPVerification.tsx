import React, { useState } from "react";
import { ArrowLeft, Shield } from "lucide-react";
import type { OTPVerificationProps, StepType, VerificationType } from "./types";
import { maskEmail, maskPhone, simulateApiCall, isValidOTP } from "./helpers";
import { useOTPTimer } from "./useOTPTimer";
import ProgressIndicator from "./ProgressIndicator";
import VerificationStep from "./VerificationStep";
import CompletionScreen from "./CompletionScreen";

const OTPVerification: React.FC<OTPVerificationProps> = ({
  onBack,
  onVerifySuccess,
  userEmail,
}) => {
  const [currentStep, setCurrentStep] = useState<StepType>("email");
  const [emailOtp, setEmailOtp] = useState(["", "", "", "", "", ""]);
  const [smsOtp, setSmsOtp] = useState(["", "", "", "", "", ""]);
  const [emailVerified, setEmailVerified] = useState(false);
  const [smsVerified, setSmsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Timer hooks
  const emailTimer = useOTPTimer();
  const smsTimer = useOTPTimer();

  const userPhone = "+1 (555) 123-4567"; // Mock phone number
  const maskedEmail = maskEmail(userEmail);
  const maskedPhone = maskPhone(userPhone);

  const handleOtpChange = (
    index: number,
    value: string,
    type: VerificationType
  ) => {
    const newOtp = type === "email" ? [...emailOtp] : [...smsOtp];
    newOtp[index] = value;

    if (type === "email") {
      setEmailOtp(newOtp);
    } else {
      setSmsOtp(newOtp);
    }

    setError("");
  };

  const resetOTP = (type: VerificationType) => {
    if (type === "email") {
      setEmailOtp(["", "", "", "", "", ""]);
    } else {
      setSmsOtp(["", "", "", "", "", ""]);
    }
  };

  const handleVerifyStep = async (type: VerificationType) => {
    setIsLoading(true);
    setError("");

    const otp = type === "email" ? emailOtp.join("") : smsOtp.join("");

    try {
      await simulateApiCall(1500);

      if (isValidOTP(otp)) {
        if (type === "email") {
          setEmailVerified(true);
          setCurrentStep("sms");
        } else {
          setSmsVerified(true);
          setCurrentStep("complete");
          setTimeout(() => onVerifySuccess(), 1500);
        }
      } else {
        setError("Invalid verification code. Please try again.");
        resetOTP(type);
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async (type: VerificationType) => {
    const timer = type === "email" ? emailTimer : smsTimer;
    timer.startTimer(30);
    resetOTP(type);
    setError("");

    // Simulate resend API call
    await simulateApiCall(1000);
  };

  if (currentStep === "complete") {
    return <CompletionScreen />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 transform hover:scale-[1.01] transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={onBack}
              className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-800 to-blue-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Two-Factor Authentication
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {currentStep === "email"
                ? "Step 1: Verify your email"
                : "Step 2: Verify your phone"}
            </p>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator
            currentStep={currentStep}
            emailVerified={emailVerified}
            smsVerified={smsVerified}
          />

          {/* Current Step Content */}
          <div className="mb-6">
            {currentStep === "email" ? (
              <VerificationStep
                type="email"
                otp={emailOtp}
                maskedContact={maskedEmail}
                isLoading={isLoading}
                error={error}
                canResend={emailTimer.canResend}
                timeLeft={emailTimer.timeLeft}
                onOTPChange={handleOtpChange}
                onVerify={() => handleVerifyStep("email")}
                onResend={() => handleResend("email")}
              />
            ) : (
              <VerificationStep
                type="sms"
                otp={smsOtp}
                maskedContact={maskedPhone}
                isLoading={isLoading}
                error={error}
                canResend={smsTimer.canResend}
                timeLeft={smsTimer.timeLeft}
                onOTPChange={handleOtpChange}
                onVerify={() => handleVerifyStep("sms")}
                onResend={() => handleResend("sms")}
              />
            )}
          </div>

          {error && (
            <div className="mb-4">
              <p className="text-red-500 text-sm text-center animate-pulse">
                {error}
              </p>
            </div>
          )}

          {/* Help Text */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200 text-sm text-center">
              💡 <strong>Demo:</strong> Use code{" "}
              <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                123456
              </code>{" "}
              for both verifications
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;