import { FC } from "react";

import { useSignUpMutation } from "store/user";
import { NavLink, useNavigate } from "react-router-dom";
import { Path } from "global-constants";
import { useAppForm } from "components/form";

interface FormValues {
  login: string;
  password: string;
  name: string;
}

export const SignUpPage: FC = () => {
  const [signUp] = useSignUpMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values: FormValues) => {
    await signUp({
      login: values.login,
      password: values.password,
      name: values.name,
    });
    navigate(`/${Path.SIGN_IN}`);
  };

  const { Form, Controls } = useAppForm<FormValues>({
    handleSubmit,
  });

  return (
    <div>
      <h1>Регистрация</h1>
      <NavLink to={`/${Path.SIGN_IN}`} style={{ textDecoration: "none" }}>
        Войти
      </NavLink>
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
        <Controls.Text
          title="Имя"
          name="name"
          rules={{ required: "Поле бязательно" }}
        />
        <Controls.SubmitButton>Зарегестрироваться</Controls.SubmitButton>
      </Form>
    </div>
  );
};
