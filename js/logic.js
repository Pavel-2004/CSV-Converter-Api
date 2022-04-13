//change this in the case that other columns will be added into the new format
var header = ["Account Num",	'Trade date',	'Settlement date',	'Symbol',	'Exchange',	'Security name',	'TE type',	'Broker type',	'num units',	'$price/unit',	'Amount']


function checkArrayEqual(arrayOne, arrayTwo){
    console.log(arrayOne.length)
    if(arrayOne.length == arrayTwo.length){
        for (let i = 0; i < arrayOne.length; i++) {
            if(arrayOne[i] != arrayTwo[i]){
                console.log(arrayOne[i], arrayTwo[i])
                return false
            }
            return true
        }
    } else{
        console.log("length")
        return false
    }

}


function CSVtoArray(text) {
    final = text.split('\n').map(function (line){
        return line.split(',')
    })
    return errorCase(final)
};


//takes in format of {originalIndex:newIndex}. Rearranges the function
function mapToProperFormat(currentData, args){
    final = []

    //initializes the array
    for (let i = 0; i < currentData.length; i++) {
        add = []
        for (let j = 0; j < Object.keys(args).length; j++) {
            add.push('')
        }
        final.push(add)
    }
    //maps everything out
    for (let i = 0; i < currentData.length; i++) {
        for (let j = 0; j < currentData[i].length; j++) {
            //bug possible if JSON.parse could turn ints into strings

            if(Object.keys(args).includes(String(j))){
                final[i][args[j]] = currentData[i][j]
            }
        }
    }


    finalValue = []
    finalValue.push(header)
    for (let i = 0; i < final.length; i++) {
        finalValue.push(final[i])
    }
    console.log(finalValue)
    return downloadCSV(finalValue, 'test.csv', 'text/csv;encoding:utf-8')

}




//download the csv
function downloadCSV(data, fileName, mimeType){
    csvContent = 'data:text/csv;charset=utf-8,'
    data.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    console.log(name)
    link.setAttribute("download", name);
    document.body.appendChild(link); // Required for FF

    link.click();
    return true
}
