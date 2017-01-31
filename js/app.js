jQuery(document).ready(function(){
// function to compare code currency to my table with json file
    function searchCurrency(response){
                    
                    var array1 = response[0].rates;
                    var array2 = response[1].rates;
                    var currencyToInner = jQuery('.toChange');
                    currencyToInner.each(function(){
                        for (i=0;i<array2.length;i++){
                            var $this = jQuery(this);
                            if ($this.text()==array2[i].code){
                                var rateToNum = Math.round(parseFloat(array2[i].mid)*10000)/10000;
                                $this.text(rateToNum);
                                if (array2[i].mid>array1[i].mid){
                                    $this.addClass('up');
                                    }
                                else{
                                    $this.addClass('down');
                                }
                            }  //if
                        } // for
                    }) // function
                };//finish function searchCurrency
    function loadRate() {
            $.ajax({
                    url: 'https://api.nbp.pl/api/exchangerates/tables/a/last/2',
                    dataType: 'json'
            }).done(function(response){
                // input data
                jQuery('.dataToInput').text(response[1].effectiveDate);
                searchCurrency(response);    
            }).fail(function(error) {
               console.log(error);
            }) // finish fail    
    }; //finish loadRate
        loadRate();
    // action on click to exchange currency
    jQuery('.count-btn').on('click', function(event){
        
        var amount = jQuery('.amount-input').val(),
            result = 0,
            currencyFrom = jQuery('.currencyFrom :selected').data('currency'),
            currencyTo = jQuery('.currencyTo :selected').data('currency'),
            textErrorMilion = jQuery('.text-error-milion'),
            hideResults = jQuery('.hide-result'),
            chart = jQuery('.chart'),
            textErrorCurrency = jQuery('.text-error-curency'),
            textErrorAmount = jQuery('.text-error-amount');
        
            if (amount>1000000){
                textErrorMilion.addClass('case-error');
                hideResults.removeClass('show-result');
                chart.removeClass('show-result');
                textErrorCurrency.removeClass('case-error')

                return false;
            }
        //case for amoount<0
            else if (amount<=0 || amount==''){
                    textErrorAmount.addClass('case-error');
                    hideResults.removeClass('show-result');
                    chart.removeClass('show-result');
                    textErrorMilion.removeClass('case-error');
                    textErrorCurrency.removeClass('case-error')
                    return false;
                }
            else{
                    textErrorAmount.removeClass('case-error')
                }
        // add condition for the replacement of the same currency
            if (currencyFrom == currencyTo){
                textErrorCurrency.addClass('case-error');
                hideResults.removeClass('show-result');
                chart.removeClass('show-result');
                textErrorMilion.removeClass('case-error');
                
                return false;
            }
            else{
                textErrorCurrency.removeClass('case-error');
                textErrorMilion.removeClass('case-error');
            }
            jQuery("button[value='60']").prop('disabled', true);
            drawTheChart(currencyFrom,currencyTo,60)
            
        // calculate the result and decimal to 2 place and rate to 4 place
        var rate = Math.round((jQuery('.'+currencyFrom).text())/(jQuery('.'+currencyTo).text())*10000)/10000;
        result = Math.round(amount * rate *100)/100;
        //innet results
        hideResults.addClass('show-result');  
        chart.addClass('show-result');
        jQuery('.amount-input').text(amount + ' ' + currencyFrom);
        jQuery('.restul-input').text(result + ' ' + currencyTo);
        jQuery('.exchange-input').text('1  ' + currencyFrom + ' = ' + rate+ ' ' + currencyTo );

        // event to take from NBP data for num of days
        jQuery('.main-content').on('click','.range-btn',function(event){
            jQuery('.range-btn').prop('disabled', false);
            jQuery(this).prop('disabled', true);
            var numDay =jQuery(this).val();
            drawTheChart(currencyFrom,currencyTo,numDay);
        event.preventDefault;
    })
        event.preventDefault();
    });//finish event
    
    // event to switch the currency betwen choice
    jQuery('.change-btn').on('click', function(event){
        var changeFrom = jQuery('.currencyFrom').val();
        var changeTo = jQuery('.currencyTo').val();
        jQuery('.currencyTo').val(changeFrom);
        jQuery('.currencyFrom').val(changeTo);
    })
    function drawTheChart (el1, el2, el3){
         if (el1=='PLN'){
            takeFirstPln(el2, el3);
            }
        else if (el2 =='PLN'){
            takeSecondPln(el1, el3);
        }
        else{
           takeForeignData(el1,el2,el3); 
        }
    }
}); // finish ready    