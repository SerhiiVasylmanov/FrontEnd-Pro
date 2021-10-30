const FORM_CLASS = "form";
const INPUT_USERNAME_CLASS = "input-username";
const ERROR_CLASS = "error-message";
const BTN_SEARCH_CLASS = "button-search";
const CONTAINER_CLASS = "container";
const AVATAR_TEMPLATE_CLASS = "avatar-template";
const DATA_TEMPLATE_CLASS = "date-template";

const formEl = document.querySelector("." + FORM_CLASS);
const btnEl = document.querySelector("." + BTN_SEARCH_CLASS);
const inputEl = document.querySelector("." + INPUT_USERNAME_CLASS);
const containerEl = document.querySelector("." + CONTAINER_CLASS);
const errorEl = document.querySelector("." + ERROR_CLASS);
const avatarHTML = document.querySelector("." + AVATAR_TEMPLATE_CLASS).innerHTML;
const dataWrapHTML = document.querySelector("." + DATA_TEMPLATE_CLASS).innerHTML;

const GIT_URL = "https://api.github.com/users/{{login}}";
const error = {
    emptyInput: "Пустое поле, введите пользователя",
    "Error: 404": "Не найдено",
};

formEl.addEventListener("click", (e) => onRootElClick(e));

function onRootElClick(e) {
    if (e.target.classList.contains(BTN_SEARCH_CLASS)) {
        if (inputEl.value) {
            getToData();
        } else {
            showError("emptyInput");
        }
    }
    if (e.target.classList.contains(INPUT_USERNAME_CLASS)) {
        cleareError();
    }
}

function getToData() {
    fetch(renderUrl())
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(res.status);
            }
        })
        .then((data) => {
            showUserInfo(data);
        })
        .catch((err) => {
            showError(err);
        });
}

function showUserInfo(data) {
    clearContainer();
    showAvatar(data);
    showData(data, "name");
    showData(data, "public_repos");
    showData(data, "followers");
    showData(data, "following");
}

function showAvatar(data) {
    addImgContent(data.avatar_url);
}

function showData(data, key) {
    addTextContent(getHeadingFromObjKey(key), data[key]);
}

function addImgContent(name) {
    containerEl.insertAdjacentHTML(
        "afterbegin",
        renderImgWrapHTML(avatarHTML, name)
    );
}

function addTextContent(title, cont) {
    containerEl.insertAdjacentHTML(
        "beforeend",
        renderDataWrapHTML(dataWrapHTML, title, cont)
    );
}

function renderImgWrapHTML(el, value) {
    return el.replace("{{path}}", value);
}

function renderDataWrapHTML(el, title, cont) {
    return el.replace("{{label}}", title).replace("{{value}}", cont);
}

function renderUrl() {
    return GIT_URL.replace("{{login}}", inputEl.value);
}

function getHeadingFromObjKey(kye) {
    const heading = kye.replace("_", " ");

    return heading[0].toUpperCase() + heading.slice(1);
}

function clearContainer() {
    containerEl.innerHTML = "";
}

function showError(err) {
    cleareError();

    errorEl.insertAdjacentHTML("beforeend", error[err]);
}

function cleareError() {
    errorEl.innerHTML = "";
}