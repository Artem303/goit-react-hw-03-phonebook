import React from 'react';
import { nanoid } from 'nanoid';
import FormContactInput from './FormContacts/FormContacts';
import { Contacts } from './Contacts/Contacts';
import FilterContacts from './Filter/Filter';

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localStorageContacts = localStorage.getItem('contacts');
    const contactsParse = JSON.parse(localStorageContacts);

    if (contactsParse) {
      this.setState({ contacts: contactsParse });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmit = data => {
    const repeatContact = this.state.contacts.find(
      contact => contact.name === data.name
    );
    if (repeatContact) {
      return alert(`${data.name} is already in contacts`);
    }

    const contactByForm = { ...data, id: nanoid() };
    this.setState(prev => ({
      contacts: [contactByForm, ...prev.contacts],
    }));
  };
  onChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  getFilterContact = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  deleteContact = idContact => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== idContact),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleArr = this.getFilterContact();

    return (
      <div>
        <h1>Phonebook</h1>
        <FormContactInput onSubmit={this.formSubmit} />
        <h2>Contacts</h2>
        {this.state.contacts.length > 0 && (
          <FilterContacts filter={filter} onChange={this.onChangeFilter} />
        )}
        {this.state.contacts.length > 0 && (
          <Contacts stateArr={visibleArr} deleteContact={this.deleteContact} />
        )}
      </div>
    );
  }
}

export default App;
