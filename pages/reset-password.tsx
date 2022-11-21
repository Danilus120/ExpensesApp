import ResetPasswordTemplate from "@/Templates/auth/ResetPasswordTemplate";

export default function login() {
  return (
    <ResetPasswordTemplate
      metaOptions={{ title: "Login", description: "Login Page" }}
    />
  );
}
