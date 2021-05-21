import React, { Component } from 'react';
import Svg, { Defs, Marker, Path } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';

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

type IProps = {
  height: number;
  width: number;
  size?: number;
  color?: string;
  start: { corner: ICorner; direction: POSITION | keyof typeof POSITION };
  end: { corner: ICorner; direction: POSITION | keyof typeof POSITION };
};

type IState = {
  aspectRatio: number;
  viewBox: [number, number, number, number];
  size: number;
  route: string;
  triangleOrient: number;
  margins: any[];
};

class ArrowFollow extends Component<IProps, IState> {
  /**
   * @type {number}
   * @private
   */
  private _xl!: number;

  /**
   * @type {number}
   * @private
   */
  private _xr!: number;

  /**
   * @type {number}
   * @private
   */
  private _yt!: number;

  /**
   * @type {number}
   * @private
   */
  private _yb!: number;

  /**
   * @type {number}
   * @private
   */
  private _radium!: number;

  /**
   * @type {{width:number, height:number}}
   * @private
   */
  private _triangle!: { width: number; height: number };

  /**
   * @param {IProps} props
   */
  constructor(props: IProps) {
    super(props);
    this.state = { ...this._initAspect(props), ...this._initArrow(props) };
  }

  /**
   * @param {Readonly<IProps>} prevProps
   */
  public componentDidUpdate = (prevProps: Readonly<IProps>): void => {
    if (prevProps.size !== this.props.size || prevProps.width !== this.props.width || prevProps.height !== this.props.height) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ ...this._initAspect(this.props), ...this._initArrow(this.props) });
    } else if (prevProps.start !== this.props.start || prevProps.end !== this.props.end) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState((prevState) => ({ ...prevState, ...this._initArrow(this.props) }));
    }
  };

  /**
   * @param {IProps} props
   * @return {Omit<IState, "route" | "triangleOrient" | "margins">}
   */
  private _initAspect = (props: IProps): Omit<IState, 'route' | 'triangleOrient' | 'margins'> => {
    const //
      aspectRatio: IState['aspectRatio'] = props.height / props.width,
      viewBox: IState['viewBox'] = [0, 0, 1000, 1000 * aspectRatio],
      size: IState['size'] = ((viewBox[2] / props.width) * (props.size ?? 12)) / 2;

    this._xl = 0;
    this._xr = viewBox[2];
    this._yt = 0;
    this._yb = viewBox[3];
    this._radium = viewBox[2] / 4;
    this._triangle = { width: size * 3, height: size * 3 };

    return { aspectRatio, viewBox, size };
  };

  /**
   * @param {{corner:ICorner, direction:POSITION | keyof typeof POSITION}} start
   * @param {{corner:ICorner, direction:POSITION | keyof typeof POSITION}} end
   * @param width
   * @return {Pick<IState, "triangleOrient" | "route" | "margins">}
   */
  private _initArrow = ({ start, end, width }: IProps): Pick<IState, 'triangleOrient' | 'route' | 'margins'> => {
    const _start: [v: VERTICAL, h: HORIZONTAL] = start.corner.split('_') as unknown as [v: VERTICAL, h: HORIZONTAL];
    const _end: [v: VERTICAL, h: HORIZONTAL] = end.corner.split('_') as unknown as [v: VERTICAL, h: HORIZONTAL];

    const triangleOrient = this._arrowOrient(_end, end.direction as POSITION);
    const starPoint = this._getStart(_start, start.direction as POSITION, _end, end.direction as POSITION);
    const centerPoints = this._startCenter(_start, start.direction as POSITION, _end, end.direction as POSITION);
    const enPoint = this._getEnd(_end, end.direction as POSITION);
    const margins = this._getMarginView(_start, start.direction as POSITION, _end, end.direction as POSITION, width);
    return { route: starPoint + centerPoints + enPoint, triangleOrient, margins };
  };

  /**
   * @param {VERTICAL} startVertical
   * @param {HORIZONTAL} startHorizontal
   * @param {POSITION} startPosition
   * @param {VERTICAL} endVertical
   * @param {HORIZONTAL} endHorizontal
   * @param {POSITION} endPosition
   * @param width
   * @return {any[]}
   */
  private _getMarginView = (
    [startVertical, startHorizontal]: [v: VERTICAL, h: HORIZONTAL],
    startPosition: POSITION,
    [endVertical, endHorizontal]: [v: VERTICAL, h: HORIZONTAL],
    endPosition: POSITION,
    width: number
  ) => {
    const { _triangle } = this;
    const triangleWidthMiddle = (_triangle.width / 2 / this._xr) * width;
    const margins = [];
    if (startVertical === endVertical || startHorizontal === endHorizontal) {
      if (startPosition === POSITION.HORIZONTAL) {
        if (startVertical === VERTICAL.TOP) {
          margins.push({ top: -triangleWidthMiddle });
        } else {
          margins.push({ bottom: -triangleWidthMiddle });
        }
      } else {
        if (startHorizontal === HORIZONTAL.LEFT) {
          margins.push({ left: -triangleWidthMiddle });
        } else {
          margins.push({ right: -triangleWidthMiddle });
        }
      }
    } else if (startPosition !== endPosition) {
      if (startPosition === POSITION.HORIZONTAL) {
        if (startHorizontal === HORIZONTAL.LEFT) {
          margins.push({ right: -triangleWidthMiddle });
        } else {
          margins.push({ left: -triangleWidthMiddle });
        }
      } else {
        if (startVertical === VERTICAL.TOP) {
          margins.push({ top: +triangleWidthMiddle });
        } else {
          margins.push({ bottom: +triangleWidthMiddle });
        }
      }
    } else {
      if (startPosition === POSITION.HORIZONTAL) {
        if (startVertical === VERTICAL.TOP) {
          margins.push({ bottom: -triangleWidthMiddle });
        } else {
          margins.push({ top: -triangleWidthMiddle });
        }
      } else {
        if (startHorizontal === HORIZONTAL.LEFT) {
          margins.push({ right: -triangleWidthMiddle });
        } else {
          margins.push({ left: -triangleWidthMiddle });
        }
      }
    }

    return margins;
  };

  /**
   * @param {VERTICAL} startVertical
   * @param {HORIZONTAL} startHorizontal
   * @param {POSITION} startPosition
   * @param {VERTICAL} endVertical
   * @param {HORIZONTAL} endHorizontal
   * @param {POSITION} _
   * @return {string}
   */
  private _getStart = (
    [startVertical, startHorizontal]: [v: VERTICAL, h: HORIZONTAL],
    startPosition: POSITION,
    [endVertical, endHorizontal]: [v: VERTICAL, h: HORIZONTAL],
    _: POSITION
  ): string => {
    const { _xl, _xr, _yt, _yb, _triangle } = this;
    const triangleWidthMiddle = _triangle.width / 2;
    const self = _triangle.width / 5;
    let x: number, y: number;
    if (startHorizontal === endHorizontal) {
      x = startHorizontal === HORIZONTAL.LEFT ? _xl + triangleWidthMiddle : _xr - triangleWidthMiddle;
      y = startVertical === VERTICAL.TOP ? _yt : _yb;
    } else if (startVertical === endVertical) {
      x = startHorizontal === HORIZONTAL.LEFT ? _xl : _xr;
      y = startVertical === VERTICAL.TOP ? _yt + triangleWidthMiddle : _yb - triangleWidthMiddle;
    } else {
      if (startHorizontal === HORIZONTAL.LEFT) {
        x = _xl;
        if (startPosition === POSITION.VERTICAL) {
          x += self;
        }
      } else {
        x = _xr;
        if (startPosition === POSITION.VERTICAL) {
          x -= self;
        }
      }

      if (startVertical === VERTICAL.TOP) {
        y = _yt;
        if (startPosition === POSITION.HORIZONTAL) {
          y += self;
        }
      } else {
        y = _yb;
        if (startPosition === POSITION.HORIZONTAL) {
          y -= self;
        }
      }
    }
    return `M${x},${y}`;
  };

  /**
   * @param {VERTICAL} startVertical
   * @param {HORIZONTAL} startHorizontal
   * @param {POSITION} startPosition
   * @param {VERTICAL} endVertical
   * @param {HORIZONTAL} endHorizontal
   * @param {POSITION} endPosition
   * @return {string}
   */
  private _startCenter = (
    [startVertical, startHorizontal]: [v: VERTICAL, h: HORIZONTAL],
    startPosition: POSITION,
    [endVertical, endHorizontal]: [v: VERTICAL, h: HORIZONTAL],
    endPosition: POSITION
  ): string => {
    const { _xl, _xr, _yt, _yb, _radium, _triangle } = this;
    const self = _triangle.width / 5;
    const triangleWidthMiddle = _triangle.width / 2;
    if (startVertical === endVertical || startHorizontal === endHorizontal) {
      return '';
    } else if (startPosition !== endPosition) {
      let // Bezier
        Xs: [number, number, number],
        Ys: [number, number, number];
      if (startHorizontal === 'LEFT') {
        if (startPosition === 'VERTICAL') {
          Xs = [_xl + self, _xl + self, _xl + _radium];
        } else {
          Xs = [_xr - triangleWidthMiddle - _radium, _xr - triangleWidthMiddle, _xr - triangleWidthMiddle];
        }
      } else {
        if (startPosition === 'VERTICAL') {
          Xs = [_xr - self, _xr - self, _xr - self - _radium];
        } else {
          Xs = [_xl + triangleWidthMiddle + _radium, _xl + triangleWidthMiddle, _xl + triangleWidthMiddle];
        }
      }

      if (startVertical === 'TOP') {
        if (startPosition === 'VERTICAL') {
          Ys = [_yb - triangleWidthMiddle - _radium, _yb - triangleWidthMiddle, _yb - triangleWidthMiddle];
        } else {
          Ys = [_yt + self, _yt + self, _yt + self + _radium];
        }
      } else {
        if (startPosition === 'VERTICAL') {
          Ys = [_yt + triangleWidthMiddle + _radium, _yt + triangleWidthMiddle, _yt + triangleWidthMiddle];
        } else {
          Ys = [_yb - self, _yb - self, _yb - self - _radium];
        }
      }

      return ` ${Xs[0]},${Ys[0]} Q${Xs[1]},${Ys[1]} ${Xs[2]},${Ys[2]}`;
    } else {
      const //
        _xrMiddle = _xr / 2,
        _ybMiddle = _yb / 2;
      let // Bezier
        X1s: [number, number, number],
        Y1s: [number, number, number],
        X2s: [number, number, number],
        Y2s: [number, number, number];

      if (startHorizontal === HORIZONTAL.LEFT) {
        if (startPosition === POSITION.VERTICAL) {
          X1s = [_xl + self, _xl + self, _xl + self + _radium];

          X2s = [_xr - triangleWidthMiddle - _radium, _xr - triangleWidthMiddle, _xr - triangleWidthMiddle];
        } else {
          X1s = [_xrMiddle - _radium, _xrMiddle, _xrMiddle];
          X2s = [_xrMiddle, _xrMiddle, _xrMiddle + _radium];
        }
      } else {
        if (startPosition === POSITION.VERTICAL) {
          X1s = [_xr - self, _xr - self, _xr - self - _radium];
          X2s = [_xl + triangleWidthMiddle + _radium, _xl + triangleWidthMiddle, _xl + triangleWidthMiddle];
        } else {
          X1s = [_xrMiddle + _radium, _xrMiddle, _xrMiddle];
          X2s = [_xrMiddle, _xrMiddle, _xrMiddle - _radium];
        }
      }

      if (startVertical === VERTICAL.TOP) {
        if (startPosition === POSITION.VERTICAL) {
          Y1s = [_ybMiddle - _radium, _ybMiddle, _ybMiddle];
          Y2s = [_ybMiddle, _ybMiddle, _ybMiddle + _radium];
        } else {
          Y1s = [_yt + self, _yt + self, _yt + self + _radium];
          Y2s = [_yb - triangleWidthMiddle - _radium, _yb - triangleWidthMiddle, _yb - triangleWidthMiddle];
        }
      } else {
        if (startPosition === POSITION.VERTICAL) {
          Y1s = [_ybMiddle + _radium, _ybMiddle, _ybMiddle];
          Y2s = [_ybMiddle, _ybMiddle, _ybMiddle - _radium];
        } else {
          Y1s = [_yb - self, _yb - self, _yb - self - _radium];
          Y2s = [_yt + triangleWidthMiddle + _radium, _yt + triangleWidthMiddle, _yt + triangleWidthMiddle];
        }
      }

      return ` ${X1s[0]},${Y1s[0]} Q${X1s[1]},${Y1s[1]} ${X1s[2]},${Y1s[2]} L${X2s[0]},${Y2s[0]} Q${X2s[1]},${Y2s[1]} ${X2s[2]},${Y2s[2]}`;
    }
  };

  /**
   * @param {VERTICAL} endVertical
   * @param {HORIZONTAL} endHorizontal
   * @param {POSITION} direction
   * @return {string}
   */
  private _getEnd = ([endVertical, endHorizontal]: [v: VERTICAL, h: HORIZONTAL], direction: POSITION): string => {
    const { _xl, _xr, _yt, _yb, _triangle } = this;
    const triangleWidthMiddle = _triangle.width / 2;
    let x: number, y: number;
    if (endHorizontal === HORIZONTAL.LEFT) {
      if (direction === POSITION.HORIZONTAL) {
        x = _xl + _triangle.height;
      } else {
        x = _xl + triangleWidthMiddle;
      }
    } else {
      if (direction === POSITION.HORIZONTAL) {
        x = _xr - _triangle.height;
      } else {
        x = _xr - triangleWidthMiddle;
      }
    }

    if (endVertical === VERTICAL.TOP) {
      if (direction === POSITION.HORIZONTAL) {
        y = _yt + triangleWidthMiddle;
      } else {
        y = _yt + _triangle.height;
      }
    } else {
      if (direction === POSITION.HORIZONTAL) {
        y = _yb - triangleWidthMiddle;
      } else {
        y = _yb - _triangle.height;
      }
    }

    return ` L${x},${y}`;
  };

  /**
   * @param {VERTICAL} endVertical
   * @param {HORIZONTAL} endHorizontal
   * @param {POSITION} endPosition
   * @return {number}
   */
  private _arrowOrient = ([endVertical, endHorizontal]: [v: VERTICAL, h: HORIZONTAL], endPosition: POSITION): number => {
    let orient: number;
    if (endPosition === POSITION.VERTICAL) {
      if (endVertical === VERTICAL.TOP) {
        orient = 90;
      } else {
        orient = -90;
      }
    } else {
      if (endHorizontal === HORIZONTAL.LEFT) {
        orient = 0;
      } else {
        orient = 180;
      }
    }
    return orient;
  };

  public render = (): JSX.Element => {
    const { width, height, color } = this.props;
    const { size, viewBox, route, triangleOrient, margins } = this.state;
    return (
      <View style={StyleSheet.flatten([{ width, height }, ...margins])}>
        <Svg width={width} height={height} viewBox={viewBox.join(' ')} fill={color ?? 'black'} strokeLinejoin={'round'} strokeLinecap={'butt'}>
          <Defs>
            <Marker
              id="Triangle"
              viewBox="0 0 10 10"
              refX="0"
              refY="5"
              // @ts-ignore
              markerUnits="strokeWidth"
              markerWidth="4"
              markerHeight="3"
              orient={triangleOrient}
            >
              <Path fill="black" d="M 0 0 L 10 5 L 0 10 z" />
            </Marker>
            <Path id={'TT'} stroke="crimson" d="M 100,75 C 125,50 150,50 175,75" />
          </Defs>
          <Path strokeLinejoin={'round'} d={route} fill="none" stroke="black" strokeWidth={size} markerEnd="url(#Triangle)" />
        </Svg>
      </View>
    );
  };
}

export { POSITION, HORIZONTAL, VERTICAL };
export default ArrowFollow;
