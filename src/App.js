import React from "react";

//components
import EmployeesTable from "./components/EmployeesTable";
import AddEmployee from "./components/AddEmployee";
import AddCompany from "./components/AddCompany";
import CompaniesTable from "./components/CompaniesTable";

function App() {
  return (
    <div>
      <h1>GraphQL Employee Company</h1>
      <p>**Currently work in progress**</p>
      <p style={{ width: "30rem" }}>
        Uses GraphQL and Apollo to retrieve and delete data from a backend
        server connected to a mongodb database. Deletion is currently using
        cache updates to remove deleted items from the UI.
      </p>
      <p>
        <a
          href="https://moms-spaghetti-graphql-empcomp.herokuapp.com/graphql"
          alt="link to graphql"
        >
          Access the GraphiQL interface here to add data
        </a>
      </p>
      <div className="row-flex-container">
        <EmployeesTable />
        <AddEmployee />
      </div>
      <div className="row-flex-container">
        <CompaniesTable />
        <AddCompany />
      </div>
    </div>
  );
}

export default App;
