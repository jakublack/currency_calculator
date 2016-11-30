function countChart(curFrom,curTo){
    var num1 = jQuery(curFrom.rates[1].mid);
    var num2 = jQuery(curFrom.rates[2].mid);
    
    //var result = num1+num2;
    console.log(num1);
    
    
    
    
    
    
    
    
    
    console.log(curTo);
} // finish countChart




function takeData(element1, element2) {
    var currency1;    
    var currency2;
    // need to check - input can't be a PLN - NBP don't response for that currency
    // if currency is the PLN val is 1.
        $.ajax({
                url: 'http://api.nbp.pl/api/exchangerates/rates/a/'+element1+'/last/30/?format=json',
                dataType: 'json'
                }).done(function(response1){
                // input data
                currency1=response1;
                    $.ajax({
                    url: 'http://api.nbp.pl/api/exchangerates/rates/a/'+element2+'/last/30/?format=json',
                    dataType: 'json'
                    }).done(function(response2){
                    // input data
                    currency2=response2;
                    countChart(currency1,currency2);
                    }).fail(function(error) {
                    console.log(error);
            }) // finish fail    
                }).fail(function(error) {
                console.log(error);
            }) // finish fail
        
    }; //finish takedata

