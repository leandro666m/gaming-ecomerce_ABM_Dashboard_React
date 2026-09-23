import styled from 'styled-components';

export const HeaderAction = styled.button`
    border:0;
    border-radius:9px;
    color:white;
    background:${({ theme }) => theme.colors.primary};
    padding:11px 16px;
    display:flex;
    align-items:center;
    gap:8px;
    cursor:pointer; 
    font-weight:700;
`;
