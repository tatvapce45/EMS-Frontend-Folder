// import { useLocation, useNavigate } from 'react-router-dom';
// import OTPVerification from './OTPVerification';
// import { useEffect } from 'react';

// const OTPWrapper = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const state = location.state as {
//     userEmail?: string;
//     loginVerified?: boolean;
//   };

//   const userEmail = state?.userEmail || sessionStorage.getItem("userEmail");
//   const loginVerified = state?.loginVerified || sessionStorage.getItem("loginVerified") === "true";

//   useEffect(() => {
//     // Redirect if user tries to access without proper verification
//     if (!userEmail || !loginVerified) {
//       navigate("/", { replace: true });
//     }
//   }, [userEmail, loginVerified, navigate]);

//   if (!userEmail || !loginVerified) return null;

//   return (
//     <OTPVerification
//       userEmail={userEmail}
//       onBack={() => navigate(-1)}
//       onVerifySuccess={() => {
//         sessionStorage.removeItem("loginVerified"); // clear after success
//         navigate("/dashboard");
//       }}
//     />
//   );
// };

// export default OTPWrapper;
