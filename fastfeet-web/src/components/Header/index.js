import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '~/assets/fastfeet-logo.png';
import { Container, Content, Profile, Navigation } from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <Navigation>
            <NavLink to="/packages">ENCOMENDAS</NavLink>
            <NavLink to="/deliverers">ENTREGADORES</NavLink>
            <NavLink to="/recipients">DESTINATÁRIOS</NavLink>
            <NavLink to="/problems">PROBLEMAS</NavLink>
          </Navigation>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="button" onClick={handleSignOut}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
