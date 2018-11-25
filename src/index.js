//@flow
import React from 'react';

const isMobile = (() => {
	if (typeof window !== 'undefined') {
		if (document.body && document.body.clientWidth < 480) {
			return true;
		} else {
			return false;
		}
	}
	return false;
})();

const defaultStyles = {
	display: 'inline-block',
	outline: 'none',
	opacity: 1,
	WebkitUserSelect: 'none',
	MozUserSelect: 'none',
	MsUserSelect: 'none',
	userSelect: 'none',
	willChange: 'box-shadow, opacity',
	WebkitTapHighlightColor: 'rgba(0,0,0,0)'
};

const clickingStyled = (radius: number | string = '4px') => ({
	...defaultStyles,
	transition: 'opacity .4s',
	boxShadow: '0px 0px 0px transparent',
	WebkitBoxShadow: '0px 0px 0px transparent',
	borderRadius: radius
});

const initialStyled = (radius: null | number | string = '4px', speed = 0.4) => ({
	...defaultStyles,
	transition: `box-shadow ${speed}s`,
	borderRadius: radius
});

const convertColor = (color: ?string, alpha: number) => {
	if (color && /^rgb\(/.test(color)) {
		const colorRGB = color;
		const front = colorRGB.substring(4, colorRGB.length - 1);
		const result = `rgba(${front}, ${alpha})`;
		return result;
	}

	return `rgba(52,73,94,${alpha})`;
};

const hoveredStyled = (color: ?string, alpha: number, radius?: number | string = '4px', speed?: number) => ({
	...initialStyled(radius, speed),
	boxShadow: `0px 0px 0px 4px ${convertColor(color, alpha)}`,
	WebkitBoxShadow: `0px 0px 0px 4px ${convertColor(color, alpha)}`,
	opacity: isMobile ? 0.8 : 1,
	borderRadius: radius
});

const activedStyled = (color: ?string, alpha: number, radius?: number | string = '4px', speed?: number) => ({
	...initialStyled(radius, speed),
	boxShadow: `0px 0px 0px 10px ${convertColor(color, 0)}`,
	WebkitBoxShadow: `0px 0px 0px 10px ${convertColor(color, 0)}`,
	borderRadius: radius,
	opacity: 0.9
});

type Props = {
  children: any,
	wrapperColor?: null | string,
  speed?: number,
  alpha?: number,
  style?: Object,
  className?: any,
  disabled?: boolean,
};

type State = {|
	hovered: boolean,
	clicked: boolean,
	clicking: boolean,
	mouseOut: boolean
|};

class ButtonNice extends React.PureComponent<Props, State> {
  _input: any;

	state = {
		hovered: false,
		clicked: false,
		clicking: false,
		mouseOut: true
	};

	_onHover = () => {
		this.setState((prev) => ({
			...prev,
			hovered: true,
			mouseOut: false,
			clicking: false
		}));
	};

	_onLeave = () => {
		this.setState((prev) => ({
			...prev,
			hovered: false,
			clicked: false,
			mouseOut: true,
			clicking: false
		}));
	};

	_onFocus = () => {
		this.setState((prev) => ({
			...prev,
			hovered: true
		}));
		if (this._input && this._input.focus) this._input.focus();
	};

	_onBlur = () => {
		this.setState((prev) => ({
			...prev,
			hovered: false
		}));
		if (this._input && this._input.blur) this._input.blur();
	};

	_onClick = () => {
		this.setState(
			(prev) => ({
				...prev,
				clicked: true,
				hovered: isMobile ? true : false,
				mouseOut: false
			}),
			() => {
				setTimeout(() => {
					this.setState({
						clicking: true
					});
				}, 300);

				setTimeout(() => {
					if (!this.state.mouseOut) {
						this.setState({
							clicked: false,
							hovered: isMobile ? false : true,
							clicking: false
						});
					}
				}, 400);
			}
		);
	};

	_renderChild = (props: any) => {
		const { children } = this.props;
		const child = React.Children.only(children);
		const element = React.cloneElement(child, {
			ref: (ref) => (this._input = ref),
			style: {
				...child.style,
				display: 'inline-block'
			},
			...child.props,
			...props
		});

		return element;
	};

	render() {
		let color: null | string;
		let radius: number | string = '4px';

		if (this._input && this._input.style) {
			color =
				this._input.style.backgroundColor ||
				window.getComputedStyle(this._input, null).getPropertyValue('background-color');
			if ((!color || !/^rgb\(/.test(color)) && process.env.NODE_ENV !== 'production') {
				console.warn(
					'Your wrapped element\'s background-color should be rgb color, not "%s"',
					color || 'undefined'
				);
			}
			radius =
				this._input.style.borderRadius ||
				window.getComputedStyle(this._input, null).getPropertyValue('border-radius') ||
				'2px';
			this._input.style.margin = 0;
		}

		const { children, alpha = 0.3, style, className, disabled, speed, wrapperColor, ...rest } = this.props;
		const genratedHoveredStyled = hoveredStyled(wrapperColor || color, alpha, radius, speed);
		const genratedActivedStyled = activedStyled(wrapperColor || color, alpha, radius, speed);
		const generatedInitialStyle = initialStyled(radius, speed);
		const generatedClickingStyle = clickingStyled(radius);
		const { hovered, clicked, clicking } = this.state;

		return (
			<div
				className={className}
				style={{
					display: 'inline-block',
					...style
				}}
			>
				<div
					tabIndex="1"
					onFocus={isMobile ? null : this._onFocus}
					onBlur={this._onBlur}
					onMouseOver={this._onHover}
					onMouseOut={this._onLeave}
					onClick={clicking ? null : this._onClick}
					style={
						disabled ? (
							generatedInitialStyle
						) : clicking ? (
							generatedClickingStyle
						) : hovered ? (
							genratedHoveredStyled
						) : clicked ? (
							genratedActivedStyled
						) : (
							generatedInitialStyle
						)
					}
				>
					{this._renderChild({ disabled, ...rest })}
				</div>
			</div>
		);
	}
}

export default ButtonNice;
