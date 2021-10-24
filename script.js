let body = document.querySelector("body")
window.addEventListener("load", ()=>{
    checkLocalStoreg()
});

function checkLocalStoreg(){
    let data = localStorage.getItem("data")
    console.log(data);
    if(data != null){
        let temp = JSON.parse(data)
        console.log(temp);
        min.value = temp.min
        third.value = temp.third
        max.value = temp.max
        selc.selected = temp.choice
        for(let i, j = 0; i = selc.options[j]; j++){
            if(i.value == selc.selected){
                selc.selectedIndex = j;
                break
            }
        }
        calculation(temp)
    } else {
        min.value = ""
        third.value = ""
        max.value = ""
    }
};

let min = document.querySelector("#min")
min.addEventListener("keyup", ()=>{
    third.value = min.value * 2
});

let save = document.querySelector("#save")
save.addEventListener("click", ()=>{
    saveToLocal()
});

function saveToLocal(){
    console.log(selc.value);
    let obj = {min:min.value,third:third.value,max:max.value,choice:selc.value}

    localStorage.setItem("data", JSON.stringify(obj))
    location.reload();
};

function calculation(param){
    let table = document.querySelector("#table")
    let duplication
    let duplicationZero
    let zero = 0
    let loss = 0
    let tempThird = param.third
    if (param.choice == "solid") {
        duplication = 3
        duplicationZero = 2
    } else {
        duplication = 4
        duplicationZero = 3
    }

    let i = 1 
    while((tempThird * 2) + zero <= param.max) {
        if(i == 1) {
            let tr = document.createElement("tr")
            let tdRound = document.createElement("td")
            tdRound.innerHTML = i
            let tdThird = document.createElement("td")
            tdThird.innerHTML = tempThird
            let tdZero = document.createElement("td")
            tdZero.innerHTML = zero 
            let tdWin = document.createElement("td")
            tdWin.innerHTML = tempThird - zero - loss 
            let tdLoss = document.createElement("td")
            tdLoss.innerHTML = ((tempThird * 2) + zero)
            let tdWinZero = document.createElement("td")
            tdWinZero.innerHTML = zero

            tr.appendChild(tdRound)
            tr.appendChild(tdThird)
            tr.appendChild(tdZero)
            tr.appendChild(tdWin)
            tr.appendChild(tdLoss)
            tr.appendChild(tdWinZero)

            table.appendChild(tr)



            
            loss = tempThird * 2 
            zero = 500
            tempThird = tempThird * (duplication)

            
        } else {
            let tr = document.createElement("tr")
            let tdRound = document.createElement("td")
            tdRound.innerHTML = i
            let tdThird = document.createElement("td")
            tdThird.innerHTML = tempThird
            let tdZero = document.createElement("td")
            tdZero.innerHTML = zero
            let tdWin = document.createElement("td")
            tdWin.innerHTML = tempThird - zero - loss
            let tdLoss = document.createElement("td")
            tdLoss.innerHTML = loss + (tempThird * 2) + zero
            let tdWinZero = document.createElement("td")
            tdWinZero.innerHTML = (zero * 36) - (loss + (tempThird * 2) + zero)

            tr.appendChild(tdRound)
            tr.appendChild(tdThird)
            tr.appendChild(tdZero)
            tr.appendChild(tdWin)
            tr.appendChild(tdLoss)
            tr.appendChild(tdWinZero)

            table.appendChild(tr)


            loss = loss + (tempThird * 2) + zero
            zero = zero * duplicationZero
            tempThird = tempThird * 4

        }


    i ++
    }
}

let saveResults = document.querySelector("#saveResults")
saveResults.addEventListener("click", ()=>{
    if (entry.value == "" || outing.value == "") {
        alert("הכנס קודם")
        return
    }
    resualltSum.innerHTML += "תוצאה :" + (outing.value - entry.value)
    saveResultsToLocl()
})

function saveResultsToLocl(){
    let date = new Date(Date.now())
    date = date.toLocaleDateString()

    console.log(date);

    let arr = []

    let objResult = {date:date, results:outing.value - entry.value}
    

    let dataResult = localStorage.getItem("dataResult")
    if (dataResult == null) {
        arr.push(objResult)
        localStorage.setItem("dataResult",JSON.stringify(arr))
    } else {
        let temp = JSON.parse(dataResult)
        arr = [...temp]
        arr.push(objResult)
        console.log(arr);
        localStorage.setItem("dataResult",JSON.stringify(arr))
    }
}


let showResults = document.querySelector("#showResults")
showResults.addEventListener("click", ()=>{
    showResultsFromLocl()
})

function showResultsFromLocl(){
    let historyResults = document.querySelector("#historyResults")
    historyResults.innerHTML = ""
    let temp = localStorage.getItem("dataResult")
    if (temp == null) {
        alert("אין לך תוצאות שמורות")
    } else {
        temp = JSON.parse(temp)
        console.log(temp);
        for(i = temp.length -1; i >= 0; i--) {
            console.log(temp[i]);
            let h3 = document.createElement("h3")
            h3.innerHTML = `תאריך: ${temp[i].date} סכום: ${temp[i].results}`
            historyResults.appendChild(h3)
        }
    }
}

let rmAll = document.querySelector("#rmAll")
rmAll.addEventListener("click", ()=>{
    if (confirm("האם ברצונך למחוק את כלל נתוני המערכת?")) {
        localStorage.clear()
        location.reload()
    }
})

let rmCasino = document.querySelector("#rmCasino")
rmCasino.addEventListener("click", ()=>{
    localStorage.removeItem("data")
    alert("הנתונים נמחקו בהצלחה")
    location.reload()
})