const firstName = document.querySelector("#firstName"),
    lastName = document.querySelector("#lastName"),
    number = document.querySelector("#number"),
    btn = document.querySelector("#btn");

function addRow(event) {
    event.preventDefault()

    if (!/^[а-яА-Яa-zA-Z\s]+$/.test(firstName.value)) {
        return alert('Enter your first name')
    }

    if (!/^[а-яА-Яa-zA-Z\s]+$/.test(lastName.value)) {
        return alert('Enter your last name')
    }

    if (!/^[0-9]+$/.test(number.value)) {
        return alert('Enter the phone number')
    }

    const thead = document.querySelector("thead");
    row = `<tr>
              <th>${firstName.value}</th>
              <th>${lastName.value}</th>
              <th>${number.value}</th>
              <th><button class="deleteBtn">Delete</button></th>
            </tr>`

    thead.insertAdjacentHTML("afterend", row);

    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#number").value = "";
}


btn.addEventListener("click", addRow);

function deleteRow(e) {
    if (!e.target.classList.contains("deleteBtn")) {
        return;
    }

    let btn = e.target;
    btn.closest("tbody").remove();
}

let removeEl = document.querySelector("table");
removeEl.addEventListener("click", deleteRow);