import styled from 'styled-components'

export const Card = styled.div`
  height: 337px;
  width: 260px;
  background-color: pink;
  font-size: 1.5em;
  color: white;
  border-radius: 10px;
  padding: 1em;
  display: flex;
  align-items: flex-end;
  background-image: url('${({ bg, backdrop }) => bg || backdrop}');
  background-size: cover;
  background-position: center;
  display: flex;
  padding: 0px;
  margin-bottom: 20px;
  text-transform: capitalize;

  div {
    background-color: white;
    align-self: flex-end;
    border-top-right-radius: 10px;
    height: 56px;
    width: 140px;
    color: black;
    padding-left: 5px;

    h4 {
      padding-top: 10px;

      margin-bottom: 0px;
      font-family: Nunito;
      font-size: 17px;
      font-weight: 600;
      overflow: hidden;
      white-space: nowrap; /* Don't forget this one */
      text-overflow: ellipsis;
    }

    p {
      font-size: 15px;
    }
  }
`
