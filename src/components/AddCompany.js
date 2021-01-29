import React from "react";
import { useMutation, gql } from "@apollo/client";
import { ADD_COMPANY } from "../queries/";
import { useForm } from "react-hook-form";

const AddCompany = () => {
  const [addCompany] = useMutation(ADD_COMPANY);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    addCompany({
      variables: {
        name: data.name,
        totalEmployees: Number(data.totalEmployees),
      },
      update(cache, { data: { addCompany } }) {
        cache.modify({
          fields: {
            allCompanies(existingCompanies = []) {
              const newCompanyRef = cache.writeFragment({
                data: addCompany,
                fragment: gql`
                  fragment newCompany on allCompanies {
                    id
                    name
                    totalEmployees
                  }
                `,
              });
              return [...existingCompanies, newCompanyRef];
            },
          },
        });
      },
    });
    reset();
  };

  return (
    <div>
      <h2>Add Company</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Company Name</label>
        <input name="name" type="text" id="name" ref={register} required />
        <br />
        <label htmlFor="totalEmployees">Total Employees</label>
        <input
          name="totalEmployees"
          type="number"
          id="totalEmployees"
          ref={register({ min: 0 })}
          required
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddCompany;
