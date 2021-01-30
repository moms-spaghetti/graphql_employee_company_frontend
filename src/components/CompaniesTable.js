import React from "react";
import { ALL_COMPANIES, DELETE_COMPANY } from "../queries";
import { useQuery, useMutation, useApolloClient, gql } from "@apollo/client";

const CompaniesTable = () => {
  const { loading, error, data } = useQuery(ALL_COMPANIES);
  const [deleteCompany] = useMutation(DELETE_COMPANY);
  const client = useApolloClient();

  if (loading) return <p>loading company data</p>;
  if (error) return <p>page error</p>;
  if (data?.allCompanies.length < 1) return <h3>no company data available</h3>;

  return (
    <div>
      <h2>Company Table</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>total employees</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {data.allCompanies.map((company) => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>{company.totalEmployees}</td>
              <td>
                <button
                  onClick={() => {
                    const data = client.readQuery({
                      query: gql`
                        query allEmployees {
                          allEmployees {
                            companyId
                          }
                        }
                      `,
                    });

                    data.allEmployees.some(
                      (item) => item.companyId === company.id
                    )
                      ? alert("cannot delete - other users are still linked")
                      : deleteCompany({
                          variables: { id: company.id },
                          update(cache) {
                            cache.modify({
                              fields: {
                                allCompanies(
                                  existingCompanies = [],
                                  { readField }
                                ) {
                                  return existingCompanies.filter(
                                    (companyRef) =>
                                      company.id !== readField("id", companyRef)
                                  );
                                },
                              },
                            });
                          },
                        });
                  }}
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesTable;
