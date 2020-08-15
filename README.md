## Description

Provides a text input together with the capability to confirm the input as soon as ready

## Support
Supports AMD eco system. If there is no loader, ConfirmableTextInput is registered as a browser variable.

## Code Example
- Use it as browser variable
```js
var control = new ConfirmableTextInput({
    id: "id",
    buttonName: "Confirm",
    onValueChanged: function (value) {
        console.log(value);
    },
    onValueConfirmed: function (confirmedValue) {
        console.log(confirmedValue);
    }
});
document.getElementById("jean-confirmable-text-input-container").appendChild(control.element);

control.input.setValue("my value");
var value = control.input.getValue();
control.input.removeValue();

```
- Use it with require.js
```js
require(["path/to/ConfirmableTextInput"], function(ConfirmableTextInput){
    // Work with ConfirmableTextInput
});
```

## Style
- The control comes with build-in styles, which will programmatically be injected into the page head as style tag. 
- For custom styling add own styles to the end of the body.

## Installation

`npm install jean-confirmable-text-input --save --legacy-bundling`

## API Reference

### ConfirmableTextInput Constructor

**Options**
- **options**: `Object` - `optional` - options object
- **options.id**: `String` - `optional` - id of element
- **options.buttonName**: `String` - `optional` - Name  of the button
- **options.onValueChanged**: `Function` - `optional` - Get's called if the value changed
- **options.onValueConfirmed**: `Function` - `optional` - Get's called if the user is pushing the button


### Inherited TextInput Capabilities

**Look at [TextInput](https://github.com/je-an/jean-text-input) for inherited methods**

## Tests

- Open spec/spec-runner.html in browser to see the test cases.
- Open example/index.html in your web browser for an example implementation.

## License

MIT