async function contentScript() {
    let body
    try {
        body = document.querySelector('h1').parentElement
    } catch (error) {
        return setTimeout(contentScript, 500)
    }
    console.log('body: ', body);
    const remember = await chrome.storage.sync.get("prompt")
    console.log('remember: ', remember);
    body.innerHTML = `
    <div class="h-64 w-full gap-4 flex justify-center items-center">
        <textarea id="prompt" type="text" class="w-full border border-gray-300 rounded-md px-4 py-2 text-black">
        ${remember.prompt}</textarea>
        <button id="buttonClick" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Click
        </button>
    </div>
`

    document.getElementById("buttonClick").onclick = async function insert() {
        const textArea = document.querySelectorAll("textarea")[1]
        const prompt = document.querySelector("#prompt")
        console.log('prompt: ', prompt.value);
        await chrome.storage.sync.set({ prompt : prompt.value })
        textArea.value = prompt.value
        textArea.focus()
    }
}
window.addEventListener("DOMContentLoaded", (event) => {
    contentScript()
});


