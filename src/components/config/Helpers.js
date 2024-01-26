export function validate(values) {
  const errors = {};

  // Name
  if (!values.name) errors.name = "Campo requerido";

  // Email
  const emailRgx = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!values.email) errors.email = "Campo requerido";
  else if (emailRgx.test(values.email)) errors.email = `Email inválido`;

  // Password
  if (!values.password) errors.password = `Campo requerido`;
  else if (`${values.password}`.length < 7)
    errors.password = `La contraseña debe tener un mínimo de 8 caracteres`;

  return errors;
}

// export function onSubmit() {
//   setTimeout(() => {
//     alert(JSON.stringify(values, null, 2));

//     setSubmitting(false);
//   }, 250);
// }
