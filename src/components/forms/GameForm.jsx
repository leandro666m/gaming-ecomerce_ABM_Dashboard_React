
import { Formik, Form, Field } from 'formik';
import { HeaderAction } from '../layout/HeaderAction';
import { FormGrid, ModalActions, SecondaryButton } from '../ui/dashboard-primitives';



export function GameForm({ platforms, initialValues, onSubmit, onCancel, isEditing = false }) {
  const values = initialValues || {
    title: '',
    slug: '',
    price: '',
    discount: 0,
    releaseDate: '',
    summary: '',
    video: '',
    cover: '',
    wallpaper: '',
    screenshots: '',
    platformId: platforms[0]?.id || '',
  };

  return <>
    <Formik initialValues={values} enableReinitialize onSubmit={onSubmit}>

        <Form>
          <FormGrid>
            <label>Título<Field name="title" required placeholder="Ej. Hollow Knight" /></label>
            <label>Slug<Field name="slug" required placeholder="hollow-knight" /></label>
            <label>Precio<Field name="price" type="number" min="0" step="0.01" required /></label>
            <label>Descuento (%)<Field name="discount" type="number" min="0" max="100" /></label>
            <label>Fecha de lanzamiento<Field name="releaseDate" type="date" /></label>
            <label>Plataforma<Field name="platformId" as="select">{platforms.map((platform) => <option key={platform.id} value={platform.id}>{platform.name}</option>)}</Field></label>
            <label>Video (URL)<Field name="video" type="url" placeholder="https://..." /></label>
            <label>Portada (URL)<Field name="cover" type="url" placeholder="https://..." /></label>
            <label>Fondo (URL)<Field name="wallpaper" type="url" placeholder="https://..." /></label>
            <label className="wide">Resumen<Field name="summary" as="textarea" rows="3" /></label>
            <label className="wide">Capturas (una URL por línea)<Field name="screenshots" as="textarea" rows="3" /></label>
          </FormGrid>
          <ModalActions>
            <SecondaryButton type="button" onClick={onCancel}>Cancelar</SecondaryButton>
            <HeaderAction type="submit">{isEditing ? 'Guardar cambios' : 'Guardar juego'}</HeaderAction>
          </ModalActions>
        </Form>

      </Formik>
  </>
}