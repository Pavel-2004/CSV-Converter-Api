/*

1) Step 1 is to take all of the data and convert it into list format. This is the data that will be submitted
2) Step 2 is to filter that data. For example split some data like CJ.TO turn into CJ as one column and TO turns into TSX as another column. This will be either to plug into the converter function
3) Map out all of the data into the converter function
4) Once user click download activate the function

 */

var selected = ''

//initializing everything: step 1
function initAll(result, type){
    //add other types
    if(type == 'questrade'){
        selected = 'questrade'
        return CSVtoArray(result)
    }
}



//detection for error cases. Will return false if error detected
function errorCase(args){
    //add if statement for new type in error case here

    //questrade
    if(selected == 'questrade'){
        if(checkArrayEqual(args[0], ['Transaction Date', 'Settlement Date', 'Action', 'Symbol', 'Description', 'Quantity', 'Price', 'Gross Amount', 'Commission', 'Net Amount', 'Currency', 'Account #', 'Activity Type', 'Account Type\r'])){
            //continue activation process
            return questTradeFilter(args)
        } else{
            return false
        }


    //case that nothing is selected
    } else {
        return false
    }



}




//filtering data. All of the different filter functions go here

//filtering for questrade
function questTradeFilter(data){
    final = []
    for (let i = 1; i < data.length; i++) {
        temp = []
        pushing = true
        for (let j = 0; j < data[i].length; j++) {
            if(j == 2){
                if(data[i][j] == 'Buy'){
                    temp.push('buy')
                    temp.push(data[i][j])
                } else if(data[i][j] == 'Sell'){
                    temp.push('sell')
                    temp.push(data[i][j])
                } else{
                    temp.push('unallocated')
                    temp.push(data[i][j])
                }
            } else if(j == 3){
                symbol = data[i][j].split('.')
                temp.push(symbol[0])
                if(symbol[1] == 'TO'){
                    temp.push('TSX')
                } else if(symbol[1] == 'VN'){
                    temp.push('TSXV')
                } else{
                    temp.push('other')
                }
            } else {
                if(!data[i][j]){
                    pushing = false
                }
                temp.push(data[i][j].replace(/(\r\n|\n|\r)/gm, ""))

            }


        }
        temp.push('QUESTRADE')
        if(pushing){
            final.push(temp)
        }

    }


    //converts all of the important columns into proper format
    return mapToProperFormat(final,{13:0, 0:1, 1:2, 4:3, 5:4, 16:5, 3:6, 2:7, 7:8, 8:9, 11:10})
}





