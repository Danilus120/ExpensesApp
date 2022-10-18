import RegisterTemplate from "@/Templates/auth/RegisterTemplate";

export default function register() {
  return (
    <RegisterTemplate
      metaOptions={{
        title: "Register",
        description: "Register Page",
      }}
    />
  );
}
