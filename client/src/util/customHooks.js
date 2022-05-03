import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setFormField] = useState(initialState);

  const onChange = (e) =>
    setFormField((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();

    callback();
  };

  const handleClickShowPassword = () => {
    setFormField({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return {
    onChange,
    onSubmit,
    values,
    handleClickShowPassword,
  };
};
