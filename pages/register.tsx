import RegisterTemplate from "@/Templates/auth/RegisterTemplate";

// TODO: Handle Errors
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
