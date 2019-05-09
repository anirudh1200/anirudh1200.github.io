const $ = (element, index) => {
	if (index) {
		return document.querySelectorAll(element)[index];
	}
	return document.querySelector(element);
}

let currentPage = 1;

$('#contactButton').addEventListener('click', () => {
	$('#page3').scrollIntoView();
	currentPage = 3;
	iconHighLight();
});

window.addEventListener('ontouchmove', () => {
	alert('done');
});

for (let i = 0; i < 2; i++) {
	$('.fa-github', i).addEventListener('click', () => {
		window.open('https://github.com/anirudh1200', '_blank');
	});
	$('.fa-linkedin', i).addEventListener('click', () => {
		window.open('https://www.linkedin.com/in/anirudh-bhat-a303a2179/', '_blank');
	});
	$('.roundButton', i).addEventListener('click', () => {
		$('#page'+(i+2)).scrollIntoView();
		currentPage = i + 2;
		iconHighLight();
	});
}

$('.fa-home').addEventListener('click', () => {
	$('#page1').scrollIntoView();
	currentPage = 1;
	iconHighLight();
});

$('.fa-eye').addEventListener('click', () => {
	$('#page2').scrollIntoView();
	currentPage = 2;
	iconHighLight();
});

$('.fa-envelope').addEventListener('click', () => {
	$('#page3').scrollIntoView();
	currentPage = 3;
	iconHighLight();
});

$('#hamburger').addEventListener('click', () => {
	if ($('#navIconsBox').style.transform === 'translateX(0px)') {
		$('#navIconsBox').style.transform = 'translateX(100%)';
	} else {
		$('#navIconsBox').style.transform = 'translateX(0)';
	}
});

let wheelActive = true;

window.addEventListener('wheel', e => {
	if (e.deltaY < 0) {
		if (currentPage === 2 && wheelActive) {
			$('#page1').scrollIntoView();
			currentPage = 1;
		} else if (currentPage === 3 && wheelActive) {
			$('#page2').scrollIntoView();
			currentPage = 2;
		}
	}
	if (e.deltaY > 0) {
		if (currentPage === 1 && wheelActive) {
			$('#page2').scrollIntoView();
			currentPage = 2;
			$('.fa-eye').classList.add('iconSelected');
		} else if (currentPage === 2 && wheelActive) {
			$('#page3').scrollIntoView();
			currentPage = 3;
		}
	}
	iconHighLight();
	wheelActive = false;
	setTimeout(() => wheelActive = true, 500);
});

const unselectAll = () => {
	$('.fa-home').classList.remove('iconSelected');
	$('.fa-eye').classList.remove('iconSelected');
	$('.fa-envelope').classList.remove('iconSelected');
}

const iconHighLight = () => {
	unselectAll();
	if (currentPage === 1)
		$('.fa-home').classList.add('iconSelected');
	else if (currentPage === 2)
		$('.fa-eye').classList.add('iconSelected');
	else if (currentPage === 3)
		$('.fa-envelope').classList.add('iconSelected');
}

$('#sendMessage').addEventListener('click', e => {
	e.preventDefault();
	let json = new Object();
	json.name = $('#nameInput').value;
	json.email = $('#emailInput').value;
	json.message = $('#messageInput').value;
	let today = new Date();
	json.date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
	let jsonString = JSON.stringify(json);
	console.log(jsonString);
	let req = new XMLHttpRequest();
	req.onreadystatechange = () => {
		if (req.readyState == XMLHttpRequest.DONE) {
			let response = JSON.parse(req.responseText);
			if (response.success = true) {
				$('#nameInput').value = '';
				$('#emailInput').value = '';
				$('#messageInput').value = '';
				$('#feedback').innerHTML = 'Message Sent Successfully';
			} else {
				$('#feedback').value = 'An Error Occured. Please free to contact me at my email.';
			}
		}
	};
	req.open("POST", "https://api.jsonbin.io/b", true);
	req.setRequestHeader("Content-type", "application/json");
	req.setRequestHeader("secret-key", "$2a$10$DX8QjjhwD.rZ1F/MhmbquO7WGbvDlt/mTI8o4PVTROZtjW58Cefa.");
	req.setRequestHeader("collection-id", "5cd2a1cf64d4fc359ead6a03");
	req.send(jsonString);
});