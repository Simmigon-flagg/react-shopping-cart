
import styled from '@emotion/styled'

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;    
    border-bottom: 1px solid lightblue;
    padding-bottom: 20px;

    div {
        flex: 1;
    }

    .informational, .buttons {
        display: flex;
        justify-content: space-between;
    }
    img {
        max-width:80px;
        object-fit: cover;
        margin-left: 40px;
    }
    .buttons { 
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
        background-color: red; 
      }
      .buttons button { 
        width: 40%;
      }
`;