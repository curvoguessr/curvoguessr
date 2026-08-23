# CurvoGuessr

You will be shown an equation, and you must draw what you think it'll look like on the Cartesian plane. You'll get an accuracy score based on how closely your drawing matches the actual curve. Play through a variety of levels and test your intuition!

## How to Play

1. Choose a level.
2. Look at the given mathematical curve.
3. Draw the curve on the coordinate plane.
4. Submit your drawing.
5. Your drawing is compared with the target curve and given an accuracy score.

## Website

Play CurvoGuessr here:

https://curvoguessr.github.io/curvoguessr/

## Features

- Interactive graphing interface
- Multiple levels with increasing difficulty
- Automatic comparison between the user's drawing and the target curve
- Accuracy scoring

## Accuracy calculation

First, both the user-drawn curve and the actual graph curve are sampled into arrays of approximately 500 points each. The Kuhn-Markes algorithm is then used to find a minimum-cost bijective matching between the two sets of points. The error is the sum of the Euclidean distances between all matched pairs. Finally, the accuracy is calculated as
`100 × e^(-0.3 × error)`
and expressed as a percentage.

## Technologies

- HTML
- CSS
- JavaScript

## Project Structure

```text
curvoguessr/
├── css/
│   └── style.css
├── fonts/
│   ├── Bodoni.ttf
│   └── font
├── homepage/
│   ├── button.js
│   └── style.css
├── images/
│   ├── darkmode.png
│   ├── eraser.png
│   ├── erasercursordark.png
│   ├── erasercursorlight.png
│   ├── lightmode.png
│   ├── logo.png
│   ├── pen.png
│   ├── pencursordark.png
│   ├── pencursorlight.png
│   ├── questionmark.png
│   ├── undo.png
│   ├── lvl1.png
│   ├── lvl2.png
│   └── ...
├── index.html
├── js/
│   ├── button.js
│   ├── config.js
│   ├── error.js
│   ├── graph.js
│   ├── interaction.js
│   ├── main.js
│   └── math.js
├── levels/
│   ├── level1/
│   │   ├── config.js
│   │   └── index.html
│   ├── level2/
│   │   ├── config.js
│   │   └── index.html
│   └── ...
└── README.md
```
