import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: var(--white);
  max-width: 1200px;
  width: 500px;
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
`;

export const CustomForm = styled.form`
   display: flex;

   flex-direction: column;
   flex-wrap: wrap;
   justify-content: space-around;
   margin: 10px;
   > button {
    background-color: var(--gray);
    border: none;
    width: 80%;
   }
`;

export const Display = styled.div`
   max-width: 700px;
   
   > h6 {
    margin-top: 15px;
   }
  
   
`;
