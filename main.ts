function showImage (_image: number) {
    if (_image == 0) {
        basic.showIcon(IconNames.ArrowNorth)
    } else if (_image == 1) {
        basic.showIcon(IconNames.ArrowEast)
    } else if (_image == 2) {
        basic.showIcon(IconNames.ArrowSouth)
    } else if (_image == 3) {
        basic.showIcon(IconNames.ArrowWest)
    }
}
input.onButtonPressed(Button.A, function () {
    guess = guess - 1
    if (guess < 0) {
        guess = 3
    }
    music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
    showImage(guess)
})
input.onButtonPressed(Button.AB, function () {
    if (imageList[guessCounter] == guess) {
        basic.setLedColor(0x00ff00)
        music.playTone(349, music.beat(BeatFraction.Whole))
        music.playTone(523, music.beat(BeatFraction.Whole))
        game.addScore(1)
        guess = 0
        if (imageList.length == guessCounter + 1) {
            level += 1
            basic.pause(2000)
            startRound()
        } else {
            guessCounter += 1
        }
    } else {
        basic.setLedColor(0xff0000)
        music.playTone(523, music.beat(BeatFraction.Whole))
        music.playTone(349, music.beat(BeatFraction.Whole))
        music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
        game.gameOver()
    }
})
input.onButtonPressed(Button.B, function () {
    guess = (guess + 1) % 4
    showImage(guess)
})
function startRound () {
    basic.turnRgbLedOff()
    basic.showAnimation(`
    . . . . . . . . . . . . # . .
    . . . . . . . # . . . # . # .
    . . # . . . # . # . # . . . #
    . . . . . . . # . . . # . # .
    . . . . . . . . . . . . # . .
    `)
basic.clearScreen()
    basic.pause(1000)
    for (let image of imageList) {
        showImage(image)
        basic.clearScreen()
        basic.pause(400)
    }
    random = randint(0, 3)
    imageList.push(random)
    showImage(random)
    basic.clearScreen()
    guessCounter = 0
}
let random = 0
let guessCounter = 0
let imageList: number[] = []
let guess = 0
let level = 1
game.setScore(0)
startRound()
