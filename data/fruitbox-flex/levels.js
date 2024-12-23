export const levels = [
  {
    level: 1,
    fruits: ['apple'],
    baskets: ['red'],
    styles: `#master{justify-content: flex-end;}`,
    instruction: `Fruitbox Flex is a game where you use CSS code to place fruits in the correct basket. Using the flex properties on the container with the id 'container', place the apple in the red basket.`,
    default: null,
    activeStyles: {
      title: '#container',
      default: ['display: flex;'],
    },
  },
  {
    level: 2,
    fruits: ['apple', 'banana'],
    baskets: ['red', 'yellow'],
    styles: `#master{justify-content: center;}`,
    instruction:
      'Use flex properties on the container to place the apple in the red basket and the banana in the yellow basket.',
    default: null,
    activeStyles: {
      title: '#container',
      default: ['display: flex;'],
    },
  },
  {
    level: 3,
    fruits: ['apple', 'banana', 'grapes'],
    baskets: ['red', 'yellow', 'violet'],
    styles: `#master{justify-content: space-around;}`,
    instruction:
      'Use flex properties on the container to place the apple in the red basket, the banana in the yellow basket and the grapes in the purple basket.',
    default: null,
    activeStyles: {
      title: '#container',
      default: ['display: flex;'],
    },
  },
  {
    level: 4,
    fruits: ['apple', 'banana', 'grapes'],
    baskets: ['red', 'yellow', 'violet'],
    styles: `#master{justify-content: space-between;}`,
    instruction:
      'Use flex properties on the container to place the apple in the red basket, the banana in the yellow basket and the grapes in the purple basket.',
    default: null,
    activeStyles: {
      title: '#container',
      default: ['display: flex;'],
    },
  },
  {
    level: 5,
    fruits: ['apple', 'banana', 'grapes'],
    baskets: ['red', 'yellow', 'violet'],
    styles: `#master{align-items: flex-end;}`,
    instruction:
      'Use flex properties on the container to place the apple in the red basket, the banana in the yellow basket and the grapes in the purple basket.',
    default: null,
    activeStyles: {
      title: '#container',
      default: ['display: flex;'],
    },
  },
  {
    level: 6,
    fruits: ['grapes'],
    baskets: ['violet'],
    styles: `#master{justify-content: center; align-items: center;}`,
    instruction: 'Place the grapes in the purple basket using flex properties on the container.',
    default: null,
    activeStyles: {
      title: '#container',
      default: ['display: flex;'],
    },
  },
  {
    level: 7,
    fruits: ['apple', 'banana', 'grapes'],
    baskets: ['red', 'yellow', 'violet'],
    styles: `#master{justify-content: space-around; align-items: flex-end;}`,
    instruction:
      'Use flex properties on the container to place the apple in the red basket, the banana in the yellow basket and the grapes in the purple basket.',
    default: null,
    activeStyles: {
      title: '#container',
      default: ['display: flex;'],
    },
  },
  {
    level: 8,
    fruits: ['apple', 'banana', 'grapes'],
    baskets: ['red', 'yellow', 'violet'],
    styles: `#master{flex-direction: row-reverse;}`,
    instruction:
      'Use flex properties on the container to place the apple in the red basket, the banana in the yellow basket and the grapes in the purple basket.',
    default: null,
    activeStyles: {
      title: '#container',
      default: ['display: flex;'],
    },
  },
  {
    level: 9,
    fruits: ['apple', 'banana', 'grapes'],
    baskets: ['red', 'yellow', 'violet'],
    styles: `#master{flex-direction: column;}`,
    instruction:
      'Use flex properties on the container to place the apple in the red basket, the banana in the yellow basket and the grapes in the purple basket.',
    default: null,
    activeStyles: {
      title: '#container',
      default: ['display: flex;'],
    },
  },
  {
    level: 10,
    fruits: ['apple', 'banana', 'grapes'],
    baskets: ['red', 'yellow', 'violet'],
    styles: `#master{flex-direction: row-reverse; justify-content: flex-end;}`,
    instruction:
      'Use flex properties on the container to place the apple in the red basket, the banana in the yellow basket and the grapes in the purple basket.',
    default: null,
    activeStyles: {
      title: '#container',
      default: ['display: flex;'],
    },
  },
  {
    level: 11,
    fruits: ['apple', 'banana', 'grapes'],
    baskets: ['red', 'yellow', 'violet'],
    styles: `#master{flex-direction: column; justify-content: flex-end;}`,
    instruction:
      'Use flex properties on the container to place the apple in the red basket, the banana in the yellow basket and the grapes in the purple basket.',
    default: null,
    activeStyles: {
      title: '#container',
      default: ['display: flex;'],
    },
  },
  {
    level: 12,
    fruits: ['apple', 'banana', 'grapes'],
    baskets: ['red', 'yellow', 'violet'],
    styles: `#master{flex-direction: column-reverse; justify-content: space-between;}`,
    instruction:
      'Use flex properties on the container to place the apple in the red basket, the banana in the yellow basket and the grapes in the purple basket.',
    default: null,
    activeStyles: {
      title: '#container',
      default: ['display: flex;'],
    },
  },
  {
    level: 13,
    fruits: ['apple', 'banana', 'grapes'],
    baskets: ['red', 'yellow', 'violet'],
    styles: `#master{flex-direction: row-reverse; justify-content: center; align-items: flex-end;}`,
    instruction:
      'Use flex properties on the container to place the apple in the red basket, the banana in the yellow basket and the grapes in the purple basket.',
    default: null,
    activeStyles: {
      title: '#container',
      default: ['display: flex;'],
    },
  },
  {
    level: 14,
    fruits: ['apple', 'banana', 'grapes'],
    baskets: ['red', 'yellow', 'violet'],
    styles: `#yellow{order:2;}`,
    instruction:
      'Use flex properties on the banana to place the apple in the red basket, the banana in the yellow basket and the grapes in the purple basket.',
    default: `#container{\ndisplay: flex;\n}`,
    activeStyles: {
      title: '#banana',
      default: [],
    },
  },
  {
    level: 15,
    fruits: ['apple', 'apple', 'apple', 'banana', 'apple'],
    baskets: ['red', 'red', 'red', 'yellow', 'red'],
    styles: `#yellow{order: -1;}`,
    instruction: `Use the 'order' property of flex-box on the banana to arrange all the apples in the red basket and the banana in the yellow basket.`,
    default: `#container {\ndisplay: flex;\n}`,
    activeStyles: {
      title: '#banana',
      default: [],
    },
  },
  {
    level: 16,
    fruits: ['banana', 'banana', 'apple', 'banana', 'banana'],
    baskets: ['yellow', 'yellow', 'red', 'yellow', 'yellow'],
    styles: `#red{align-self:flex-end;}`,
    instruction: `The 'align-self' property can be applied to specific items to align them within their flex container. It accepts the same values as 'align-items' and allows for the alignment of an individual item. So using 'align-self' place the apple in the red basket and all the bananas in the yellow basket.`,
    default: `#container {\ndisplay: flex;\nalign-items: flex-start;\n}`,
    activeStyles: {
      title: '#apple',
      default: [],
    },
  },
  {
    level: 17,
    fruits: ['apple', 'grapes', 'apple', 'grapes', 'grapes'],
    baskets: ['red', 'violet', 'red', 'violet', 'violet'],
    styles: `#red{align-self:flex-end;order:2;}`,
    instruction: `Arrange the apples in the red basket and the grapes in the purple basket using the 'order' and 'align-self' properties of flex-box on the apple.`,
    default: `#container {\ndisplay: flex;\nalign-items: flex-start;\n}`,
    activeStyles: {
      title: '#apple',
      default: [],
    },
  },
  {
    level: 18,
    fruits: ['banana', 'apple', 'apple', 'apple', 'apple', 'apple', 'grapes'],
    baskets: ['yellow', 'red', 'red', 'red', 'red', 'red', 'violet'],
    styles: `#master{flex-wrap:wrap;}`,
    instruction:
      'Use flex properties on the container to place the apples in the red basket, the banana in the yellow basket and the grapes in the purple basket.',
    default: null,
    activeStyles: {
      title: '#container',
      default: [`display:flex;`],
    },
  },
  {
    level: 19,
    fruits: [
      'apple',
      'apple',
      'apple',
      'apple',
      'apple',
      'banana',
      'banana',
      'banana',
      'banana',
      'banana',
      'grapes',
      'grapes',
      'grapes',
      'grapes',
      'grapes',
    ],
    baskets: [
      'red',
      'red',
      'red',
      'red',
      'red',
      'yellow',
      'yellow',
      'yellow',
      'yellow',
      'yellow',
      'violet',
      'violet',
      'violet',
      'violet',
      'violet',
    ],
    styles: `#master{flex-wrap:wrap;flex-direction:column;}`,
    instruction:
      'Use flex properties on the container to place the apples in the red basket, the bananas in the yellow basket and the grapes in the purple basket.',
    default: null,
    activeStyles: {
      title: '#container',
      default: [`display:flex;`],
    },
  },
  {
    level: 20,
    fruits: [
      'apple',
      'apple',
      'apple',
      'apple',
      'apple',
      'banana',
      'banana',
      'banana',
      'banana',
      'banana',
      'grapes',
      'grapes',
      'grapes',
      'grapes',
      'grapes',
    ],
    baskets: [
      'red',
      'red',
      'red',
      'red',
      'red',
      'yellow',
      'yellow',
      'yellow',
      'yellow',
      'yellow',
      'violet',
      'violet',
      'violet',
      'violet',
      'violet',
    ],
    styles: `#master{flex-flow:column wrap;}`,
    instruction:
      'Use flex properties on the container to place the apples in the red basket, the bananas in the yellow basket and the grapes in the purple basket.',
    default: null,
    activeStyles: {
      title: '#container',
      default: [`display:flex;`],
    },
  },
  {
    level: 21,
    fruits: ['apple', 'apple', 'apple', 'apple', 'apple', 'apple', 'apple', 'apple'],
    baskets: ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red'],
    styles: `#master{flex-wrap:wrap;align-content:flex-start;}`,
    instruction: 'Use flex properties on the container to place all the apples in the red basket.',
    default: null,
    activeStyles: {
      title: '#container',
      default: [`display:flex;`],
    },
  },
  {
    level: 22,
    fruits: ['grapes', 'grapes', 'grapes', 'grapes', 'grapes', 'grapes', 'grapes', 'grapes'],
    baskets: ['violet', 'violet', 'violet', 'violet', 'violet', 'violet', 'violet', 'violet'],
    styles: `#master{flex-wrap:wrap;align-content:flex-end;}`,
    instruction: 'Use flex properties on the container to place all the grapes in the purple basket.',
    default: null,
    activeStyles: {
      title: '#container',
      default: [`display:flex;`],
    },
  },
  {
    level: 23,
    fruits: ['apple', 'banana', 'banana', 'grapes', 'apple', 'banana', 'banana', 'grapes'],
    baskets: ['red', 'yellow', 'yellow', 'violet', 'red', 'yellow', 'yellow', 'violet'],
    styles: `#master{flex-wrap:wrap;flex-direction:column-reverse;align-content: center;}`,
    instruction: `Arrange the apples in the red basket, the bananas in the yellow basket and the grapes in the purple basket using a combination of 'flex-wrap', 'flex-direction', and 'align-content' properties of flex-box`,
    default: null,
    activeStyles: {
      title: '#container',
      default: [`display:flex;`],
    },
  },
  {
    level: 24,
    fruits: ['apple', 'banana', 'banana', 'banana', 'banana', 'grapes', 'grapes'],
    baskets: ['red', 'yellow', 'yellow', 'yellow', 'yellow', 'violet', 'violet'],
    styles: `#master{flex-wrap:wrap-reverse;flex-direction:column-reverse;align-content:space-between;justify-content:center;}`,
    instruction:
      'Arrange the apples in the red basket, the bananas in the yellow basket, and the grapes in the purple basket by utilizing all the flex properties learned so far.',
    default: null,
    activeStyles: {
      title: '#container',
      default: [`display:flex;`],
    },
  },
];
