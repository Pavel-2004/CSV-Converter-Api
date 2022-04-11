//set the input which will take in the csv
const input = document.getElementById("csv")
var name = ''


input.addEventListener('change', function(e){
    //this is temporary until more types are addeda
    selectedType = 'questrade'
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    document.write(today);

    const reader = new FileReader()
    name =  today + "_" + input.files[0]["name"] + "_TradersEdge.csv"
    reader.onload = function (){
        content = initAll(reader.result, selectedType)
        result = errorCase(content)


        if(result){
            //successful case
        } else{
            //error occurred
        }
    }
    reader.readAsText(input.files[0])
})
