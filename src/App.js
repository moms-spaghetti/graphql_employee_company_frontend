import React from "react";

//components
import EmployeesTable from "./components/EmployeesTable";

function App() {
  return (
    <div>
      <h1>GraphQL Employee Company</h1>
      <p>**Currently work in progress**</p>
      <p style={{ width: "30rem" }}>
        Uses GraphQL and Apollo to retrieve and delete data from a backend
        server connected to a mongodb database. Deletion is currently using
        cache updates to remove deleted items from the UI.
        <p>
          <a
            href="https://moms-spaghetti-graphql-empcomp.herokuapp.com/graphql"
            alt="link to graphql"
          >
            Access the GraphiQL interface here to add data
          </a>
        </p>
      </p>
      <EmployeesTable />
    </div>
  );
}

export default App;
