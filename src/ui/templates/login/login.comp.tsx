import logoFullImage from "../../../assets/logo-full.svg";
import arrowRightImage from "../../../assets/arrow-right.svg";
import { useAuthRedirect } from "../../../hooks";
import { useForm } from "../../../resources";
import { login } from "../../../services";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../router";
import { FormEvent } from "react";
import { inputMask } from "../../../utils";
import { Input } from "../../shared";
import "./login.styles.css";
import { validations } from "./login.validations";
import { LoginFormValues } from "./login.types";

export function LoginTemplate() {
  useAuthRedirect();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>(
    {
      cpf: "",
      password: "",
    },
    validations.loginSchema
  );

  async function onSubmit(data: LoginFormValues) {
    try {
      await login({
        ...data,
        cpf: data.cpf.replace(/\D/g, ""),
      });
      reset();
      navigate(routes.IBANKING);
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  function handleCPFInput(event: FormEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    input.value = inputMask.cpf(input.value);
  }

  return (
    <main className="login__container">
      <img src={logoFullImage} alt="Cora" title="Cora" />
      <form className="login__form__container" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="login__title">Fazer Login</h1>
        <div className="login__inputs__container">
          <Input
            {...register("cpf")}
            onInput={handleCPFInput}
            placeholder="Insira seu CPF"
            error={errors.cpf?.message}
          />

          <Input
            {...register("password")}
            type="password"
            placeholder="Insira sua senha"
            error={errors.password?.message}
          />
        </div>
        <button className="login__button">
          Continuar
          <img src={arrowRightImage} />
        </button>
      </form>
    </main>
  );
}
