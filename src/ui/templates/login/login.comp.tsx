import logoFullImage from "../../../assets/logo-full.svg";
import arrowRightImage from "../../../assets/arrow-right.svg";
import "./login.styles.css";

export function LoginTemplate() {
  return (
    <main className="login__container">
      <img src={logoFullImage} alt="Cora" title="Cora" />
      <form className="login__form">
        <h1 className="login__title">Fazer Login</h1>
        <div className="wrapper__login__input">
          <input
            id="cpf"
            className="login__input"
            placeholder="Insira seu CPF"
          />
          <input
            id="password"
            className="login__input"
            placeholder="Digite sua senha"
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
