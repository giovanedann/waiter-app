import { styled } from 'styled-components/native';

export const Container = styled.Pressable`
  background: ${({ disabled }) => disabled ? '#999' : '#d73035'};
  min-width: 150px;
  border-radius: 48px;
  padding: 14px 24px;
  align-items: center;
  justify-content: center;
`;
