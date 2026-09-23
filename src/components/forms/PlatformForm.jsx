
import { Formik, Form, Field } from 'formik';
import { HeaderAction } from '../layout/HeaderAction';
import { FormGrid, ModalActions, SecondaryButton } from '../ui/dashboard-primitives';


export function PlatformForm({ onSubmit, onCancel }) {

    
  return <>
    <Formik 
      initialValues={{ name: '', display_order: '', iconUrl: '', slug: '' }} 
      onSubmit={onSubmit}>
        <Form>
          <FormGrid>
            <label>Nombre<Field name="name" required /> </label>
            <label>Orden<Field name="display_order" type="number" min="0" /> </label>
            <label>URL del ícono<Field name="iconUrl" type="url" placeholder="https://..." /> </label>
            <label>slug<Field name="slug" /> </label>
          </FormGrid>
          <ModalActions>
            <SecondaryButton type="button" onClick={onCancel}>Cancelar</SecondaryButton>
            <HeaderAction type="submit">Guardar plataforma</HeaderAction>
          </ModalActions>
        </Form>
    </Formik>
  </>
}