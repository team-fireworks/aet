import Fusion, { Children } from "@rbxts/fusion";
import { Scoped } from "ui/scoped";
import { BaseProps, ChildrenProps, LayoutProps } from "ui/types";

export interface ScrollerProps extends BaseProps, LayoutProps, Scoped, ChildrenProps {}

const HANDLE_BAR_WIDTH = 24;
const HANDLE_BAR_PADDING = 4;

// todo: horizontal scroller?
export function Scroller({
	scope,
	position,
	anchorPoint,
	size,
	automaticSize,
	name = "Scroller",
	zIndex,
	layoutOrder,

	[Children]: children,
}: ScrollerProps) {
	const absoluteCanvasSize = scope.Value(Vector2.zero);
	const absoluteWindowSize = scope.Value(Vector2.zero);
	const canvasPosition = scope.Value(Vector2.zero);

	return (
		<frame
			scope={scope}
			BackgroundTransparency={1}
			Name={name}
			Position={position}
			AnchorPoint={anchorPoint}
			Size={size}
			AutomaticSize={automaticSize}
			ZIndex={zIndex}
			LayoutOrder={layoutOrder}
		>
			<scrollingframe
				scope={scope}
				BackgroundTransparency={1}
				Size={new UDim2(1, -HANDLE_BAR_WIDTH - HANDLE_BAR_PADDING, 1, 0)}
				CanvasSize={new UDim2(1, 0, 1, 0)}
				ScrollingDirection={Enum.ScrollingDirection.XY}
				AutomaticCanvasSize={Enum.AutomaticSize.Y}
				ScrollBarImageTransparency={1}
				ScrollBarThickness={0}
				Out:AbsoluteCanvasSize={absoluteCanvasSize}
				Out:AbsoluteWindowSize={absoluteWindowSize}
				Out:CanvasPosition={canvasPosition}
			>
				{children}
			</scrollingframe>
			<frame
				scope={scope}
				AnchorPoint={new Vector2(1, 0)}
				BackgroundTransparency={0.5}
				Size={new UDim2(0, HANDLE_BAR_WIDTH, 1, 0)}
				Position={UDim2.fromScale(1, 0)}
			>
				<imagebutton
					scope={scope}
					Size={new UDim2(1, 0, 0, 24)}
					Position={scope.Computed(
						(use) => new UDim2(0.5, 0, use(canvasPosition).Y / use(absoluteWindowSize).Y, 0),
					)}
				></imagebutton>
			</frame>
		</frame>
	);
}
