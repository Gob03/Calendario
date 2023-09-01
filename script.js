document.addEventListener("DOMContentLoaded", ()=>{
	
	const replaceCalendarContainer = () => {
		const newCalendarContainer = document.createElement("div")
		newCalendarContainer.setAttribute("id","calendarContainer")

		const oldCalendarContainer = document.getElementById("calendarContainer")

		document.body.replaceChild(newCalendarContainer, oldCalendarContainer)
	}

	const getFirstDayOfMonth = (date, day) => {
		let firstDay = 0

		for( let dayIterator = day, i = date; i > 0; i--, dayIterator--){
			if(i == 1){
				firstDay = dayIterator
			}

			if(dayIterator == 0){
				dayIterator = 7
			}
		}
		return firstDay
	}

	//NORMAL O BISIESTO
	const selectTypeOfYear = (year) => {
		const normalYearMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
		const leapYearMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

		if( year % 4 == 0){
			return leapYearMonths
		}

		else{
			return normalYearMonths
		}
	}

	const createNextMonth = () => {
		const firstDayNextMonth = document.getElementById("firstDayNextMonth")
		const firstDayDayAtt = firstDayNextMonth.getAttribute("day")

		const calendarBody = document.getElementById("calendarBody")
		let calendarBodyMonthAtt = calendarBody.getAttribute("month")

		const calendarHeader = document.getElementById("calendarHeader")
		let calendarHeaderYearAtt = calendarHeader.getAttribute("year")

		if(calendarBodyMonthAtt == "11"){
			calendarBodyMonthAtt = "-1"
			calendarHeaderYearAtt++
		}

		replaceCalendarContainer()
		calendaryTemplate({date:1,
							day: parseInt(firstDayDayAtt),
							month: parseInt(++calendarBodyMonthAtt),
							year: parseInt(calendarHeaderYearAtt)
		})
	}

	const createPreviusMonth = () => {
		const lastDayPreviusMonth = document.getElementById("lastDayPreviusMonth")
		let lastDayDayAtt

		if( lastDayPreviusMonth){
			lastDayDayAtt = lastDayPreviusMonth.getAttribute("day")
		}
		else{
			lastDayDayAtt = "6"
		}	

		const calendarBody = document.getElementById("calendarBody")
		let calendarBodyMonthAtt = calendarBody.getAttribute("month")

		const calendarHeader = document.getElementById("calendarHeader")
		let calendarHeaderYearAtt = calendarHeader.getAttribute("year")

		selectedYear = selectTypeOfYear(calendarHeaderYearAtt)

		if(calendarBodyMonthAtt == "0"){
			calendarBodyMonthAtt = "12"
			calendarHeaderYearAtt--
		}

		replaceCalendarContainer()
		calendaryTemplate({date:selectedYear[--calendarBodyMonthAtt],
							day: lastDayDayAtt,
							month: parseInt(calendarBodyMonthAtt),
							year: parseInt(calendarHeaderYearAtt)
		})
	}

	const createCalendarHeader = (date, month, year) => {
		const literalMonths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
		const headerContainer = document.createElement("div")
		headerContainer.setAttribute("year", year)
		headerContainer.setAttribute("id","calendarHeader")

		const calendarContainer = document.getElementById("calendarContainer")
		calendarContainer.appendChild(headerContainer)

		const thisYear = document.createElement("div")
		thisYear.innerHTML = `${year}`
		headerContainer.appendChild(thisYear)

		const leftBtn = document.createElement("input")
		leftBtn.setAttribute("type","button")
		leftBtn.value = "<-"
		leftBtn.setAttribute("id", "leftBtn")
		leftBtn.addEventListener("click", createPreviusMonth)
		headerContainer.appendChild(leftBtn)

		const thisMonth = document.createElement("span")
		thisMonth.innerHTML = `${literalMonths[month]}`
		headerContainer.appendChild(thisMonth)

		const rightBtn = document.createElement("input")
		rightBtn.setAttribute("type","button")
		rightBtn.value = "->"
		rightBtn.addEventListener("click", createNextMonth)
		rightBtn.setAttribute("id", "rightBtn")
		headerContainer.appendChild(rightBtn)
	}

	const createCalendarBody = (date, dayFirstDay, month, year) => {
		const currentYearMonths = selectTypeOfYear(year)
		const days = ["D", "L", "M", "M", "J", "V", "S"]

		const calendarContainer = document.getElementById("calendarContainer")

		let firstDayOfMonth
		if(date > 1){
			firstDayOfMonth = getFirstDayOfMonth(date, parseInt(dayFirstDay))
		}

		else{
			firstDayOfMonth = dayFirstDay
		}

		const calendar = document.createElement("table")
		calendar.setAttribute("cellspacing","0")
		calendar.setAttribute("id","calendarBody")
		calendar.setAttribute("month", month)
		calendarContainer.appendChild(calendar)

		let dayCont = 1
		let daysNextMonthCont = 1
		for( let i = 0; i < 7; i++){
			const week = document.createElement("tr")
			calendar.appendChild(week)

			for(let j = 0; j < 7; j++){
				const day = document.createElement("td")
				week.appendChild(day)

				const dayText = document.createElement("span")
				day.appendChild(dayText)

				if(j == 0){
					dayText.classList.add("firstDayOfWeek")
				}

				if(i == 0){
					dayText.innerHTML = days[j]
					week.setAttribute("class", "firstRow")
					continue
				}

				if(i == 1 && j == firstDayOfMonth){
					dayText.setAttribute("id","firstDayCurrentMonth")
					dayText.setAttribute("day",j)
				}

				if(dayCont == currentYearMonths[month]){
					dayText.setAttribute("id","lastDayCurrentMonth")
					dayText.setAttribute("day",j)
				}

				if(i == 1 && j < firstDayOfMonth){
					if(month != 0){
						const getPreviusMonth = month - 1
						dayText.innerHTML = ((currentYearMonths[getPreviusMonth] - firstDayOfMonth) + 1) + j
						dayText.classList.add("otherMonthDays")}

					else{
						const getPreviusMonth = 11
						dayText.innerHTML = ((currentYearMonths[getPreviusMonth] - firstDayOfMonth) + 1) + j
						dayText.classList.add("otherMonthDays")
					}
					
					if( j == firstDayOfMonth-1){
						dayText.setAttribute("id","lastDayPreviusMonth")
						dayText.setAttribute("day",j)
					}

					continue
				}

				if(dayCont > currentYearMonths[month]){
					dayText.innerHTML = daysNextMonthCont
					daysNextMonthCont++
					dayText.classList.add("otherMonthDays")

					if(dayCont == currentYearMonths[month]+1){
						dayText.setAttribute("id","firstDayNextMonth")
						dayText.setAttribute("day",j)
						dayCont++
					}

					continue

				}

				dayText.classList.add("daysCurrentMonth")
				dayText.innerHTML = dayCont
				dayCont++

			}
		}
	}	

	const showEventsInCalendary = () => {
		const objDate = new Date()
		const currentDate = objDate.getDate()
		const currentMonth = objDate.getMonth()
		const currentYear = objDate.getFullYear()

		const calendarHeader = document.getElementById("calendarHeader")
		const calendarBody = document.getElementById("calendarBody")

		const yearOfCalendar = calendarHeader.getAttribute("year")
		const monthOfCalendar = calendarBody.getAttribute("month")

		const currentMonthDaysArray = document.getElementsByClassName("daysCurrentMonth")

		for( let i = 0; i < currentMonthDaysArray.length; i++){
			if(currentDate == currentMonthDaysArray[i].innerHTML && currentMonth == monthOfCalendar && currentYear == yearOfCalendar){
				currentMonthDaysArray[i].classList.add("todayEvent")
			}
		}
	}

	const calendaryTemplate = ({date, day, month, year}) => {
		createCalendarHeader(date, month, year)
		createCalendarBody(date, day, month, year)
		showEventsInCalendary()
	}


	console.log(localStorage)


	const date = new Date()
	console.log(date.getDate())
	calendaryTemplate({date: date.getDate(),
						day: date.getDay(),
						month: date.getMonth(),
						year: date.getFullYear()
	})
})