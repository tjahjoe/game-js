var body = document.getElementsByTagName("body")[0]
body.style.margin = 0
var canvas = document.getElementById("hitman")
canvas.width = innerWidth
canvas.height = innerHeight
canvas.style.backgroundColor = "black"
var ctx = canvas.getContext("2d")


var bulletCondition = false
var collectionOfBullets = []
var forChange = 0
var random = {
    posX: 0,
    posY: 0
}
var walkCondition = {
    moveUp: false,
    moveDown: false,
    moveLeft: false,
    moveRight: false
}

var positionHitman = {
    x: 0,
    y: 0
}

var hitTarget = false

// var hitmanDirection = {
//     xRight : true,
//     xLeft : true,
//     yUp : true,
//     yDown : true
// }

var point = 0

const positionTarget = () => {
    random.posX = Math.floor(Math.random() * 30) + 5
    random.posY = Math.floor(Math.random() * 30) + 5
}

const rectangle = () => {
    if (hitTarget) {
        ctx.beginPath()
        ctx.arc(random.posX * 10 - 5, random.posY * 10 - 5, 5, 0, 2 * Math.PI)
        ctx.stroke()
    } else {
        forChange = 0
    }
}

const condition = () => {
    if (forChange == 500) {
        forChange = 0
    } else if (forChange == 0) {
        positionTarget()
        hitTarget = true
        forChange++
    } else {
        forChange++
    }
}

const rectBullet = () => {
    for (let i = 0; i < collectionOfBullets.length; i++) {
        ctx.strokeRect(collectionOfBullets[i].x, collectionOfBullets[i].y, 10, 10)
        collectionOfBullets[i].x += 10
        if (collectionOfBullets[i].x - 10 >= innerWidth) {
            collectionOfBullets.splice(i, 1)
            i--
        } else if (collectionOfBullets[i].y == random.posY * 10 - 10 && collectionOfBullets[i].x == random.posX * 10 && hitTarget) {
            collectionOfBullets.splice(i, 1)
            i--
            hitTarget = false
            point++
        }
    }
}


const loop = () => {
    window.requestAnimationFrame(loop)
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    ctx.fillStyle = "white"
    ctx.strokeStyle = "white"
    condition()
    rectBullet()
    rectangle()
    ctx.fillRect(positionHitman.x, positionHitman.y, 10, 10)
    ctx.font = "50px Arial"
    ctx.fillText(`${point}`, innerWidth / 2 - 25, 50)
    

}
loop()

const bullet = () => {

    //need development
    // if (hitmanDirection.x == false && hitmanDirection.y == false) {
    //     collectionOfBullets.push({x : positionHitman.x - 10, y : positionHitman.y})
    // } else if (hitmanDirection.x == true && hitmanDirection.y == false) {
    //     collectionOfBullets.push({x : positionHitman.x - 10, y : positionHitman.y})
    // } else if (hitmanDirection.x == false && hitmanDirection.y == true) {
    //     collectionOfBullets.push({x : positionHitman.x, y : positionHitman.y + 10})
    // } else if (hitmanDirection.x == false && hitmanDirection.y == true) {
    //     collectionOfBullets.push({x : positionHitman.x, y : positionHitman.y - 10})
    // }
    collectionOfBullets.push({ x: positionHitman.x + 10, y: positionHitman.y })
}

const walk = {
    hitman: (e) => {
        if (e.key === "w") {
            walkCondition.moveUp = e.type === "keydown"
        }
        if (e.key === "s") {
            walkCondition.moveDown = e.type === "keydown"
        }
        if (e.key === "a") {
            walkCondition.moveLeft = e.type === "keydown"
        }
        if (e.key === "d") {
            walkCondition.moveRight = e.type === "keydown"
        }
        if (e.key === "k") {
            bulletCondition = e.type === "keydown"
        }

        if (walkCondition.moveUp) {
            positionHitman.y -= 10
        }
        if (walkCondition.moveDown) {
            positionHitman.y += 10
            // hitmanDirection.y = true
        }
        if (walkCondition.moveLeft) {
            positionHitman.x -= 10
            // hitmanDirection.x = false
        }
        if (walkCondition.moveRight) {
            positionHitman.x += 10
            // hitmanDirection.x = true
        }
        if (bulletCondition) {
            bullet()
        }
    }
}
window.addEventListener("keyup", walk.hitman)
window.addEventListener("keydown", walk.hitman)
