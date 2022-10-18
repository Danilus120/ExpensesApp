import LoginTemplate from "@/Templates/auth/LoginTemplate";

export default function login() {
  return (
    <LoginTemplate
      metaOptions={{ title: "Login", description: "Login Page" }}
    />
  );
}
