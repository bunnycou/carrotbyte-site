var XPDict;

fetch("./xp.json")
.then(Response => {
    return Response.json();
})
.then(data => XPDict = data);

function calc() {
    let target = document.getElementById("target").value;
    let current = document.getElementById("current").value;
    let per = document.getElementById("per").value;

    target = XPDict[target]
    if (current < 200) { current = XPDict[current]; }

    let totVal = Math.ceil((target-current)/per)

    document.getElementById("total").textContent = "Number of times to perform act is " + totVal
}