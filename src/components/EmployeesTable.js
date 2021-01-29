import React from "react";
import { ALL_EMPLOYEES, DELETE_EMPLOYEE } from "../queries";
import { useQuery, useMutation } from "@apollo/client";

const EmployeesTable = () => {
  const { loading, error, data } = useQuery(ALL_EMPLOYEES);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);

  if (loading) return <p>loading employee data</p>;
  if (error) return <p>page error</p>;
  if (data.allEmployees === []) return <p>no employee data available</p>;

  return (
    <>
      <h2>Employee Table</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>age</th>
            <th>company</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {data.allEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.age}</td>
              <td>{employee.company.name}</td>
              <td>
                <button
                  onClick={() =>
                    deleteEmployee({
                      variables: { id: employee.id },
                      update(cache) {
                        cache.modify({
                          fields: {
                            allEmployees(
                              existingEmployees = [],
                              { readField }
                            ) {
                              return existingEmployees.filter(
                                (employeeRef) =>
                                  employee.id !== readField("id", employeeRef)
                              );
                            },
                          },
                        });
                      },
                    })
                  }
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EmployeesTable;
