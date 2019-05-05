const defaultPrefs = [{
        name: "Search Term(s)",
        type: "FormInput",
        value: "",
        querySegment: value => {
            return value ? `&as_q=${value.replace(/\s+/g, "+")}` : ""
        }
    },
    {
        name: "Exact Match",
        type: "FormInput",
        value: "",
        querySegment: value => {
            return value ? `&as_epq=${value.replace(/\s+/g, "+")}` : ""
        }
    },
    {
        name: "Include Any",
        type: "FormInput",
        value: "",
        querySegment: value => {
            return value ? `&as_oq=%28${value.replace(/\s+/g, "+")}%29` : ""
        }
    },
    {
        name: "Exclude Each",
        type: "FormInput",
        value: "",
        querySegment: value => {
            return value ? `&as_eq=${value.replace(/\s+/g, "+")}` : ""
        }
    },
]

const handleCookie = function () {
    chrome.cookies.get({
        url: "http://localhost:3000",
        name: "token",
    }, cookie => {
        console.log(cookie.value);
        const token = cookie.value;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/api/auth", true);
        xhr.setRequestHeader("x-auth-token", token);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log(xhr.responseText);
                chrome.storage.sync.set({
                    user: xhr.responseText
                }, () => {
                    console.log("Updated!")
                })
            }
        }
        xhr.send();
    })
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        user: {
            prefs: defaultPrefs
        },
        isLoggedIn: false
    }, () => {
        console.log("defaults set!")
    });
    handleCookie();
})

chrome.cookies.onChanged.addListener((changeInfo) => {
    console.log(changeInfo.cookie);
})