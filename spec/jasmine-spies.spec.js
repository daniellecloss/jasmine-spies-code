// this is the connection to the code we are testing
var Spy = require('../jasmine-spies.js');

describe("A spy and it's methods,", function() {

    // using the beforeEach block allows us to run this code before each test
    beforeEach(function() {
        var api_return, api_data, api_error, newSpy;

        // the below is the "mocked" api data, which will replace the actual api call
        Spy.api_data = {
            data : {
                'George' : '006',
                'Sue' : '008',
            },
            error : 'No spy with that spy name found.',
        };

        // this is the spy creation, we are spying on the actual function implementation
        spyOn(Spy, 'call_api');

        // use callThrough, so you can follow through on the code chain
        Spy.call_api.and.callThrough();

        // both spy names below exist in our mocked api data, so will return spy ids
        api_return_george = Spy.call_api('George');
        api_return_sue = Spy.call_api('Sue');

        // this call will return an error, since Fred doesn't exist in our data
        api_return_fred = Spy.call_api('Fred');

        // this call will return an error, since we are not supply a spy name
        api_return_error = Spy.call_api('');
    });

    it("tracks that it has been called", function() {
        expect(Spy.call_api).toHaveBeenCalled();
    });

    it("tracks all the arguments of its calls", function() {
        expect(Spy.call_api).toHaveBeenCalledWith('George');
        expect(Spy.call_api).toHaveBeenCalledWith('Sue');
        expect(Spy.call_api).toHaveBeenCalledWith('Fred');
        expect(Spy.call_api).toHaveBeenCalledWith('');
    });

    it("when called, returns the requested value", function() {
        expect(api_return_george).toEqual('006');
        expect(api_return_sue).toEqual('008');
        expect(api_return_fred).toEqual('No spy with that spy name found.');
        expect(api_return_error).toEqual('No spy with that spy name found.');
    });

});