import React, { useState, useEffect } from 'react';
import css from './Modal.module.css';

function Modal({ visible, onClose, fields = [], data = {}, onSubmit }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm(data || {});
  }, [data]);

  if (!visible) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <div className={css.overlay}>
      <div className={`${css.modal} ${css.container}`}>
        <h2>Edit</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field, i) => (
            <div className={css.field} key={i}>
              <p>{field.replace('_', ' ')}</p>
              <input
                name={field}
                value={form[field] || ''}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className={css.buttons}>
            <button className={css.submit} type="submit">Save</button>
            <button type="button" onClick={onClose} className={css.cancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
