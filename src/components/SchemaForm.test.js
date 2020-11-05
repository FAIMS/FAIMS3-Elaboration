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

  const wrapper = mount(<SchemaForm formSpec={formSpec} callbackFn={callback} />, div);

  // we have a next button
  expect(wrapper.find('button').text()).toBe("Next") 
  // we have a label with the field name
  expect(wrapper.find('label').text()).toMatch(formSpec.schema.properties.foo.title)
  // we have an input element with the right id
  expect(wrapper.exists('input[id="#/properties/foo-input"]')).toBe(true)
  // value should be empty
  expect(wrapper.find('input[id="#/properties/foo-input"]').props().value).toBe("")

  wrapper.unmount()
});
