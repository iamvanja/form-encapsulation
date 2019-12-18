import React from 'react';
import { FormWrap, Input } from 'ui/form';
import { getDefaultFormValues } from 'utils/form'
import v from 'validation'

const getSubmitPromise = values =>
  new Promise((resolve, reject) => {
    // fire off an actual request by casting all '' values to null
    // request(cleanFormValues(values)) // imported from utils/form
    setTimeout(() => resolve({
      // emulate server response to demonstrate form reinitialization on request complete (it's an opt-out)
      firstName: 'Server First Name',
      lastName: null
    }), 2500)
  })

const fields = [
  'firstName',
  'lastName',
  'email'
]
const schema = v.utils.createPartialObjectSchema(v.schemas.user, fields)

function App () {
  const mockServerValues = { firstName: null, lastName: 'Doe', email: '' } // bad server, what kind of values are you sending my way?!

  return (
    <div className="App" style={{ width: '500px', margin: '0 auto' }}>
      <FormWrap
        isDebug
        initialValues={getDefaultFormValues(mockServerValues, fields)}
        getSubmitPromise={getSubmitPromise}
        validationSchema={schema}
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
        <Input
          type='email'
          label='E-mail'
          name='email'
          placeholder='Enter e-mail'
        />
      </FormWrap>
    </div>
  );
}

export default App;
