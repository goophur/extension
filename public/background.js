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

const setDefaults = async function () {
    chrome.storage.sync.set({
        user: {
            prefs: defaultPrefs
        },
        isLoggedIn: false
    }, () => {
        console.log("defaults set!")
    })
}

const updateUser = async function (userData) {
    chrome.storage.sync.set({
        user: userData,
        isLoggedIn: true
    }, () => {
        console.log("Updated!");
    })
}

const requestUserData = function (token) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/api/auth", true);
    xhr.setRequestHeader("x-auth-token", token);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            response = xhr.responseText;
            console.log(response);
            if (response.msg === "Token is not valid") {
                console.log("Invalid token");
            } else {
                console.log(response);
                updataUser(response);
            }
        }
    }
    xhr.send();
}

const checkForCookie = async function () {
    try {
        const {
            value: token
        } = await chrome.cookies.get({
            url: "http://localhost:3000",
            name: "token",
        });
        if (token) {
            requestUserData(token);
        }
    } catch (err) {
        console.log(err)
    }
}

chrome.runtime.onInstalled.addListener(async () => {
    await setDefaults();
    checkForCookie();
})


//might be excessive conditionals here - revise
chrome.cookies.onChanged.addListener(({
    removed,
    cookie
}) => {
    if (cookie.domain === "localhost") {
        if (removed) {
            console.log("Cookie removed!");
            setDefaults();
        } else {
            if (cookie.name === "token") {
                console.log("Cookie updated!")
                const token = cookie.value;
                requestUserData(token);
            }
        }
    }
})