import React from 'react';
import css from './Filter.module.css';

const FilterContacts = ({ filter, onChange }) => {
  return (
    <div className={css.filterCSS}>
      <label htmlFor="">
        <h3>Filter contacts by name</h3>
        <input type="text" value={filter} onChange={onChange} />
      </label>
    </div>
  );
};

export default FilterContacts;
