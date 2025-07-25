// import React, { useState, useEffect, useRef } from "react";
// import {
//   ArrowLeft,
//   Shield,
//   Mail,
//   Smartphone,
//   CheckCircle,
//   RefreshCw,
// } from "lucide-react";

// interface OTPVerificationProps {
//   onBack: () => void;
//   onVerifySuccess: () => void;
//   userEmail: string;
// }

// const OTPVerification: React.FC<OTPVerificationProps> = ({
//   onBack,
//   onVerifySuccess,
//   userEmail,
// }) => {
//   const [currentStep, setCurrentStep] = useState<"email" | "sms" | "complete">(
//     "email"
//   );
//   const [emailOtp, setEmailOtp] = useState(["", "", "", "", "", ""]);
//   const [smsOtp, setSmsOtp] = useState(["", "", "", "", "", ""]);
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [smsVerified, setSmsVerified] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Resend functionality
//   const [canResendEmail, setCanResendEmail] = useState(true);
//   const [canResendSms, setCanResendSms] = useState(true);
//   const [emailTimeLeft, setEmailTimeLeft] = useState(0);
//   const [smsTimeLeft, setSmsTimeLeft] = useState(0);

//   // Refs for input management
//   const emailInputRefs = useRef<(HTMLInputElement | null)[]>([]);
//   const smsInputRefs = useRef<(HTMLInputElement | null)[]>([]);

//   const userPhone = "+1 (555) 123-4567"; // Mock phone number

//   // Timer effects
//   useEffect(() => {
//     if (emailTimeLeft > 0) {
//       const timer = setTimeout(() => setEmailTimeLeft(emailTimeLeft - 1), 1000);
//       return () => clearTimeout(timer);
//     } else if (emailTimeLeft === 0 && !canResendEmail) {
//       setCanResendEmail(true);
//     }
//   }, [emailTimeLeft, canResendEmail]);

//   useEffect(() => {
//     if (smsTimeLeft > 0) {
//       const timer = setTimeout(() => setSmsTimeLeft(smsTimeLeft - 1), 1000);
//       return () => clearTimeout(timer);
//     } else if (smsTimeLeft === 0 && !canResendSms) {
//       setCanResendSms(true);
//     }
//   }, [smsTimeLeft, canResendSms]);

//   // Focus first input on mount
//   useEffect(() => {
//     setTimeout(() => emailInputRefs.current[0]?.focus(), 100);
//   }, []);

//   const handleOtpChange = (
//     index: number,
//     value: string,
//     type: "email" | "sms"
//   ) => {
//     if (!/^\d*$/.test(value)) return; // Only allow digits

//     const newOtp = type === "email" ? [...emailOtp] : [...smsOtp];
//     newOtp[index] = value;

//     if (type === "email") {
//       setEmailOtp(newOtp);
//     } else {
//       setSmsOtp(newOtp);
//     }

//     setError("");

//     // Auto-focus next input
//     if (value && index < 5) {
//       const inputRefs = type === "email" ? emailInputRefs : smsInputRefs;
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (
//     index: number,
//     e: React.KeyboardEvent,
//     type: "email" | "sms"
//   ) => {
//     const inputRefs = type === "email" ? emailInputRefs : smsInputRefs;

//     if (
//       e.key === "Backspace" &&
//       !(e.currentTarget as HTMLInputElement).value &&
//       index > 0
//     ) {
//       inputRefs.current[index - 1]?.focus();
//     }

//     if (e.key === "ArrowLeft" && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }

//     if (e.key === "ArrowRight" && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handlePaste = (e: React.ClipboardEvent, type: "email" | "sms") => {
//     e.preventDefault();
//     const pastedData = e.clipboardData
//       .getData("text")
//       .replace(/\D/g, "")
//       .slice(0, 6);

//     if (pastedData.length === 6) {
//       const newOtp = pastedData.split("");
//       if (type === "email") {
//         setEmailOtp(newOtp);
//       } else {
//         setSmsOtp(newOtp);
//       }
//       setError("");

//       // Focus last input
//       const inputRefs = type === "email" ? emailInputRefs : smsInputRefs;
//       inputRefs.current[5]?.focus();
//     }
//   };

//   const handleVerifyStep = async (type: "email" | "sms") => {
//     setIsLoading(true);
//     setError("");

//     const otp = type === "email" ? emailOtp.join("") : smsOtp.join("");

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       // Demo: Accept 123456 as valid code
//       if (otp === "123456") {
//         if (type === "email") {
//           setEmailVerified(true);
//           setCurrentStep("sms");
//           // Focus first SMS input
//           setTimeout(() => smsInputRefs.current[0]?.focus(), 100);
//         } else {
//           setSmsVerified(true);
//           setCurrentStep("complete");
//           // Both verifications complete
//           setTimeout(() => onVerifySuccess(), 1500);
//         }
//       } else {
//         setError("Invalid verification code. Please try again.");
//         if (type === "email") {
//           setEmailOtp(["", "", "", "", "", ""]);
//           emailInputRefs.current[0]?.focus();
//         } else {
//           setSmsOtp(["", "", "", "", "", ""]);
//           smsInputRefs.current[0]?.focus();
//         }
//       }
//     } catch (err) {
//       setError("Verification failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResend = async (type: "email" | "sms") => {
//     if (type === "email") {
//       setCanResendEmail(false);
//       setEmailTimeLeft(30);
//       setEmailOtp(["", "", "", "", "", ""]);
//     } else {
//       setCanResendSms(false);
//       setSmsTimeLeft(30);
//       setSmsOtp(["", "", "", "", "", ""]);
//     }

//     setError("");

//     // Simulate resend API call
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     const inputRefs = type === "email" ? emailInputRefs : smsInputRefs;
//     inputRefs.current[0]?.focus();
//   };

//   const maskedEmail = userEmail.replace(/(.{2})(.*)(@.*)/, "$1***$3");
//   const maskedPhone = userPhone.replace(
//     /(\+\d{1,2}\s?\(\d{3}\))(.*)(\d{4})/,
//     "$1 ***-$3"
//   );

//   const renderOTPInputs = (otp: string[], type: "email" | "sms") => {
//     const inputRefs = type === "email" ? emailInputRefs : smsInputRefs;

//     return (
//       <div className="flex justify-center space-x-3 mb-4">
//         {otp.map((digit, index) => (
//           <input
//             key={index}
//             ref={(el) => {
//               inputRefs.current[index] = el;
//             }}
//             type="text"
//             inputMode="numeric"
//             maxLength={1}
//             value={digit}
//             onChange={(e) => handleOtpChange(index, e.target.value, type)}
//             onKeyDown={(e) => handleKeyDown(index, e, type)}
//             onPaste={(e) => handlePaste(e, type)}
//             className={`w-9 h-9 sm:w-12 sm:h-12 text-center text-xl font-bold border-2 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 ${
//               error
//                 ? "border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-400"
//                 : "border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
//             } text-gray-900 dark:text-white`}
//             autoComplete="one-time-code"
//           />
//         ))}
//       </div>
//     );
//   };

//   if (currentStep === "complete") {
//     return (
//       <div className="w-full max-w-md">
//         <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 text-center">
//           <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg animate-pulse">
//             <CheckCircle className="w-10 h-10 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
//             Verification Complete!
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mb-2">
//             Both email and SMS verification successful
//           </p>
//           <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
//             <div className="flex items-center">
//               <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
//               Email verified
//             </div>
//             <div className="flex items-center">
//               <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
//               SMS verified
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900  px-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 transform hover:scale-[1.01] transition-all duration-300">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <button
//               onClick={onBack}
//               className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
//             </button>

//             <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-800 to-blue-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
//               <Shield className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
//               Two-Factor Authentication
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-2">
//               {currentStep === "email"
//                 ? "Step 1: Verify your email"
//                 : "Step 2: Verify your phone"}
//             </p>
//           </div>

//           {/* Progress Indicator */}
//           <div className="flex items-center justify-center mb-8">
//             <div className="flex items-center space-x-4">
//               <div
//                 className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
//                   emailVerified
//                     ? "bg-green-500 border-green-500 text-white"
//                     : currentStep === "email"
//                     ? "border-blue-500 text-blue-500 bg-blue-50 dark:bg-blue-900/20"
//                     : "border-gray-300 dark:border-gray-600 text-gray-400"
//                 }`}
//               >
//                 {emailVerified ? (
//                   <CheckCircle className="w-5 h-5" />
//                 ) : (
//                   <Mail className="w-5 h-5" />
//                 )}
//               </div>
//               <div
//                 className={`w-12 h-0.5 transition-all duration-300 ${
//                   emailVerified
//                     ? "bg-green-500"
//                     : "bg-gray-300 dark:bg-gray-600"
//                 }`}
//               ></div>
//               <div
//                 className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
//                   smsVerified
//                     ? "bg-green-500 border-green-500 text-white"
//                     : currentStep === "sms"
//                     ? "border-blue-500 text-blue-500 bg-blue-50 dark:bg-blue-900/20"
//                     : "border-gray-300 dark:border-gray-600 text-gray-400"
//                 }`}
//               >
//                 {smsVerified ? (
//                   <CheckCircle className="w-5 h-5" />
//                 ) : (
//                   <Smartphone className="w-5 h-5" />
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Current Step Content */}
//           <div className="mb-6">
//             {currentStep === "email" ? (
//               <>
//                 <div className="text-center mb-6">
//                   <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-4">
//                     <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
//                     <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
//                       Email Verification
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     Enter the 6-digit code sent to{" "}
//                     <span className="font-medium text-gray-800 dark:text-gray-200">
//                       {maskedEmail}
//                     </span>
//                   </p>
//                 </div>

//                 {renderOTPInputs(emailOtp, "email")}

//                 <button
//                   onClick={() => handleVerifyStep("email")}
//                   disabled={isLoading || emailOtp.join("").length !== 6}
//                   className="w-full bg-gradient-to-r from-blue-800 to-purple-800 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/25 disabled:cursor-not-allowed flex items-center justify-center mb-4"
//                 >
//                   {isLoading ? (
//                     <>
//                       <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
//                       Verifying Email...
//                     </>
//                   ) : (
//                     "Verify Email Code"
//                   )}
//                 </button>

//                 <div className="text-center">
//                   <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
//                     Didn't receive the email code?
//                   </p>
//                   {canResendEmail ? (
//                     <button
//                       onClick={() => handleResend("email")}
//                       className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium text-sm transition-colors"
//                     >
//                       Resend Email Code
//                     </button>
//                   ) : (
//                     <p className="text-gray-500 dark:text-gray-400 text-sm">
//                       Resend in {emailTimeLeft}s
//                     </p>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="text-center mb-6">
//                   <div className="inline-flex items-center px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full mb-4">
//                     <Smartphone className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
//                     <span className="text-sm font-medium text-green-600 dark:text-green-400">
//                       SMS Verification
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     Enter the 6-digit code sent to{" "}
//                     <span className="font-medium text-gray-800 dark:text-gray-200">
//                       {maskedPhone}
//                     </span>
//                   </p>
//                 </div>

//                 {renderOTPInputs(smsOtp, "sms")}

//                 <button
//                   onClick={() => handleVerifyStep("sms")}
//                   disabled={isLoading || smsOtp.join("").length !== 6}
//                   className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/25 disabled:cursor-not-allowed flex items-center justify-center mb-4"
//                 >
//                   {isLoading ? (
//                     <>
//                       <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
//                       Verifying SMS...
//                     </>
//                   ) : (
//                     "Complete Verification"
//                   )}
//                 </button>

//                 <div className="text-center">
//                   <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
//                     Didn't receive the SMS code?
//                   </p>
//                   {canResendSms ? (
//                     <button
//                       onClick={() => handleResend("sms")}
//                       className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium text-sm transition-colors"
//                     >
//                       Resend SMS Code
//                     </button>
//                   ) : (
//                     <p className="text-gray-500 dark:text-gray-400 text-sm">
//                       Resend in {smsTimeLeft}s
//                     </p>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>

//           {error && (
//             <div className="mb-4">
//               <p className="text-red-500 text-sm text-center animate-pulse">
//                 {error}
//               </p>
//             </div>
//           )}

//           {/* Help Text */}
//           <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
//             <p className="text-blue-800 dark:text-blue-200 text-sm text-center">
//               💡 <strong>Demo:</strong> Use code{" "}
//               <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
//                 123456
//               </code>{" "}
//               for both verifications
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OTPVerification;
