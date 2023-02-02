import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { useAppForm } from "components/form";
import { useSignInMutation } from "store/user";

interface FormValues {
  login: string;
  password: string;
}

export const SignInPage: FC = () => {
  const [signIn] = useSignInMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values: FormValues) => {
    await signIn({
      login: values.login,
      password: values.password,
    });
    navigate("/");
  };

  const { Form, Controls } = useAppForm<FormValues>({
    handleSubmit,
  });

  return (
    <div>
      <h1>Вход</h1>
      <Form>
        <Controls.Text
          title="Логин"
          name="login"
          rules={{ required: "Поле бязательно" }}
        />
        <Controls.Text
          title="Пароль"
          name="password"
          rules={{ required: "Поле бязательно" }}
        />
        <Controls.SubmitButton>Войти</Controls.SubmitButton>
      </Form>
    </div>
  );
};
