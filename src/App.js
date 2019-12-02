import React from 'react';
import { FormWrap, Input } from 'ui/form';

function App () {
  return (
    <div className="App">
      <FormWrap
        isDebug
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
