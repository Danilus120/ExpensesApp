import router from "next/router";
import Form from "@/Molecules/Form";
import Button from "@/Atoms/Button";
import Input from "@/Atoms/Input";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "config/firebase.config";
import { forgotPasswordSchema } from "@/constants/validationSchema";

export default function ResetPassword() {
  const forgotPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);

    router.push("/login");
  };

  return (
    <Form
      onSubmit={(data) => {
        forgotPassword(data);
      }}
      schema={forgotPasswordSchema}
      options={{ haveButtons: false }}
    >
      <Input label="Email Address" name="email" type="email" />

      <Button type="submit" variant="contained" align="center" fullWidth>
        <span>Register</span>
      </Button>
    </Form>
  );
}
