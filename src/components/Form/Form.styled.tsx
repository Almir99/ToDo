import styled from '@emotion/styled';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  
`

export const Inputs = styled.input`
  width: 100%;
  height: 40px;
  font-size: 25px;
  background-color: var(--nights);
  color: var(--white);
  outline: none;
  padding: 5px 20px;
  border-radius: 40px;
  border: none;
  
  &&::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
`

export const Button = styled.button`
  background-color: transparent;
  color: var(--white);
  font-size: 25px;
  outline: none;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  transition: all 500ms ease;
  
  &&:hover{
background-color: var(--nights);
    transition: all 500ms ease;
  }
  
  &&:disabled{
    color: var(--gray);
    background-color: var(--lightGray);
  }
`
//
// const Container = styled.div`
//   display: flex;
//   overflow: hidden;
//   max-width: 400px;
//   background-color: var(--nights);
//   border-radius: 40px;
//   border: 2px solid var(--lightGray);
//   padding: 5px;
// `
