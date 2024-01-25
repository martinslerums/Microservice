import React, { useState } from 'react';
import FormComponent from '../Form/Form.tsx';
import InputComponent from '../Input/Input.tsx';
import ButtonComponent from '../Button/Button.tsx';

const initialFormValues = {
  query: '',
  page: '',
};

export type SearchFormValues = typeof initialFormValues

type SearchFormProps = {
  onSubmit: (formData: SearchFormValues) => void;
};

const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const [searchForm, setSearchForm] = useState(initialFormValues);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchForm({
      ...searchForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(searchForm);
    setSearchForm(initialFormValues);
  };

  return (
    <FormComponent onSubmit={handleSubmit}>
      <InputComponent
        label="Search query"
        type="text"
        id="query"
        value={searchForm.query}
        onChange={handleInputChange}
        required
        name="query"
      />
      <InputComponent
        label="Page number"
        type="number"
        id="page"
        value={searchForm.page}
        onChange={handleInputChange}
        required
        name="page"
      />
      <ButtonComponent label="Submit Form" type="submit"/>
    </FormComponent>
  );
};

export default SearchForm;
