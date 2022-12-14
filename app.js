const AUTH_ROUTE = 'https://dummyjson.com/auth/login';
const STORAGE_KEY = 'userInfo';
const userInfo = getUserInfoFromStorage();

if (userInfo) {
    setUserInfo(userInfo);
    hideLoginForm(document.forms[0]);
}
else {
    document.getElementById('logout-button').classList.add('in-visible')
}

function login(event) {
    event.preventDefault();

    const { username, password } = event.target.children;
    const usernameValue = username.value;
    const passwordValue = password.value;

    const postData = {
        username: usernameValue,
        password: passwordValue
    }

    fetch(AUTH_ROUTE,
        {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: { 'Content-Type': 'application/json' }
        }
    )
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                showErrorMesssage(data.message);
            }
            else {
                setUserInfo(data);
                saveUserToStorage(data);
                hideLoginForm(event.target)
            }
        })

}

function logout() {
    localStorage.clear(STORAGE_KEY);
    window.location.reload();
}

function showErrorMesssage(message) {
    const errorElement = document.getElementsByClassName('error-message')[0];
    errorElement.textContent = message;
    errorElement.classList.add('visible');
}

function setUserInfo(userInfo) {
    const userInfoElement = document.getElementsByClassName('user-info')[0];
    userInfoElement.textContent = `გამარჯობა ${userInfo.firstName} ${userInfo.lastName}`;
}

function saveUserToStorage(userInfo) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userInfo))
}

function getUserInfoFromStorage() {
    const userInfo = localStorage.getItem(STORAGE_KEY)
    if (userInfo) {
        return JSON.parse(userInfo)
    }
    else {
        return undefined;
    }
}

function hideLoginForm(form) {
    form.classList.add('in-visible');
}