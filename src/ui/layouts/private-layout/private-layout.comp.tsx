import { removeToken } from '../../../services';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../router';
import { Button, PrivateLayout as PrivateLayoutCoraUI } from '@jsaints-dev/cora-ui';
import { PrivateLayoutProps } from './private-layout.types';

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
    <PrivateLayoutCoraUI
      actions={(
        <Button onClick={handleLogout} className="bg-transparent border hover:bg-transparent">
          Logout
        </Button>
      )}
      onLogoClick={handleNavigateToHome}
    >
      {children}
    </PrivateLayoutCoraUI>
  )
}
