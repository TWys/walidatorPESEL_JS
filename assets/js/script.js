document.getElementById("walidate").addEventListener("click", walidateFunction);

// Funkcja sprawdzająca poprawność daty z numeru PESEL
function checkDate(d) {
	// Przeliczenie daty w formacie yyyy-mm-dd na Unix time
	data = Date.parse(d);
	// Utworzenie obiektu daty na podstawie Unix time
	data= new Date(d)
	// Utworzenie obiektu dzisiejszej daty i przeliczenie jej na Unix time
	dzis = Date.parse(new Date); 
	if (Date.parse(d) >= dzis) { // Sprawdzenie czy data z Peselu nie jest nowsza od daty dzisiejszej
		printResult(0);
	} 
	// Sprawdzenie czy przeliczenie daty z Peselu zapisanej w Unix time na format yyyy-mm-dd da taką samą datę jak ta podana w Peselu
	// (przeliczenie daty z Unix time zawsze da poprawną datę)
	else if ((data.getMonth()+1) != (d.charAt(5)*10+d.charAt(6))) {
		printResult(0);
	}
}

function walidateFunction() {
	var pesel;
	var wynik;
	var suma;
	var data;
	var pesel_tab =[];
	
	pesel = document.getElementById("pesel").value;
	for (var i=0;i<pesel.length;i++) {
	pesel_tab.push(parseInt(pesel.charAt(i),10));
	}

	suma=(9*pesel_tab[0]+7*pesel_tab[1]+3*pesel_tab[2]+pesel_tab[3]+9*pesel_tab[4]+7*pesel_tab[5]+3*pesel_tab[6]+pesel_tab[7]+9*pesel_tab[8]+7*pesel_tab[9])%10;	//suma kontrolna


	if (pesel.length != 11) {
		printResult(0);
		return;
	}
	
	if (isNaN(parseInt(pesel,10))) {
		printResult(0);
		return;
	}

	if (parseInt(pesel.charAt(2)) == 2 || parseInt(pesel.charAt(2)) == 3) {
		d='20'+pesel.charAt(0)+pesel.charAt(1)+'-'+(parseInt(pesel.charAt(2))-2)+pesel.charAt(3)+'-'+pesel.charAt(4)+pesel.charAt(5);
		checkDate(d);
	}
	else if (parseInt(pesel.charAt(2)) == 0 || parseInt(pesel.charAt(2)) == 1) {
		d='19'+pesel.charAt(0)+pesel.charAt(1)+'-'+pesel.charAt(2)+pesel.charAt(3)+'-'+pesel.charAt(4)+pesel.charAt(5);
		checkDate(d);
	}
	
	if (suma != pesel_tab[10]) {
		printResult(0);
		return;
	}
	
	else {
		printResult(1);
	}

}

function printResult(result) {
	
	if (result == 0) {
		wynik = "Pesel nieprawidłowy";
		document.querySelector('.result_box').style.color = "red";
	}
	else if (result == 1) {
		wynik = "Pesel prawidłowy";
		document.querySelector('.result_box').style.color = "green";
	}
	document.querySelector('.result_box').innerHTML = wynik;
	document.querySelector('.result_box').style.display = "block";
}