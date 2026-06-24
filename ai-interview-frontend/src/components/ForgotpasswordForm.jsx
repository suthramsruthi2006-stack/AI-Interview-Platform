import { useState } from "react";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div>
      <h2>Reset Password</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleReset}>
        Send Reset Link
      </button>
    </div>
  );
}

export default ForgotPasswordForm;