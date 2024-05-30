//let maparr = [[ 0, 0, 0],[ 0, 0, 0],[ 0, 0, 0]]
maparr = [      [14,14,14,14,14,14,14, 5, 5, 0, 0],
                [14,14,14,14,14, 5, 5, 0, 0, 0, 0],
                [14,14,14, 5, 5, 0, 0, 0, 0, 0, 8],
                [14, 5, 5, 0, 0,10, 0, 0, 0, 0, 0],
                [ 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

overlayarr = [  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0,13,12],
                [ 0, 0, 0, 0, 0, 0, 0,13,12, 0, 0],
                [ 0, 0, 0, 0,16, 0,16, 0, 0, 0, 0],
                [ 0, 0, 0,16,17,11,17, 0, 0, 0, 0],
                [ 0,13,12, 0,17, 0,12,13, 0, 0, 0],
                [12, 0, 0, 0, 0, 0, 0, 0,16, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0, 0,17,12, 0],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,13],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

overlayrot = [  [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
                [  0,  0,  0,  0,  0,  0,  0,  0,  0,-60,  0],
                [  0,  0,  0,  0,  0,180,  0,-60,  0,  0,  0],
                [  0,  0,  0,  0, 60,  0,-60,  0,  0,  0,  0],
                [  0,  0,  0,  0, 60,  0,-60,  0,  0,  0,  0],
                [  0,-60,  0,  0,  0,  0, 60,  0,  0,  0,  0],
                [  0,  0,  0,  0,  0,  0,  0,  0, 60,  0,  0],
                [  0,  0,  0,  0,  0,  0,  0,  0, 60, 60,  0],
                [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
                [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
]


let tilemap = []

for (let i = 0; i < 41; i++) {
    let top = Math.floor(i/8)
    let left = i%8
    tilemap.push([48*top, 32*(left+1), 48*(top+1), 32*left]) // top, right, bottom, left
}

let overmap = [[ 0, 0, 0, 0]]

for (let i = 1; i <= 22; i++) {
    if (i < 11) {
        let top = Math.floor(i/7)
        let left = i%7
        overmap.push([(48*top)+16, 32*(left+1), 48*(top+1), 32*left])
    } else {
        let top = Math.floor((i-11)/7)+2
        let left = (i-11)%7
        overmap.push([(48*top)+16, 32*(left+1), 48*(top+1), 32*left])
    }
}

let tileHeight = 28
let tileWidth = 32

let screemedgeoffset = 0//window.screen.width/100

let tiles = []

for (let row = 0; row < maparr.length; row++){
    for (let col = 0;  col < maparr[row].length; col+=2) {
        tiles.push(imgElement(maparr[row][col], row, col))
        if (overlayarr[row][col] != 0) {
            tiles.push(imgOverElement(overlayarr[row][col], row, col))
        }
    }
    for (let col = 1; col < maparr[row].length; col+=2) {
        tiles.push(imgElement(maparr[row][col], row, col))
        if (overlayarr[row][col] != 0) {
            tiles.push(imgOverElement(overlayarr[row][col], row, col))
        }
    }
}

let divmap = document.getElementById("map")

tiles.forEach(tile => {
    divmap.appendChild(tile)
});

function imgElement(tileIndex, row, col) {
    ele = document.createElement("img")
    ele.src = "fantasyhextiles_v3.png"

    let tileAttr = tilemap[tileIndex]
    let tileTop = screemedgeoffset-tileAttr[0]+(28*row)-1
    let tileLeft = screemedgeoffset-tileAttr[3]+(24*col)
    if (col%2 != 0) { //odd, needs vertical offset
        tileTop += 14
    }

    ele.style = `position: absolute; clip: rect(${tileAttr[0]+1}px,${tileAttr[1]}px,${tileAttr[2]}px,${tileAttr[3]}px); top: ${tileTop}px; left: ${tileLeft}px;`

    return ele
}

// function imgElement(tileIndex, row, col) {
//     let ele = document.createElement("canvas")
//     let ctx = ele.getContext("2d")

//     let tileAttr = tilemap[tileIndex]

//     ctx.drawImage("fantasyhextiles_v3.png", tileAttr[3], tileAttr[1])
// }

function imgOverElement(tileIndex, row, col) {
    ele = document.createElement("img")
    ele.src = "fantasyhextiles_randr_4_v1.png"

    let tileAttr = overmap[tileIndex]
    let tileRot = overlayrot[row][col]
    let tileTop = screemedgeoffset-tileAttr[0]+(28*row)+16
    let tileLeft = screemedgeoffset-tileAttr[3]+(24*col)
    if (col%2 != 0) { //odd, needs vertical offset
        tileTop += 14
    }

    ele.style = `position: absolute; clip: rect(${tileAttr[0]}px,${tileAttr[1]}px,${tileAttr[2]}px,${tileAttr[3]}px); transform: rotate(${tileRot}deg); top: ${tileTop}px; left: ${tileLeft}px; 
    transform-origin: ${tileAttr[3]+16}px ${tileAttr[0]+16}px;`
    
    return ele
}

