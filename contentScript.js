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
    <div class="p-8 h-full gap-2 w-full flex justify-center items-start flex-col">
        <textarea id="prompt" type="text" class="h-96 w-full border border-gray-300 rounded-md px-4 py-2 text-black">${remember.prompt}</textarea>
        <button id="buttonClick" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold my-2 py-2 px-4 rounded">
            Click
        </button>
    </div>
`

    document.getElementById("buttonClick").onclick = async function insert() {
        const textArea = document.querySelectorAll("textarea")[1]
        const prompt = document.querySelector("#prompt")
        await chrome.storage.sync.set({ prompt: prompt.value })
        textArea.value = prompt.value + "\n: "
        textArea.focus()
    }
}

setInterval(contentScript, 3000)


