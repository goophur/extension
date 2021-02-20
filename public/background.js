const site = "http://goophur.herokuapp.com"

const setDefaults = async function () {
    chrome.storage.sync.set({
        user: {},
        isLoggedIn: false
    }, () => {
        console.log("defaults set!")
    })
}

const updateUser = function (userData) {
    chrome.storage.sync.set({
        user: userData,
        isLoggedIn: true
    }, () => {
        console.log("User updated!");
    })
}

const requestUserData = function (token) {
    const url = `${site}/api/auth`;
    fetch(url, {
            method: "GET",
            headers: {
                "x-auth-token": token
            }
        })
        .then(response => response.json())
        .then(jsonRes => {
            if (jsonRes.msg === "Token is not valid") {
                console.log("Invalid token");
            } else {
                console.log(jsonRes);
                updateUser(jsonRes);
            }
        })
        .catch(err => console.log(err))
}

const checkForCookie = function () {
    chrome.cookies.get({
        url: site,
        name: "token",
    }, cookie => {
        if (cookie !== null) {
            const token = cookie.value;
            if (token) {
                requestUserData(token);
            }
        }
    });
}

chrome.runtime.onInstalled.addListener(async () => {
    await setDefaults();
    checkForCookie();
})


//might have excessive conditionals here - revise
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