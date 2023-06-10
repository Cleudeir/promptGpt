async function contentScript() {
    let body
    console.log('start');
    try {
        body = document.querySelector('h1').parentElement
    } catch (error) {
        return
    }
    const remember = await chrome.storage.sync.get("prompt")
    body.innerHTML = `
    <div class="p-8 h-64 w-full gap-4 flex justify-center items-start flex-col">
        <textarea id="prompt" type="text" class="w-full border border-gray-300 rounded-md px-4 py-2 text-black">${remember.prompt}</textarea>
        <button id="buttonClick" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Click
        </button>
    </div>
`

    document.getElementById("buttonClick").onclick = async function insert() {
        const textArea = document.querySelectorAll("textarea")[1]
        const prompt = document.querySelector("#prompt")
        await chrome.storage.sync.set({ prompt: prompt.value })
        textArea.value = prompt.value + "\ncode: "
        textArea.focus()
    }
}

setInterval(contentScript, 2000)


