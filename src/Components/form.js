import React, { useState } from "react";
import "./SignUpform.css";

// Hook for email and University ID validation
const useEmailValidation = () => {
  // State variables for email validation
  const [emailError, setEmailError] = useState("");

  // State variables for University ID validation
  const [universityIdError, setUniversityIdError] = useState("");

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  // Function to validate University ID format
  const validateUniversityId = (universityId) => {
    const universityIdRegex =
      /^[Ss][Cc]|[Mm][Ff]|[Mm][Dd]|[Ee][Gg]\/\d{4}\/\d{5}$/;

    if (!universityIdRegex.test(universityId)) {
      setUniversityIdError("Invalid University ID format");
      return false; // University ID is invalid
    } else {
      setUniversityIdError("");
      return true; // University ID is valid
    }
  };

  // Function to reset email error
  const resetEmailError = () => {
    setEmailError("");
  };

  // Function to reset University ID error
  const resetUniversityIdError = () => {
    setUniversityIdError("");
  };

  // Return validation functions and error messages
  return {
    validateEmail,
    emailError,
    resetEmailError,
    validateUniversityId,
    universityIdError,
    resetUniversityIdError,
  };
};

// Component for password validation
const PasswordValidator = ({ password, confirmPassword }) => {
  // Function to validate password
  const validatePassword = () => {
    let error = {};
    const minLength = 8;
    const password_pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;

    if (!password) {
      return "Password cannot be empty";
    } else if (!password_pattern.test(password)) {
      error.password = "Password not valid";
    } else if (password !== confirmPassword) {
      return "Passwords do not match";
    } else if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long`;
    } else {
      return "";
    }
  };

  // Get password error message
  const passwordError = validatePassword();

  // Display password error if it exists
  return (
    <>
      {passwordError && (
        <p style={{ color: "red", fontSize: "10px" }}>{passwordError}</p>
      )}
    </>
  );
};

// Main form component
const Form = ({ switchForm }) => {
  // State variables for form fields and errors
  const [userType, setUserType] = useState("Guest");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [Uid, setUid] = useState("");
  const [Uemail, setUemail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [requiredFieldError, setRequiredFieldError] = useState("");

  // Use email validation hook
  const {
    validateEmail,
    emailError,
    resetEmailError,
    validateUniversityId,
    universityIdError,
    resetUniversityIdError,
  } = useEmailValidation();

  // Event handlers for form fields
  const handleFnameChange = (event) => {
    setFname(event.target.value);
  };

  const handleLnameChange = (event) => {
    setLname(event.target.value);
  };

  const handleUidChange = (event) => {
    setUid(event.target.value);
  };

  const handleUemailChange = (event) => {
    setUemail(event.target.value);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  // Form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    validateEmail(email);
    validateUniversityId(Uid);

    if (!Fname || !Lname || !Uemail || !password || !confirmpassword) {
      setRequiredFieldError("All fields are required");
      return;
    }
    const isUniversityIdValid = validateUniversityId(Uid);

    if (!isUniversityIdValid) {
      return; // Do not proceed with form submission
    }

    // Check if passwords match
    if (password !== confirmpassword) {
      setRequiredFieldError("Passwords do not match");
      return;
    }

    // Additional logic for form submission if needed

    // Log submitted data
    console.log("Submitted data:", {
      UserType: userType,
      FirstName: Fname,
      lastName: Lname,
      UniversityId: Uid,
      UniversityEmail: Uemail,
      PersonalEmail: email,
      Password: password,
      confPassword: confirmpassword,
    });

    // Clear form and errors
    handleClear();
  };

  // Clear form and errors
  const handleClear = () => {
    setFname("");
    setLname("");
    setUid("");
    setUemail("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRequiredFieldError("");
    resetEmailError();
    resetUniversityIdError();
  };

  // JSX for the form
  return (
    <div className="register-form">
      <h2 className="signup-topic">Sign Up</h2>
      <form id="form01" className="signupform01" onSubmit={handleSubmit}>
        {/* User Type */}
        <label className="label-names">User Type:</label>
        <select
          value={userType}
          onChange={handleUserTypeChange}
          className="U-type-selector"
          name="u-type"
        >
          <option value="Guest">Guest</option>
          <option value="University User">University User</option>
        </select>

        {/* First Name */}
        <label className="label-names">First Name:</label>
        <input
          type="text"
          value={Fname}
          placeholder="First Name"
          onChange={handleFnameChange}
          required
          className="inputFields"
        />

        {/* Last Name */}
        <label className="label-names">Last Name:</label>
        <input
          type="text"
          value={Lname}
          placeholder="Last Name"
          onChange={handleLnameChange}
          required
          className="inputFields"
        />

        {/* University User fields */}
        {userType === "University User" && (
          <>
            <div className="University Users">
              <label className="label-names">University ID:</label>
              <input
                type="text"
                value={Uid}
                placeholder="University ID"
                onChange={handleUidChange}
                required
                className="inputFields"
              />
              {/* Display University ID error if exists */}
              {universityIdError && (
                <p style={{ color: "red", fontSize: "10px" }}>
                  {universityIdError}
                </p>
              )}

              <label className="label-names">University Email:</label>
              <input
                type="email"
                value={Uemail}
                placeholder="University Email"
                onChange={handleUemailChange}
                required
                className="inputFields"
              />
            </div>
          </>
        )}

        {/* Personal Email */}
        <label className="label-names">Personal Email:</label>
        <input
          type="email"
          value={email}
          placeholder="Email..."
          onChange={handleEmailChange}
          required
          className="inputFields"
        />
        {/* Display email error if exists */}
        {emailError && (
          <p style={{ color: "red", fontSize: "10px" }}>{emailError}</p>
        )}

        {/* Password */}
        <label className="label-names">Password:</label>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={handlePasswordChange}
          required
          className="inputFields"
        />
        {/* Password validation component */}
        <PasswordValidator
          password={password}
          confirmPassword={confirmpassword}
        />

        {/* Confirm Password */}
        <label className="label-names">Confirm Password:</label>
        <input
          type="password"
          value={confirmpassword}
          placeholder="Confirm password"
          onChange={handleConfirmPasswordChange}
          required
          className="inputFields"
        />
        {/* Display required field error if exists */}
        {requiredFieldError && (
          <p style={{ color: "red", fontSize: "10px" }}>{requiredFieldError}</p>
        )}

        {/* Form submission buttons */}
        <button className="submitBtn" type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <button className="clearBtn" type="reset" onClick={handleClear}>
          Clear
        </button>

        <p className="already-account">
          Already have an Account?
          <span className="login-link" onClick={switchForm}>
            Click here to Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Form;
