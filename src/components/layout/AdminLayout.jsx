import { Gamepad2, Plus, X } from 'lucide-react';
import styled from 'styled-components';
import { apiUrl } from '../../API/client';

export function AdminLayout({ navigation, activeSection, onNavigate, title, action, notice, onDismiss, children }) {
  return (
    <Page>
      <Sidebar>
        <Brand>
          <Gamepad2 size={24} />
           GAMING<span>ABM</span>
        </Brand>

        <Nav>{navigation.map(({ key, icon: Icon, label }) => 
          <NavItem key={key} $active={activeSection === key} onClick={() => onNavigate(key)}><Icon size={18} />{label}</NavItem>)}
        </Nav>

        <SidebarFooter>Panel de administración<br />
          <small>API: {apiUrl || 'no configurada'}</small>
        </SidebarFooter>
      </Sidebar>

      <Main>
        {notice && <Notice onClick={onDismiss}>
          {notice} <X size={16} />
          </Notice>}
        <Header>
          <div><Eyebrow>TIENDA GAMING</Eyebrow><h1>{title}</h1></div>
          {action && <HeaderAction onClick={action.onClick}>
            <Plus size={18} />{action.label}
            </HeaderAction>}
        </Header>

        {children}
        
      </Main>
    </Page>
  );
}

const Page = styled.div`display:flex; min-height:100vh;`;
const Sidebar = styled.aside`width:240px; padding:28px 18px; border-right:1px solid ${({ theme }) => theme.colors.border}; display:flex; flex-direction:column;`;
const Brand = styled.div`font-weight:800; letter-spacing:.08em; display:flex; align-items:center; gap:10px; color:${({ theme }) => theme.colors.text}; span{color:${({ theme }) => theme.colors.secondary};}`;
const Nav = styled.nav`margin-top:52px; display:grid; gap:8px;`;
const NavItem = styled.button`display:flex; align-items:center; gap:12px; padding:12px; border:0; border-radius:10px; text-align:left; color:${({ $active, theme }) => $active ? theme.colors.text : theme.colors.muted}; background:${({ $active, theme }) => $active ? theme.colors.surfaceMuted : 'transparent'}; cursor:pointer;`;
const SidebarFooter = styled.div`margin-top:auto; color:${({ theme }) => theme.colors.muted}; font-size:12px; line-height:1.7; overflow-wrap:anywhere;`;
const Main = styled.main`max-width:1240px; width:100%; padding:42px 52px; margin:0 auto;`;
const Header = styled.header`display:flex; justify-content:space-between; align-items:center; margin-bottom:36px;`;
const Eyebrow = styled.div`font-size:11px; font-weight:700; letter-spacing:.14em; color:${({ theme }) => theme.colors.secondary};`;
const HeaderAction = styled.button`border:0; border-radius:9px; color:white; background:${({ theme }) => theme.colors.primary}; padding:11px 16px; display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:700;`;
const Notice = styled.button`position:fixed;right:22px;bottom:22px;z-index:3;display:flex;align-items:center;gap:12px;max-width:420px;padding:13px 16px;border:1px solid ${({ theme }) => theme.colors.border};border-radius:10px;color:${({ theme }) => theme.colors.text};background:${({ theme }) => theme.colors.surfaceMuted};cursor:pointer;text-align:left;`;
