// function to count rate from PLN to foreign currency
function countOneChart(currency){
    var element = jQuery(currency.rates);
    var dataChart = [];
    
    for (i=0;i<element.length;i++){
        var newData = (element[i].effectiveDate).split('-');
        var DataChart = new Date(newData[0], newData[1]-1, newData[2]);
            var tmpData={
                y: Math.round(1/element[i].mid*10000)/10000,
                x: DataChart
            }
        dataChart.push(tmpData);
    }
    var chartData =  {
            labels : chartData,
            datasets: [{
                label: 'Rate for 1 PLN to 1 '+currency.code,
                fill: false,
                borderColor: 'rgba(57,91,119,1)',
                pointBorderColor: 'rgba(57,91,119,1)',
                pointBackgroundColor: 'rgba(57,91,119,1)',
                lineTension: 0.1,
                pointHoverRadius: 8,
                spanGaps: false,
                data: dataChart
            }]
        };
    return chartData;   
}
//function to count from foreign currency to PLN
function countSecondChart(currency){
    var element = jQuery(currency.rates);
    var dataChart = [];
    
    for (i=0;i<element.length;i++){
        var newData = (element[i].effectiveDate).split('-');
        var DataChart = new Date(newData[0], newData[1]-1, newData[2]);
            var tmpData={
                y: Math.round(element[i].mid*10000)/10000,
                x: DataChart
            }
        dataChart.push(tmpData);
    }
    var chartData =  {
            labels : chartData,
            datasets: [{
                label: 'Rate for 1 '+currency.code+' to 1 PLN ',
                fill: false,
                borderColor: 'rgba(57,91,119,1)',
                pointBorderColor: 'rgba(57,91,119,1)',
                pointBackgroundColor: 'rgba(57,91,119,1)',
                lineTension: 0.1,
                pointHoverRadius: 8,
                spanGaps: false,
                data: dataChart
            }]
        };
    return chartData;
}
function countChart(curFrom,curTo){
    var elementFrom = jQuery(curFrom.rates);
    var elementTo = jQuery(curTo.rates);
    var dataChart = [];
    var chartLabels = [];
    for (i=0;i<elementFrom.length;i++){
            var newData = (elementFrom[i].effectiveDate).split('-');
            var DataChart = new Date(newData[0], newData[1]-1, newData[2]);
            //var dataToLable = moment(elementFrom[i].effectiveDate);
            var tmpData={
                y: Math.round(elementFrom[i].mid/elementTo[i].mid*10000)/10000,
                x: DataChart
            }
        dataChart.push(tmpData);
        //chartLabels.push(elementFrom[i].effectiveDate);
    }    
    var chartData =  {
            labels : chartData,
            datasets: [{
                label: 'Rate for 1 '+curFrom.code+ ' to 1 '+curTo.code,
                fill: false,
                borderColor: 'rgba(57,91,119,1)',
                pointBorderColor: 'rgba(57,91,119,1)',
                pointBackgroundColor: 'rgba(57,91,119,1)',
                lineTension: 0.1,
                pointHoverRadius: 8,
                spanGaps: false,
                data: dataChart
            }]
        };
    return chartData;
} // finish countChart
function printChart(dataChart){
    var ctx =  document.getElementById('chart').getContext('2d');
    
    var scatterChart = new Chart(ctx, {
        type: 'line',
        
        data: dataChart,
        options: {
            scales:{
                xAxes: [{
                     type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                'day': 'MMM DD',

                            }
                        }
                }]
            }
        }
    });
}
function takeForeignData(element1, element2) {
    var currency1;    
    var currency2;
    var chartData;
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
                        chartData = countChart(currency1,currency2);
                        
                        printChart(chartData);
                        
                    }).fail(function(error) {
                        console.log(error);
                    }) // finish fail    
                }).fail(function(error) {
                console.log(error);
            }) // finish fail
        return chartData;
    }; //finish takeForeignData
function takeFirstPln(element1) {
    var currency;
    var chartData;
    $.ajax({
                url: 'http://api.nbp.pl/api/exchangerates/rates/a/'+element1+'/last/30/?format=json',
                dataType: 'json'
                }).done(function(response){
                // input data
                currency=response;
                chartData = countOneChart(currency);
                printChart(chartData);
                }).fail(function(error) {
                console.log(error);
            }) // finish fail
    
}
function takeSecondPln(element){
    var currency;
    var chartData;
    $.ajax({
                url: 'http://api.nbp.pl/api/exchangerates/rates/a/'+element+'/last/30/?format=json',
                dataType: 'json'
                }).done(function(response){
                // input data
                currency=response;
                chartData = countSecondChart(currency);
                printChart(chartData);
                }).fail(function(error) {
                console.log(error);
            }) // finish fail
}
