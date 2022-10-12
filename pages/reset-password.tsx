import ResetPasswordLayout from "@/Templates/auth/ResetPasswordTemplate";

// TODO: Handle Errors
export default function login() {
  return (
    <ResetPasswordLayout
      metaOptions={{ title: "Login", description: "Login Page" }}
    />
  );
}
