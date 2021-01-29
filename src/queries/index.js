import { gql } from "@apollo/client";

const GET_ALL_EMPLOYEES = gql`
  {
    allEmployees {
      id
      name
      age
      company {
        name
      }
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: String!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;

export { GET_ALL_EMPLOYEES, DELETE_EMPLOYEE };
