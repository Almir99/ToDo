import styled from '@emotion/styled';

interface TextProps{
  fontSize?:string;
  $fontWeight?: string;
  $margin?:string;
  $padding?:string;
  $color?:string;
  $textAlign?:string;
  lineThroughText?: boolean;
  interaction?:"none" | "pointer";

}
export const Text = styled.p<TextProps>`
  
  text-align: ${({ $textAlign }) => $textAlign || 'justify'};
  color: ${({ $color }) => `var(--${$color})` || 'inherit'};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  font-weight: ${({ $fontWeight }) => $fontWeight || 'normal'};
  margin: ${({ $margin }) => $margin || '0'};
  padding: ${({ $padding }) => $padding || '0'};
  text-decoration: ${({ lineThroughText }) => lineThroughText ? "line-through " : 'none'};
  
  ${({ interaction }) => interaction === "none" ? "pointer-events: none;" : interaction === "pointer" ? "cursor: pointer;" : ""};
`