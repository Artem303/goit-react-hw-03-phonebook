import css from './Contacts.module.css';

export const Contacts = ({ stateArr, deleteContact }) => {
  return (
    <ul className={css.contactList}>
      {stateArr.map(({ name, number, id }) => (
        <li key={id}>
          <p>
            {name}: {number}
          </p>
          <button type="button" onClick={() => deleteContact(id)}>
            Delete contact
          </button>
        </li>
      ))}
    </ul>
  );
};
