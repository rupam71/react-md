# @rupam71/autocomplete

This Package is Fork from
[@react-md/autocomplete](https://www.npmjs.com/package/@react-md/autocomplete)

# Whats Add Here

If a user directly press 'enter' or 'tab' key without focusing list, still first
filter value will be mark as submited.

## Installation

```sh
npm install --save @rupam71/autocomplete
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/autocomplete/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

The `AutoComplete` component just requires:

- an `id` to identify the field (required for a11y)
- a list of `data` that can be a list of `string`, `number`, or `object`

However, it is recommended to also provide a `label` and `placeholder` text to
help the user understand this component.

```tsx
import { AutoComplete } from "@react-md/autocomplete";

const fruits = [
  "Apple",
  "Apricot",
  "Banana",
  "Blueberry",
  "Cranberry",
  "Kiwi",
  "Peach",
  "Plum",
  "Strawberry",
];

function Example() {
  return (
    <AutoComplete
      id="search-fruits"
      name="fruits"
      label="Fruits"
      placeholder="Kiwi..."
      data={fruits}
    />
  );
}
```
