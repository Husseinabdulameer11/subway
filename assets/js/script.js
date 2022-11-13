function CustomValidation(input) {
    this.invalidities = [];
    this.validityChecks = [];

    //add reference to the input node
    this.inputNode = input;

    //trigger method to attach the listener
    this.registerListener();
}

CustomValidation.prototype = {
    addInvalidity: function(message) {
        this.invalidities.push(message);
    },
    getInvalidities: function() {
        return this.invalidities.join('. \n');
    },
    checkValidity: function(input) {
        for ( var i = 0; i < this.validityChecks.length; i++ ) {

            var isInvalid = this.validityChecks[i].isInvalid(input);
            if (isInvalid) {
                this.addInvalidity(this.validityChecks[i].invalidityMessage);
            }

            var requirementElement = this.validityChecks[i].element;

            if (requirementElement) {
                if (isInvalid) {
                    requirementElement.classList.add('invalid');
                    requirementElement.classList.remove('valid');
                } else {
                    requirementElement.classList.remove('invalid');
                    requirementElement.classList.add('valid');
                }

            } // end if requirementElement
        } // end for
    },
    checkInput: function() { // checkInput now encapsulated

        this.inputNode.CustomValidation.invalidities = [];
        this.checkValidity(this.inputNode);

        if ( this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '' ) {
            this.inputNode.setCustomValidity('');
        } else {
            var message = this.inputNode.CustomValidation.getInvalidities();
            this.inputNode.setCustomValidity(message);
        }
    },
    registerListener: function() { //register the listener here

        var CustomValidation = this;

        this.inputNode.addEventListener('keyup', function() {
            CustomValidation.checkInput();
        });


    }

};

var firstnameValidityChecks = [
    {
        isInvalid: function(input) {
            return input.value.length < 3;
        },
        invalidityMessage: 'This input needs to be at least 3 characters',
        element: document.querySelector('label[for="firstname"] .input-requirements>span:nth-child(1)')
    },
    {
        isInvalid: function(input) {
            var illegalCharacters = input.value.match(/[^a-zA-Z]/g);
            return illegalCharacters ? true : false;
        },
        invalidityMessage: 'Only letters are allowed',
        element: document.querySelector('label[for="firstname"] .input-requirements>span:nth-child(2)')
    }
];

var lastnameValidityChecks = [
    {
        isInvalid: function(input) {
            return input.value.length < 3;
        },
        invalidityMessage: 'This input needs to be at least 3 characters',
        element: document.querySelector('label[for="lastname"] .input-requirements>span:nth-child(1)')
    },
    {
        isInvalid: function(input) {
            var illegalCharacters = input.value.match(/[^a-zA-Z]+?(\s[^a-zA-Z])/);
            return illegalCharacters ? true : false;
        },
        invalidityMessage: 'Only letters  are allowed',
        element: document.querySelector('label[for="lastname"] .input-requirements>span:nth-child(2)')
    }
];
var ageValidityChecks = [
    {
        isInvalid: function(input) {
            return input.value < 18;
        },
        invalidityMessage: 'should be atleast 18 years old',
        element: document.querySelector('label[for="age"] .input-requirements>span:nth-child(1)')
    },{
        isInvalid: function(input) {
            var illegalCharacters = input.value.match(/[^0-9]/g);
            return illegalCharacters ? true : false;
        },
        invalidityMessage: 'should only contain numbers',
        element: document.querySelector('label[for="age"] .input-requirements>span:nth-child(2)')
    }
    
];
var AdressValidityChecks = [
    
    {
        isInvalid: function(input) {
            
            //let illegalCharacters=input.value.match(/^[a-zA-Z\s]+[0-9]{3,5}/g);
            let illegalCharacters=input.value.match(new RegExp(/^\d|[#!£@¤$%&]\s|([A-Za-z#!£@¤$%&])+$/));
            //let illegalCharacters=input.value.match(/[]/)
            return illegalCharacters ? true : false;
            },
            invalidityMessage: 'should only contain numbers',
        element: document.querySelector('label[for="Adress"] .input-requirements>span:nth-child(1)')
}
];



var firstnameInput = document.getElementById('firstname');
var lastnameInput = document.getElementById('lastname');
var ageinput = document.getElementById('age');
var AdressInput=document.getElementById('Adress');

firstnameInput.CustomValidation = new CustomValidation(firstnameInput);
firstnameInput.CustomValidation.validityChecks = firstnameValidityChecks;

lastnameInput.CustomValidation = new CustomValidation(lastnameInput);
lastnameInput.CustomValidation.validityChecks = lastnameValidityChecks;

ageinput.CustomValidation = new CustomValidation(ageinput);
ageinput.CustomValidation.validityChecks = ageValidityChecks;

AdressInput.CustomValidation = new CustomValidation(AdressInput);
AdressInput.CustomValidation.validityChecks = AdressValidityChecks;



var inputs = document.querySelectorAll('input:not([type="submit"])');


var submit = document.querySelector('input[type="submit"');
var form = document.getElementById('registration');

function validate() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].CustomValidation.checkInput();
    }
}
submit.addEventListener('click', validate);
form.addEventListener('submit', validate);
