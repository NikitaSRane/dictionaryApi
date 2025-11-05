// getting dom elements by using id selector.

let input = document.querySelector("#data");
let search = document.querySelector("#search");
let show = document.querySelector("#show");

/////////////////////////////////////////////////////////////////////////////////////////////
//
// Function Name: getData
// Description: Used to connect with dictionary api and showing result using dom manipulation
// Input: None
// Output: None
// Author: Nikita Sagar Rane
// Date: 25/09/2025
//
//////////////////////////////////////////////////////////////////////////////////////////////


async function getData() 
{
    try {

        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`); // connect with http request and return promise object
        let data = await response.json(); // convert to json object

        // parsing required data from json object
        let word = data[0].word;

        let partOfSpeech = data[0].meanings[0].partOfSpeech;

        let definition = data[0].meanings[0].definitions[0].definition;

        let synonyms = data[0].meanings[0].synonyms;
        let synonymsHTML = synonyms.length > 0 ? synonyms.join(", ") : "Not Found"; // shorthand if-else

        let antonyms = data[0].meanings[0].antonyms;
        let antonymsHTML = antonyms.length > 0 ? antonyms.join(", ") : "Not Found";


        // Dom manipulation using innerHTML because multiple elements at a time.
        show.innerHTML = `<p><strong>Word:</strong> ${word}</p>
        <p><strong>Part of Speech:</strong> ${partOfSpeech} </p>
        <p><strong>Definitions:</strong> ${definition}</p>
        <p><strong>Synonyms:</strong> ${synonymsHTML}</p>
        <p><strong>Antonyms:</strong> ${antonymsHTML}</p>`;
    }
    catch (error) {
        show.innerHTML = `<p>Word not found</p>`; // api failed
    }
}

//////////////////////////////////////////////////////////
//
// Function Name: removeData
// Description: used to reset value
// Input: None
// Output: None
// Author: Nikita Sagar Rane
// Date: 25/09/2025
//
//////////////////////////////////////////////////////////

function removeData() {
    input.value = "";
    show.innerHTML = "";
}

//////////////////////////////////////////////////////////
//
// Function Name: main
// Description: entry point function
// Input: None
// Output: None
// Author: Nikita Sagar Rane
// Date: 25/09/2025
//
//////////////////////////////////////////////////////////

function main()
{
    // addEventListener use for multiple event at a single place
    search.addEventListener("click", getData);
    input.addEventListener("click", removeData);
    input.addEventListener("keypress",(event) =>{
        if(event.key === "Enter")
        {
            getData();
        }
    });
}

// Calling entry point function
main();