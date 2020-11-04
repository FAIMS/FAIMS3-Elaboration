import React from 'react';
import SchemaForm from './SchemaForm';
import '@testing-library/jest-dom'
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


const formSpec = {
   schema: {
    type: 'object',
    properties: { 
      foo: {
        title: "Foo",
        type: 'string'
      }
    }
  },
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/foo'
      }
    ]
  }
}

Enzyme.configure({ adapter: new Adapter() });

it('renders a simple form', () => {
  const div = document.createElement('div');

  const callback = () => 3

  const wrapper = shallow(<SchemaForm formSpec={formSpec} callbackFn={callback} />, div);

  expect(wrapper.contains('Next')).toBe(true) // Next button
  expect(wrapper.html()).toMatch(formSpec.schema.properties.foo.title)
  
});
