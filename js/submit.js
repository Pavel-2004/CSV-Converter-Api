//change this in the case that other columns will be added into the new format
var header = ["Account #",	'Trade date',	'Settlement date',	'Symbol',	'Exchange',	'Security name',	'TE type',	'Broker type',	'#units',	'$price/unit',	'Amount']


var filename

function setFileName(name){

    filename = name
}

function checkArrayEqual(arrayOne, arrayTwo){

    if(arrayOne.length == arrayTwo.length){
        for (let i = 0; i < arrayOne.length; i++) {
            if(arrayOne[i] != arrayTwo[i]){
                return false
            }
            return true
        }
    } else{
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

    return arrayToCsv(finalValue, 'test.csv', 'text/csv;encoding:utf-8')

}

function arrayToCsv(data, type){
    final = data.map(row =>
        row
            .map(String)
            .map(v => v.replaceAll('"', '""'))
            .map(v => `"${v}"`)
            .join(',')
    ).join('\r\n');
    downloadBlob(final, type)
}


function downloadBlob(content, contentType) {
    today = new Date();
    dd = String(today.getDate()).padStart(2, '0');
    mm = String(today.getMonth() + 1).padStart(2, '0');
    yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    filename = today + "_traders_edge_"+ input.files[0]["name"]



    console.log(filename)
    var blob = new Blob([content], { type: contentType });
    var url = URL.createObjectURL(blob);

    var pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
}


