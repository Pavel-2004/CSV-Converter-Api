CSV FILTERING
This easy to implement project allows trade files from different banks to be rearranged into the proper format that it needs to be in.

The goal was to make everything very maintainable and modifiable.

The way that this project works is that every time a user uploads a csv file of their trades, it will convert to a standard format
based on what is selected.


It follows the following steps:
1) It initializes the function based on what type is selected
2) It then converts all the data from the csv into an array
3) Next it checks for errors in the errorCase function. There is an if statement for every type which can have a unique error checking statment
in each. It can eiter return false or continue based on if the data is valid
4) Then it runs a filtering function if no errors, every type has a unique filtering function. This also can split some data or change it.
For example CJ:TO converts to CJ and TSX
5) Once it is done filtering the data it can then map the data. This function is included in the filter function. It takes an argument of
an array which is the csv filtered. The other argument should contain JSON format of the amount of columns in the new format in the format
of {originalIndex, newIndex} of the old and new template
6) Once it maps out all of the data into the new format, it will then download it as a csv.

Setting up a new final format:
1) You have to go into the logic.js file and changed the header variable to a list of the headers in the final csv format
2) Everywhere that the mapToProperFormat is being used, change it so that every column is being added in.


Setting up a new bank provider for the stock trade csv:
1) First add an if statement in the initAll function that changes the selected variable to the name of the original provider
2) Go to the error case and add in an if statement to check whether the selected type is the new provider name
3) Inside add if and else statement that return false if their is an error or they continue in the case that their are no errors
4) In case their are no errors run the new provider filtering function which you will now make. This function can manipulate the data in whatever
format you need it. Finally at the end of the filtering function you must run the mapToProperFormat function to rearange all of the data.
From their the program will take care of everything else

Setting it up:
1) Inside of the init.js file change the input to whatever id the file upload is inside of your project.
2) Also selectTypeInput variable in this init.js to the elemend that is a select input which allows you to choose the type of format the original file is in.  
2) Add a success handler inside of the eventlistener where the commented areas are
3) Link all the js files inside of your project through script tags





LOGS
Version 0 - 4/11/22 - Built layout of everything
- built layout
- only one original layout works which is the questrade original layout

Version 0.1 - 4/13/22 - Added RBC AND TD
- Fixed naming of the files 
- Added a selector option into initializing 
- Added RBC and TD filtering system
