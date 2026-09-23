import { Formik, Form, Field } from 'formik';
import { X } from 'lucide-react';
import { HeaderAction } from '../layout/HeaderAction';
import { Overlay, ModalBox, ModalHeader, Close, FormGrid, ModalActions, SecondaryButton } from '../ui/dashboard-primitives';

export function GameForm({ platforms, onSubmit, onCancel }) {
  return <Formik initialValues={{ title: '', slug: '', price: '', discount: 0, releaseDate: '', summary: '', video: '', cover: '', wallpaper: '', screenshots: '', platformId: platforms[0]?.id || '' }} onSubmit={onSubmit}><Form><FormGrid><label>Título<Field name="title" required placeholder="Ej. Hollow Knight" /></label><label>Slug<Field name="slug" required placeholder="hollow-knight" /></label><label>Precio<Field name="price" type="number" min="0" step="0.01" required /></label><label>Descuento (%)<Field name="discount" type="number" min="0" max="100" /></label><label>Fecha de lanzamiento<Field name="releaseDate" type="date" /></label><label>Plataforma<Field name="platformId" as="select">{platforms.map((platform) => <option key={platform.id} value={platform.id}>{platform.name}</option>)}</Field></label><label>Portada (URL)<Field name="cover" type="url" placeholder="https://..." /></label><label>Fondo (URL)<Field name="wallpaper" type="url" placeholder="https://..." /></label><label className="wide">Resumen<Field name="summary" as="textarea" rows="3" /></label><label className="wide">Capturas (una URL por línea)<Field name="screenshots" as="textarea" rows="3" /></label></FormGrid><ModalActions><SecondaryButton type="button" onClick={onCancel}>Cancelar</SecondaryButton><HeaderAction type="submit">Guardar juego</HeaderAction></ModalActions></Form></Formik>;
}

export function UserForm({ onSubmit, onCancel }) {
  return <Formik initialValues={{ username: '', email: '', password: '', firstName: '', lastName: '' }} onSubmit={onSubmit}><Form><FormGrid><label>Nombre<Field name="firstName" /></label><label>Apellido<Field name="lastName" /></label><label>Usuario<Field name="username" required /></label><label>Email<Field name="email" type="email" required /></label><label className="wide">Contraseña<Field name="password" type="password" minLength="6" required /></label></FormGrid><ModalActions><SecondaryButton type="button" onClick={onCancel}>Cancelar</SecondaryButton><HeaderAction type="submit">Guardar cliente</HeaderAction></ModalActions></Form></Formik>;
}

export function Modal({ title, onClose, children }) {
  return <Overlay onClick={onClose}><ModalBox onClick={(event) => event.stopPropagation()}><ModalHeader><div><Eyebrow>NUEVO REGISTRO</Eyebrow><h2>{title}</h2></div><Close onClick={onClose}><X size={20} /></Close></ModalHeader>{children}</ModalBox></Overlay>;
}

const Eyebrow = ({ children }) => <div style={{ color: '#22d3ee', fontSize: 11, fontWeight: 700, letterSpacing: '.14em' }}>{children}</div>;
