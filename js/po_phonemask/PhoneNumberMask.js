var PhoneNumberMask = Class.create();
PhoneNumberMask.prototype = {
    initialize: function(elementId, mask) {
        this.element     = $(elementId);
        this.numberMask  = mask.toString();

        if (!this.numberMask.length || !this.element) {
            return;
        }

        this._blockedKeyCodeList = [
            35, // End
            36, // Home
            37, // Left
            38, // Up
            39, // Right
            40, // Down
            46  // Delete
        ];

        if (this.element.getValue() && !this.validate()) {
            this.element.observe('input', this._onInputEmpty.bind(this));
        } else {
            this.initObservers();
            this.initValidation();
            this.processPhoneMask();
        }
    },
    initObservers: function() {
        if (typeof(this.element) === 'object') {
            this.element.observe('click', this._onFocus.bind(this));
            this.element.observe('focus', this._onFocus.bind(this));
            this.element.observe('keydown', this._onKeyDown.bind(this));
            this.element.observe('input', this._onInput.bind(this));
        }
    },
    initValidation: function() {
        var me = this;
        this.element.addClassName('validate-po-phonemask-' + this.element.identify());
        Validation.add(
            'validate-po-phonemask-' + this.element.identify(),
            'This is a required field.',
            function() {
                return me.validate();
            }
        );
    },
    validate: function() {
        for (var i = 0; i < this.numberMask.length; i++) {
            if (typeof(this.element.value[i]) == 'undefined') {
                return false;
            }
            var isCharNotDigit = (this.element.value[i].charCodeAt() < 48 || this.element.value[i].charCodeAt() > 57);
            if (isCharNotDigit && this.numberMask[i] == '_') {
                return false;
            }
            if (this.element.value[i] != this.numberMask[i] && this.numberMask[i] != '_') {
                return false;
            }
        }
        return true;
    },
    processPhoneMask: function() {
        var elementValue = '';
        for (var i = 0; i < this.numberMask.length; i++) {
            if (
                (typeof(this.element.value[i]) == 'undefined') ||
                    (
                        (this.element.value[i].charCodeAt() < 48 || this.element.value[i].charCodeAt() > 57) &&
                            (this.numberMask[i] == '_')
                        )
                )
            {
                elementValue = elementValue + this.numberMask[i];
            } else if (this.element.value[i] != this.numberMask[i] && this.numberMask[i] != '_') {
                elementValue = elementValue + this.numberMask[i];
            } else {
                elementValue = elementValue + this.element.value[i];
            }
        }
        this.element.value = elementValue;
    },
    moveCursorToFirstUnderScore: function() {
        for (var i = 0; i < this.element.value.length; i++) {
            if (this.element.value[i] == '_') {
                this._moveCursor(i);
                break;
            }
        }
    },
    moveCursorToLastDigit: function() {
        var position = -1;
        for (var i = 0; i < this.element.value.length; i++) {
            if (this.element.value[i].charCodeAt() >= 48 && this.element.value[i].charCodeAt() <= 57) {
                position = i;
            }
            if (this.element.value[i] == '_') {
                if (position > -1) {
                    this._moveCursor(position + 1);
                } else {
                    this._moveCursor(i);
                }
                break;
            }
        }
    },
    _moveCursor: function(position) {
        this.element.selectionStart = position;
        this.element.selectionEnd = position;
    },
    _onFocus: function(e) {
        this.moveCursorToFirstUnderScore();
    },
    _onInput: function() {
        this.processPhoneMask();
        this.moveCursorToFirstUnderScore();
    },
    _onInputEmpty: function() {
        if (this.element.getValue() == '') {
            this.initObservers();
            this.initValidation();
            this.processPhoneMask();
            this.moveCursorToFirstUnderScore();
        }
    },
    _onKeyDown: function(e) {
        // Prevent navigation by keys
        if (this._blockedKeyCodeList.indexOf(e.keyCode) > -1) {
            e.stop();
            return;
        }
        // Move cursor when backspace is pressed
        if (e.keyCode == 8) {
            this.moveCursorToLastDigit();
        }
    }
};