# Notes on Implementation

JSON configuration of form sequence uses a single JSON file to hold
the JSON Schema and UI specifications for a sequence of forms. 
The `sequence` property is an array of property names, e.g. `["general", "tree"]`. 
The value of each of these properties should be an object with
properties `schema` and `ui` which contain the JSON schema and UI 
spec for the form. Example in [pocForms.json](../src/schema/pocForms.json).

The `FormSequence` component interprets this JSON structure and presents the
sequence of forms with a 'Next' button. When complete, the collected data
is displayed. 

The `SchemaForm` component display a single form configured by the schema
and ui specifications.  

The specifications are as defined by the [JSON Forms](https://jsonforms.io/). 

