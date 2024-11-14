import './private-layout.styles.css'
import logoFullImage from '../../../assets/logo-full.svg';
import { removeToken } from '../../../services';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../router';
import { Button } from '@jsaints-dev/cora-ui';

export type PrivateLayoutProps = {
  children: React.ReactNode;
}

export function PrivateLayout({children}: PrivateLayoutProps) {
  const navigate = useNavigate();

  function handleLogout() {
    removeToken();
    navigate(routes.LOGIN);
  }

  function handleNavigateToHome() {
    navigate(routes.HOME);
  }

  return (
    <main className="private__layout__container">
      <div className="menu__container">
        <div className="menu__container__content">
          <div className="menu__container__logo" onClick={handleNavigateToHome}>
            <img src={logoFullImage} alt="Cora" title="Cora" />
          </div>
          <Button onClick={handleLogout} variant='cora-outline'>Logout</Button>
        </div>
      </div>
      {children}
    </main>
  )
}
