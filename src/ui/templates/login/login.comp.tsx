import logoFullImage from "../../../assets/logo-full.svg";
import arrowRightImage from "../../../assets/arrow-right.svg";
import "./login.styles.css";
import { useAuthRedirect } from "../../../hooks";
import { useForm } from "../../../resources";
import { z } from "zod";
import { login } from "../../../services";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../router";
import { FormEvent } from "react";
import { inputMask } from "../../../utils";

const loginSchema = z.object({
  cpf: z
    .string()
    .min(11, "CPF deve ter no mínimo 11 caracteres")
    .max(14, "CPF deve ter no máximo 14 caracteres"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

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
    loginSchema
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
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="login__title">Fazer Login</h1>
        <div className="login__form__container">
          <div className="login__input__container">
            <input
              id="cpf"
              className={classNames("login__input", errors.cpf && "error")}
              placeholder="Insira seu CPF"
              {...register("cpf")}
              onInput={handleCPFInput}
            />
            {errors.cpf && (
              <span className="login__error">{errors.cpf.message}</span>
            )}
          </div>

          <div className="login__input__container">
            <input
              id="password"
              className={classNames("login__input", errors.password && "error")}
              placeholder="Digite sua senha"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <span className="login__error">{errors.password.message}</span>
            )}
          </div>
        </div>
        <button className="login__button">
          Continuar
          <img src={arrowRightImage} />
        </button>
      </form>
    </main>
  );
}
