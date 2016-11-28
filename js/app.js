jQuery(document).ready(function(){
    function loadRate() {
            $.ajax({
                    url: 'http://api.nbp.pl/api/exchangerates/tables/a/',
                    dataType: 'json'
            }).done(function(response){
                console.log(response[0]);
                
                // input data
                jQuery('.dataToInput').text(response[0].effectiveDate);
                
                
                // function to compare code currency to my table with json file
                function searchCurrency(response){
                    
                    var array = response[0].rates;
                    var currencyToInner = jQuery('.toChange');
                    //console.log(currencyToInner.hasClass('EUR'));
                    console.log(array);
                    console.log(currencyToInner);
                    currencyToInner.each(function(){
                        for (i=0;i<array.length;i++){
                            if ((jQuery(this).text())==array[i].code){
                                jQuery(this).text(array[i].mid);
                            }  //if
                        } // for
                    }) // function
                };//finish function searchCurrency
            searchCurrency(response);    
            }).fail(function(error) {
               console.log(error);
           }) // finish fail
}; //finish loadRate
        loadRate();
}); // finish ready    