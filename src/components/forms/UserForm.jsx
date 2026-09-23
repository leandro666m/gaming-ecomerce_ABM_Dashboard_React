
import { Formik, Form, Field } from 'formik';
import { HeaderAction } from '../layout/HeaderAction';
import { FormGrid, ModalActions, SecondaryButton } from '../ui/dashboard-primitives';


export function UserForm({ onSubmit, onCancel }) {
  return <>
    <Formik
      initialValues={{ username: '', email: '', password: '', firstName: '', lastName: '' }}
      onSubmit={onSubmit}>
        <Form>
          <FormGrid>
            <label>Nombre<Field name="firstName" /></label>
            <label>Apellido<Field name="lastName" /></label>
            <label>Usuario<Field name="username" required /></label>
            <label>Email<Field name="email" type="email" required /></label>
            <label className="wide">Contraseña<Field name="password" type="password" minLength="6" required /></label>
          </FormGrid>
          <ModalActions>
            <SecondaryButton type="button" onClick={onCancel}>Cancelar</SecondaryButton>
            <HeaderAction type="submit">Guardar cliente</HeaderAction>
          </ModalActions>
        </Form>
      </Formik>
  </>
}
