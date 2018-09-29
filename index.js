window.onload = function () {
	const form = document.querySelector(".form");
	const btn = document.querySelector(".btnSubmit");
	const list = document.querySelector(".list");
	const btnClr = document.querySelector(".btnClr");
	const input = document.querySelector(".input");
	let id = 1;
	// listItem = {item: "todo item", checked: flase}
	let liItem = "";
	let todoList = [];
	btn.addEventListener("click", addTodoItem);
	list.addEventListener("click", boxChecked);
	btnClr.addEventListener("click", clearList);
	//sumbint on enter
	input.addEventListener("keypress", checkEnter);
	function checkEnter() {
		if (event.keyCode == 13) {
			addTodoItem();
		}
	}
	if (localStorage.length <= 0) {
		console.log("empty");
	}
	//checking localstorage has data
	if (localStorage.length > 0) {
		displayList();

	}
	//add todo item to list
	function addTodoItem() {
		if (input.value === "") {
			alert("You must enter some value!");
		} else {
			let text = input.value;
			let item = `<li id="li-${id}"><span>${text}</span><input id="box-${id}" type="checkbox"></li>`;
			list.innerHTML += item;
			liItem = {
				item: text,
				checked: false
			};
			todoList.push(liItem);
			id++;
			addToLocalStorage()
		}
		input.value = "";
		whichChecked();

	}
	//adding string through style to list itme
	function boxChecked(event) {
		const element = event.target;
		if (element.type === "checkbox") {
			todoList = JSON.parse(localStorage.getItem("todoList"));
			todoList[element.id.split('-')[1] - 1].checked = element.checked.toString();
			localStorage.setItem("todoList", JSON.stringify(todoList));
			let id = element.id;
			ChangeClassStrike(todoList[element.id.split('-')[1] - 1].checked, id);
		}
	}
		//change  li
	function ChangeClassStrike(boolean, id) {
		id = id.slice(4);
		if (boolean == "true") {
			let whichLi = document.getElementById(`li-${id}`).childNodes[0]
			whichLi.classList.add("strikethrough");
		} else {
			let whichLi = document.getElementById(`li-${id}`).childNodes[0]
			whichLi.classList.remove("strikethrough");
		}
	}
	//adding data to local storage
	function addToLocalStorage() {
		if (typeof (Storage) !== "undefined") {
			localStorage.setItem("todoList", JSON.stringify(todoList));
		} else {
			alert("error or browser doesn't support local storage!");
		}
	}
	//display all todo list
	function displayList() {
		todoList = JSON.parse(localStorage.getItem("todoList"));
		todoList.forEach(function (element) {
			let text = element.item;
			let item = `<li id="li-${id}"><span>${text}</span><input id="box-${id}" class="checkboxes"  type="checkbox"></li>`;
			list.innerHTML += item;
			id++;
		});
		whichChecked()
	}
		//checking localstraoge which is already checked
	function whichChecked() {
		todoList = JSON.parse(localStorage.getItem("todoList"));
		for (let i = 0; i < todoList.length; i++) {
			if (todoList[i].checked == "true" || todoList[i].checked == true) {
				list.childNodes[3 + i].childNodes[1].checked = true;
				console.log(list.childNodes[3 + i].childNodes[0]);
				list.childNodes[3 + i].childNodes[0].classList.add("strikethrough");
			} else {
				list.childNodes[3 + i].childNodes[1].checked = false;
			}
		}
	}
	//clear list event listener
	function clearList() {
		todoList = [];
		localStorage.clear();
		list.innerHTML = "";
		id = 1;
	}
}