//set the input which will take in the csv
const input = document.getElementById("csv")
const selectedTypeInput = document.getElementById("type")
var name = ''
var options = ["questrade", "TD", "RBC"]
for (let i = 0; i < options.length; i++) {
    if(i == 0){
        document.getElementById("type").value = options[0]
    }
    option = document.createElement("option")
    option.innerText = options[i]
    option.value = options[i]
    document.getElementById("type").append(option)
}

input.addEventListener('change', function(e){
    //this is temporary until more types are addeda
    selectedType = selectedTypeInput.value
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    document.write(today);

    const reader = new FileReader()
    name =  today + "_traders_edge_"+ input.files[0]["name"]
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
