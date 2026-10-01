
import { Formik, Form, Field } from 'formik';
import { HeaderAction } from '../layout/HeaderAction';
import { FormGrid, ModalActions, SecondaryButton } from '../ui/dashboard-primitives';


export function UserForm({ onSubmit, onCancel, isEditing = false, initialValues }) {

  const formValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'user',
    active: true,
    ...initialValues,
    password: initialValues?.password || '',
  };

  return <>
    <Formik initialValues={formValues}
      onSubmit={onSubmit}>
        <Form>
          <FormGrid>
            <label>Nombre<Field name="firstName" /></label>
            <label>Apellido<Field name="lastName" /></label>
            <label>Email<Field name="email" type="email" required /></label>
            <label>Estado<Field name="active" type="checkbox" /> </label>
            <label>Rol
                <Field name="role" as="select">
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                </Field>
            </label>
            <label className="wide">Contraseña<Field name="password" type="password" minLength="6" required={!isEditing}
              placeholder={isEditing ? 'Dejar en blanco para conservar la actual' : ''} /></label>
          </FormGrid>
          
          <ModalActions>
            <SecondaryButton type="button" onClick={onCancel}>Cancelar</SecondaryButton>
            <HeaderAction type="submit">{isEditing ? 'Guardar cambios' : 'Crear usuario'}</HeaderAction>
          </ModalActions>
        </Form>
      </Formik>
  </>
}
