import { gql } from "@apollo/client";

const ALL_EMPLOYEES = gql`
  {
    allEmployees {
      id
      name
      age
      companyId
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
      totalEmployees
    }
  }
`;

const ADD_COMPANY = gql`
  mutation AddCompany($name: String!, $totalEmployees: Int!) {
    addCompany(name: $name, totalEmployees: $totalEmployees) {
      id
      name
      totalEmployees
    }
  }
`;

const DELETE_COMPANY = gql`
  mutation DeleteCompany($id: String!) {
    deleteCompany(id: $id) {
      id
    }
  }
`;

export {
  ALL_EMPLOYEES,
  DELETE_EMPLOYEE,
  ADD_EMPLOYEE,
  ALL_COMPANIES,
  ADD_COMPANY,
  DELETE_COMPANY,
};
