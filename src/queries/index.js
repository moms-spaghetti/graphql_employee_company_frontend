import { gql } from "@apollo/client";

const ALL_EMPLOYEES = gql`
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

const ADD_EMPLOYEE = gql`
  mutation AddEmployee($name: String!, $age: Int!, $companyId: String!) {
    addEmployee(name: $name, age: $age, companyId: $companyId) {
      id
      name
      age
      companyId
    }
  }
`;

const ALL_COMPANIES = gql`
  {
    allCompanies {
      id
      name
    }
  }
`;

export { ALL_EMPLOYEES, DELETE_EMPLOYEE, ADD_EMPLOYEE, ALL_COMPANIES };
