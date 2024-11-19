import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 300px;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #1f3e5b;
  position: fixed;
  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  li {
  }

  a {
    text-decoration: none;
    color: #ffffff;
  }
`;
