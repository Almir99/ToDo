import styled from '@emotion/styled';

interface ButtonProps{
  del?:boolean,
  edit?:boolean
}

export const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`
export const Li = styled.li`
  background-color: var(--nights);
  display: grid;
  grid-template-areas: "text button" "date button";
  align-items: center;
  grid-template-columns: 1fr 80px;
  padding: 10px;
  min-height: 50px;

`

export const TextContainer = styled.div`
  grid-area: text;
`
export const DateContainer = styled.div`
  grid-area: date;
`
export const ButtonContainer = styled.div`
  grid-area: button;
  display: flex;
  justify-content: end;
`
export const Button = styled.button<ButtonProps>`
  background-color: transparent;
  color: var(--white);
  font-size: 25px;
  outline: none;
  border: none;
  transition: color 500ms ease;

  &&:hover{
    color: ${({ del, edit }) => del ? 'var(--red)' : edit ? 'var(--green)' : 'var(--gray)'} ;
    transition: color 500ms ease;
  }
`