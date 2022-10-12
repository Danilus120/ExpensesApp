import LoginTemplate from "@/Templates/auth/LoginTemplate";

// TODO: Handle Errors
export default function login() {
  return (
    <LoginTemplate
      metaOptions={{ title: "Login", description: "Login Page" }}
    />
  );
}
