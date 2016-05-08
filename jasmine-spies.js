var Spy = function() {};

// the actual api call would normally happen here
Spy.api_data = {};

// this is the function we are testing
Spy.call_api = function(spy_name){
    if(spy_name === '' || this.api_data.data[spy_name] === undefined){
        return this.api_data.error;
    }
    var spy_data = this.api_data.data[spy_name];
    return spy_data;
};

module.exports = Spy;