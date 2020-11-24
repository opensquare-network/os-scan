import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  thead {
    tr {
      th {
        width: 30%;
        line-height: 1.5;
        padding: 10px;
        text-align: left;
        
        &:last-of-type {
          text-align: right;
        }
      }
    }
  }
  
  tbody {
    tr {
      td {
        text-align: left;
        padding: 10px;
        &:last-of-type {
          text-align: right;
        }
      }
    }
  }
`

export default Table
