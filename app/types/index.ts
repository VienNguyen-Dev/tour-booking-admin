interface CustomButtonProps {
  title: string;
  otherStyles?: string;
  isLoading?: boolean;
}

interface CreateNewAccountParams {
  email: string;
  password: string;
  username?: string;
}

interface SignInParams {
  email: string;
  password: string;
  remember?: boolean;
}

interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

interface HeaderProps {
  title: string;
  subtitle: string;
}

interface AuthHeaderProps {
  title?: string;
  subtitle: string;
}
