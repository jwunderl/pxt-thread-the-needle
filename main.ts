namespace SpriteKind {
    export const Needle = SpriteKind.create()
    export const Thread = SpriteKind.create()
    export const NeedleTop = SpriteKind.create()
}

//% block="Thread" icon="\uf0d0"
namespace threadtheneedle {
    //% block="thread the needle with $color"
    //% color.shadow=colorindexpicker
    //% color.defl=10
    export function runGame(color: number) {
        game.pushScene();

        let isHittingNeedle = false
        const needleHole = sprites.create(img`
            . c . 
            c . c 
            c . c 
            c . c 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            . . . 
            `, SpriteKind.NeedleTop)
        const mainNeedle = sprites.create(img`
            . . . 
            . . c 
            . . c 
            . . c 
            c c c 
            c c c 
            c c c 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c c 9 
            c 9 9 
            c 9 9 
            c 9 9 
            c 9 9 
            c 9 9 
            c 9 9 
            c 9 9 
            c 9 9 
            c 9 9 
            c 9 9 
            c 9 9 
            c 9 9 
            c 9 9 
            c c 9 
            . c . 
            . c . 
            . 1 . 
            `, SpriteKind.Needle)
        needleHole.setPosition(140, 60)
        mainNeedle.setPosition(140, 60)
        mainNeedle.z = 10
        const hand = sprites.create(img`
            ............................................aaaa
            ...........................................aa...
            ........................................aaaa....
            ................................eee....aa.......
            .............................eeeedde.aaa........
            ...........................eedddd3de.aeee.......
            ..........................eeddd3333eeaede.......
            .........................eedddd3333deaddee......
            ........................eedddddddddeeedddee.....
            .......................eeddddddddeeeeddddee.....
            ......................eeddddddddeeeeddddde......
            ....................eeeddddddddeeeedddddee......
            ...................eedddddddddeeeddddddeee......
            ..................eeddddddddeeeeddddddedde......
            .................eeddddddddeeeddddddeeddde......
            ...............eeeddddddddeeeedddddeedddee......
            ...............eddddddddddeeddddddeedddee.......
            ..............eddddddddddddddddddeedddeeee......
            ..............eddddddddddddddddeeddddeedde......
            .............eedddddddddddddddeeddddedddde......
            .............eddddddddddddddddddddeeddddde......
            .............edddddddddddddddddddeedddeede......
            .............edddddddddddddddddddeddddede.......
            ...........aaeddddddddddddddddddddddeedde.......
            ...........a.eddddddddddddddddddddddeddde.......
            .........aa..edddddddddddddddddddddedddee.......
            ........a....edddddddddddddddddddddddee.........
            .......a.....eeddddddddddddddddddddeee..........
            ......a.......edddddddddddddddddddee............
            .....aa.......eeddddddddddddddeeee..............
            .....a.........edddddddddddddee.................
            ...aa..........eeddddddddeeeee..................
            ..aa...........eeeeeeeeeee......................
            `, SpriteKind.Player)
        hand.setPosition(18, 77)
        controller.moveSprite(hand, 300, 300)
        const threadDisplay = sprites.create(img`
            a a a a a a a a a a
        `, SpriteKind.Thread)
        hand.image.replace(10, color);
        threadDisplay.image.replace(10, color);
        spriteutils.createRenderable(
            -5,
            scr => scr.drawLine(0, 120, hand.left + 1, hand.bottom, color)
        );
        game.onUpdate(() => {
            threadDisplay.top = hand.top
            threadDisplay.left = hand.right
            if (threadDisplay.overlapsWith(needleHole) || threadDisplay.overlapsWith(mainNeedle)) {
                if (threadDisplay.overlapsWith(needleHole)) {
                    if (hand.vx > 0 && threadDisplay.top > needleHole.top + 1) {
                        threadDisplay.z = 5
                    } else if (!isHittingNeedle) {
                        threadDisplay.z = 15
                        hand.z = 15;
                    }
                } else {
                    threadDisplay.z = 15
                    hand.z = 15;
                }
                isHittingNeedle = true
            } else {
                isHittingNeedle = false
                threadDisplay.z = 15
                hand.z = 15;
            }
        })
        pauseUntil(() => 
            threadDisplay.overlapsWith(needleHole)
            && threadDisplay.z == 5
            && threadDisplay.right >= mainNeedle.right + 2
        );
        controller.moveSprite(hand, 0, 0);
        hand.startEffect(effects.hearts);
        hand.z = 0;
        pause(1500)
        game.popScene();
    }
}
