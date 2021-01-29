import React from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { ADD_EMPLOYEE, ALL_COMPANIES } from "../queries/";
import { useForm } from "react-hook-form";

const AddEmployee = () => {
  const { loading, error, data } = useQuery(ALL_COMPANIES);
  const [addEmployee] = useMutation(ADD_EMPLOYEE);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    addEmployee({
      variables: {
        name: data.name,
        age: Number(data.age),
        companyId: data.companyId,
      },
      update(cache, { data: { addEmployee } }) {
        cache.modify({
          fields: {
            allEmployees(existingEmployees = []) {
              const newEmployeeRef = cache.writeFragment({
                data: addEmployee,
                fragment: gql`
                  fragment newEmployee on allEmployees {
                    id
                    name
                    age
                    companyId
                  }
                `,
              });
              return [...existingEmployees, newEmployeeRef];
            },
          },
        });
      },
    });
    reset();
  };

  if (loading) return <p>loading employee data</p>;
  if (error) return <p>page error</p>;
  if (data.allCompanies === []) return <p>no company data available</p>;

  return (
    <>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Company Name</label>
        <input name="name" type="text" id="name" ref={register} required />
        <br />
        <label htmlFor="age">Age</label>
        <input
          name="age"
          type="number"
          id="age"
          ref={register({ min: 0 })}
          required
        />
        <br />
        <label htmlFor="company">Company</label>
        <select type="select" ref={register} name="companyId" id="company">
          {data.allCompanies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        <br />
        <input type="submit" />
      </form>
    </>
  );
};

export default AddEmployee;
