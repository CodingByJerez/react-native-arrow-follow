# react-native-arrow-follow

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
import { ArrowFollow } from "react-native-arrow-follow";

// ...

  <ArrowFollow //
    width={200}
    height={200}
    color={"#000000"}
    size={14}
    start={{
      corner: 'TOP_RIGHT',
      direction: 'HORIZONTAL'
    }}
    end={{
      corner: 'BOTTOM_LEFT',
      direction: 'HORIZONTAL'
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
| start      | start arrow        |     *    |          | {corner:ICorner, direction: POSITION}    |
| end        | end arrow          |     *    |          | {corner:ICorner, direction: POSITION}    |


```ts
type IProps = {
  height: number;
  width: number;
  size?: number;
  color?: string;
  start: { corner: ICorner; direction: POSITION | keyof typeof POSITION };
  end: { corner: ICorner; direction: POSITION | keyof typeof POSITION };
};
enum POSITION {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
}
enum HORIZONTAL {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}
enum VERTICAL {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
}

export type ICorner = `${VERTICAL}_${HORIZONTAL}`;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
