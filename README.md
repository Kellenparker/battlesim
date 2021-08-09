# Bare Bones Battle Simulator

## Try it here: https://battlesimulator.netlify.app/

### Background

This was a simple project I made to help introduce myself to web developement. In it's current state it is nowhere near being perfectly balanced and refined, but I will continue to keep updating it.

### Information

The simulator was designed with 18th century warfare in mind which explains the three different divisions being infantry, artillery, and cavalry.

There are three stages to the battle:
1. Artillery barrage, the initial stage where artillery bombardment happens.
2. Line Firing, where the two lines of infantry fire upon each other.
3. Retreating, where the retreating army will continue to take heavy losses.

An army is at risk of surrendering if their morale is below 15.

There is no bounds to the sizes you can make the armies, but beware, crazy numbers may give crazy results.

### Algorithm Design

My approach to the battle simulator put a heavy emphasis on losses and morale. Essentially, each tick the armies will take losses. Every parameter is combined to determine how much losses the armies take. The morale is then adjusted for each army depending on the amount of losses that they took during the tick.

There is also a heavy element of randomness in this simulator. I did not want the same battle to happen the same way every time, and I also wanted upsets to be possible.
