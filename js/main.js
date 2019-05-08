const page1 = document.querySelector('#page1');
const page2 = document.querySelector('#page2');
const page3 = document.querySelector('#page3');
const homeIcon = document.querySelector('.fa-home');
const viewIcon = document.querySelector('.fa-eye');
const contactIcon = document.querySelector('.fa-envelope');
const contactButton = document.querySelector('#contactButton');
const rightArrow = document.querySelector('.fa-arrow-right');
const githubButton = document.querySelector('.fa-github');
const linkedinButton = document.querySelector('.fa-linkedin');
const roundButtons = document.querySelectorAll('.roundButton');
const sendMessage = document.querySelector('#sendMessage');

let currentPage = 1;

contactButton.addEventListener('mouseover', () => {
	rightArrow.style.transform = "rotate(90deg)";
});
contactButton.addEventListener('mouseout', () => {
	rightArrow.style.transform = "rotate(0deg)";
});

contactButton.addEventListener('click', () => {
	currentPage = 3;
	iconHighLight();
});

githubButton.addEventListener('mouseout', () => {
	window.open('https://github.com/anirudh1200', '_blank');
});

linkedinButton.addEventListener('mouseout', () => {
	window.open('https://www.linkedin.com/in/anirudh-bhat-a303a2179/', '_blank');
});

roundButtons[0].addEventListener('click', () => {
	currentPage = 2;
	iconHighLight();
});

roundButtons[1].addEventListener('click', () => {
	currentPage = 3;
	iconHighLight();
});

homeIcon.addEventListener('click', () => {
	currentPage = 1;
	iconHighLight();
});

viewIcon.addEventListener('click', () => {
	currentPage = 2;
	iconHighLight();
});

contactIcon.addEventListener('click', () => {
	currentPage = 3;
	iconHighLight();
});

let wheelActive = true;

window.addEventListener('wheel', e => {
	if (e.deltaY < 0) {
		if (currentPage === 2 && wheelActive) {
			page1.scrollIntoView();
			currentPage = 1;
		} else if (currentPage === 3 && wheelActive) {
			page2.scrollIntoView();
			currentPage = 2;
		}
	}
	if (e.deltaY > 0) {
		if (currentPage === 1 && wheelActive) {
			page2.scrollIntoView();
			currentPage = 2;
			viewIcon.classList.add('iconSelected');
		} else if (currentPage === 2 && wheelActive) {
			page3.scrollIntoView();
			currentPage = 3;
		}
	}
	iconHighLight();
	wheelActive = false;
	setTimeout(() => wheelActive = true, 500);
});

const unselectAll = () => {
	homeIcon.classList.remove('iconSelected');
	viewIcon.classList.remove('iconSelected');
	contactIcon.classList.remove('iconSelected');
}

const iconHighLight = () => {
	unselectAll();
	if (currentPage === 1)
		homeIcon.classList.add('iconSelected');
	else if (currentPage === 2)
		viewIcon.classList.add('iconSelected');
	else if (currentPage === 3)
		contactIcon.classList.add('iconSelected');
}

sendMessage.addEventListener('click', e => {
	e.preventDefault();
	let json = new Object();
	json.name = document.querySelector('#nameInput').value;
	json.email = document.querySelector('#emailInput').value;
	json.message = document.querySelector('#messageInput').value;
	let today = new Date();
	json.date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
	let jsonString = JSON.stringify(json);
	console.log(jsonString);
	let req = new XMLHttpRequest();
	req.onreadystatechange = () => {
		if (req.readyState == XMLHttpRequest.DONE) {
			let response = JSON.parse(req.responseText);
			if (response.success = true) {
				document.querySelector('#nameInput').value = '';
				document.querySelector('#emailInput').value = '';
				document.querySelector('#messageInput').value = '';
				document.querySelector('#feedback').innerHTML = 'Message Sent Successfully';
			} else {
				document.querySelector('#feedback').value = 'An Error Occured. Please free to contact me at my email.';
			}
		}
	};
	req.open("POST", "https://api.jsonbin.io/b", true);
	req.setRequestHeader("Content-type", "application/json");
	req.setRequestHeader("secret-key", "$2a$10$DX8QjjhwD.rZ1F/MhmbquO7WGbvDlt/mTI8o4PVTROZtjW58Cefa.");
	req.setRequestHeader("collection-id", "5cd2a1cf64d4fc359ead6a03");
	req.send(jsonString);
});