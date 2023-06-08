import {useState} from "react";

function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  function handleChange(evt) {
    const {value, name} = evt.target;
    setValues({...values, [name]: value});
  }

  function reset() {
    setValues(inputValues);
  }

  return {values, handleChange, setValues, reset};
}

export default useForm;