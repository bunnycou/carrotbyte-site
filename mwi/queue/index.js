function showSlots() {
    let slotCount = document.getElementById("qslts").value;
    
    let slots = document.getElementById("slots");

    //slots.replaceChildren();

    if (slotCount > (slots.children.length/5)) { // if increasing
        for (let i = (slots.children.length/5); i < slotCount; i++) {
            let qtyLbl = document.createElement("label");
            qtyLbl.textContent = "Qty";
            let qty = document.createElement("input");
            qty.type = "number";
            qty.value = 100;
            qty.min = 1;
            qty.addEventListener("input", calc);
            qty.className = "queueQty";
    
            let timeLbl = document.createElement("label");
            timeLbl.textContent = "Time";
            let time = document.createElement("input");
            time.type = "number";
            time.value = 5.0;
            time.min = 0;
            time.addEventListener("input", calc);
            time.className = "queueTime";
    
            slots.appendChild(qtyLbl);
            slots.appendChild(qty);
            slots.appendChild(timeLbl);
            slots.appendChild(time);
            slots.appendChild(document.createElement("br"))
        }
    } else { // if decreasing
        for (let i = 0; i < 5; i++){
            slots.removeChild(slots.children[slots.children.length-1])
        }
    }

    calc()
}

function calc() {
    let seconds = 0;

    let qqty = Array.from(document.getElementsByClassName("queueQty"));
    let qtme = Array.from(document.getElementsByClassName("queueTime"));

    for (let i = 0; i < qqty.length; i++) {
        seconds += qqty[i].value * qtme[i].value;
    }

    let hours = Math.floor(seconds/3600)
    seconds = seconds - (hours*3600);
    let minutes = Math.floor(seconds/60);
    seconds = seconds - (minutes*60);

    seconds = Math.ceil(seconds);

    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    if (seconds < 10) {
        seconds = `0${seconds}`
    }

    document.getElementById("total").textContent = `Queue will take ${hours}:${minutes}:${seconds}`;
}

showSlots(); // call once to display default slots