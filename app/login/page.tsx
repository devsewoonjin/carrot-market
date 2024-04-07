import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function LogIn() {
  const handleForm = async (formData: FormData) => {
    "use server";
    console.log(formData.get("email"), formData.get("password"));
    console.log("i run in the server baby");
  };
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={handleForm} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="text"
          placeholder="Email"
          required
          errors={[]}
        />

        <FormInput
          name="password"
          type="password"
          placeholder=" Password"
          required
          errors={[]}
        />
        <FormButton className="h-10">Log in</FormButton>
      </form>
      <SocialLogin />
    </div>
  );
}
