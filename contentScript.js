async function contentScript() {
    let body
    console.log('try');
    try {
        body = document.querySelectorAll('div')[6]
        if(!body){
            throw {name : "Error div found", message : "not Found"};
        }        
    } catch (e) {
        return;   
    }
  
    if (!document.querySelector("#boxPrompt")) {
        const remember = await chrome.storage.sync.get("prompt") ||  ''
        body.insertAdjacentHTML("afterbegin",`
        <div id="boxPrompt"class="p-4 gap-2 h-64 w-full flex justify-center items-start flex-col">
            <textarea id="prompt" type="text" class="h-64 w-full border border-gray-300 rounded-md px-4 py-2 text-black">${remember.prompt}</textarea>
            <button id="buttonClick" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Add Prompt
            </button>
        </div>
    `)
        document.getElementById("buttonClick").onclick = async function insert() {
            const textArea = document.querySelectorAll("textarea")[1]
            const prompt = document.querySelector("#prompt")
            console.log('prompt: ', prompt.value);
            await chrome.storage.sync.set({ prompt: prompt.value })
            textArea.value = prompt.value + "\n: "
            textArea.focus()
        }
    }
}

setInterval(contentScript,1500)







