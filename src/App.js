import React from 'react';
import { FormWrap, Input } from 'ui/form';

const getSubmitPromise = values =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      firstName: 'Server First Name',
      lastName: null
    }), 2500)
  })

function App () {
  return (
    <div className="App" style={{ width: '500px', margin: '0 auto' }}>
      <FormWrap
        isDebug
        initialValues={{ firstName: '', lastName: '' }}
        getSubmitPromise={getSubmitPromise}
      >
        <Input
          type='text'
          label='First Name'
          name='firstName'
          placeholder='Enter First Name'
        />
        <Input
          type='text'
          label='Last Name'
          name='lastName'
          placeholder='Enter Last Name'
        />
      </FormWrap>
    </div>
  );
}

export default App;
