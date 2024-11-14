import { Button } from '../../shared';
import './private-layout.styles.css'
import logoFullImage from '../../../assets/logo-full.svg';

export type PrivateLayoutProps = {
  children: React.ReactNode;
}

export function PrivateLayout({children}: PrivateLayoutProps) {
  return (
    <main className="private__layout__container">
      <div className="menu__container">
        <div className="menu__container__content">
          <div className="menu__container__logo">
            <img src={logoFullImage} alt="Cora" title="Cora" />
          </div>
          <Button variant='outline__white'>Sair</Button>
        </div>
      </div>
      {children}
    </main>
  )
}
