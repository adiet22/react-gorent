import styled from 'styled-components'

export const Link = styled.a`
  padding: 8px;
  display: inline-block;
  color: gray;
  text-decoration: none !important;
  &:hover {
    color: black;
  }
  &:focus {
    color: orange;
  }
`
