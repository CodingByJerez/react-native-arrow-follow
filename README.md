# react-native-arrow-follow

<img  src=".github/image/preview.gif?raw=true" height="280" />

## Installation

### - Installing:
```sh
yarn add react-native-arrow-follow
```


### - Installing dependencies:

- For Native project:
```sh
yarn add react-native-svg

pod install
```
- For Expo project:
```sh
expo install react-native-svg
```


## Usage

```tsx
import { ArrowFollow, CORNER, POSITION } from "react-native-arrow-follow";

// ...

  <ArrowFollow //
    width={200}
    height={200}
    color={"#000000"}
    size={14}
    start={{
      corner: CORNER.TOP_RIGHT,
      direction: POSITION.HORIZONTAL
    }}
    end={{
      corner: CORNER.BOTTOM_LEFT,
      direction: POSITION.HORIZONTAL
    }}
  />

// ...

```

## Documentation:

A React node that will be most likely wrapping your whole app.

| Name       | Description        | Require  | Default  | Type                                     |
| ---------- | ------------------ | -------- | -------- | ---------------------------------------- |
| height     | height rectangle   |     *    |          | number                                   |
| width      | width rectangle    |     *    |          | number                                   |
| size       | size line          |          | 12       | number                                   |
| color      | color code         |          | #000000  | string                                   |
| start      | start arrow        |     *    |          | {corner:CORNER, direction: POSITION}    |
| end        | end arrow          |     *    |          | {corner:CORNER, direction: POSITION}    |


```ts
type IProps = {
  height: number;
  width: number;
  size?: number;
  color?: string;
  start: {
    corner: CORNER | keyof typeof CORNER;
    direction: POSITION | keyof typeof POSITION
  };
  end: {
    corner: CORNER | keyof typeof CORNER;
    direction: POSITION | keyof typeof POSITION
  };
};
enum POSITION {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
}
enum CORNER {
  TOP_LEFT = 'TOP_LEFT',
  TOP_RIGHT = 'TOP_RIGHT',
  BOTTOM_TOP = 'BOTTOM_TOP',
  BOTTOM_BOTTOM = 'BOTTOM_BOTTOM',
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
