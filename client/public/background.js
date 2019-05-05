chrome.runtime.onInstalled.addListener(function () {
    chrome.cookies.get({
    url: "http://localhost:3000",
    name: "token",  
}, cookie => {
    console.log(cookie)
})
})

// chrome.cookies.onChanged.addListener(function () {

// })