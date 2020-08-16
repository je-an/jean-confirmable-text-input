define(
    [
        "DomElement",
        "DomUtil",
        "Inheritance",
        "TypeCheck",
        "Failure",
        "Merge",
        "TextInput",
        "Button",
        "text!confirmabletextinput-html",
        "css!confirmabletextinput-css"
    ], function (DomElement, DomUtil, Inheritance, TypeCheck, Failure, Merge, TextInput, Button, controlHtml) {
        /**
         * Provides a text button together with the capability to confirm the input as soon as ready 
         * @alias ConfirmableTextInput 
         * @constructor
         * @param {Object} options - options object
         * @param {String} options.id - id of element
         * @param {String="Ok"} options.buttonName - Name  of the button
         * @param {Boolean=false} options.isButtonHighlighted - True if button shall be highlighted after click, false otherwise
         * @param {Function} options.onValueChanged - Get's called if the value changed
         * @param {Function} options.onValueConfirmed - Get's called if the user is pushing the button
         */
        var ConfirmableTextInput = function (options) {
            Inheritance.inheritConstructor(DomElement, this, Merge({
                html: controlHtml,
                id: TypeCheck.isString(options.id) ? options.id : "",
                buttonName: TypeCheck.isString(options.buttonName) ? options.buttonName : "Ok",
                onValueChanged: TypeCheck.isFunction(options.onValueChanged) ? options.onValueChanged : function () { },
                onValueConfirmed: TypeCheck.isFunction(options.onValueConfirmed) ? options.onValueConfirmed : function () { }
            }, TypeCheck.isDefined(options) ? options : {}));
            var instance = this;
            this.input = new TextInput({
                onValueChanged: this.options.onValueChanged.bind(this)
            });
            this.button = new Button({
                id: this.options.id,
                name: this.options.buttonName,
                onButtonClick: function () {
                    var value = instance.input.getValue();
                    if (value !== "") {
                        instance.options.onValueConfirmed(value);
                        instance.input.removeValue();
                    }                    
                }
            });
            this.input.element.style.float = "left";
            this.element.appendChild(this.input.element);
            this.element.appendChild(this.button.element);
        };
        Inheritance.inheritPrototype(ConfirmableTextInput, DomElement);
        return ConfirmableTextInput;
    });