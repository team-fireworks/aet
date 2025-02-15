// import Fusion, { UsedAs, Value } from "@rbxts/fusion";
// import { Scoped } from "ui/scoped";
// import { useTheme } from "ui/theme";
// import { BaseProps, LayoutProps } from "ui/types";

// export enum TextAlignX {
// 	Left,
// 	Center,
// 	Right,
// }

// export enum TextAlignY {
// 	Top,
// 	Center,
// 	Bottom,
// }

// export interface ParagraphProps extends BaseProps, LayoutProps, Scoped {
// 	text?: UsedAs<string>;

// 	// TODO implement
// 	outTextBounds?: Value<Vector2>;

// 	alignX?: UsedAs<TextAlignX>;
// 	alignY?: UsedAs<TextAlignY>;
// }

// export function Paragraph({
// 	scope,
// 	position,
// 	anchorPoint,
// 	size,
// 	automaticSize = Enum.AutomaticSize.XY,
// 	name,
// 	zIndex,
// 	layoutOrder,

// 	text,
// 	outTextBounds,
// 	alignX = TextAlignX.Left,
// 	alignY = TextAlignY.Top,
// }: ParagraphProps) {
// 	return (
// 		<textlabel
// 			BackgroundTransparency={1}
// 			scope={scope}
// 			Position={position}
// 			AnchorPoint={anchorPoint}
// 			Size={size}
// 			AutomaticSize={automaticSize}
// 			Name={name ?? text ?? "Paragraph"}
// 			ZIndex={zIndex}
// 			LayoutOrder={layoutOrder}
// 			Text={text}
// 			TextColor3={useTheme("fg")}
// 			TextXAlignment={scope.Computed((use) => {
// 				switch (use(alignX)) {
// 					case TextAlignX.Left:
// 						return Enum.TextXAlignment.Left;
// 					case TextAlignX.Center:
// 						return Enum.TextXAlignment.Center;
// 					case TextAlignX.Right:
// 						return Enum.TextXAlignment.Right;
// 					default:
// 						throw `unknown Paragraph.alignX: ${use(alignX)}`;
// 				}
// 			})}
// 			TextYAlignment={scope.Computed((use) => {
// 				switch (use(alignY)) {
// 					case TextAlignY.Top:
// 						return Enum.TextYAlignment.Top;
// 					case TextAlignY.Center:
// 						return Enum.TextYAlignment.Center;
// 					case TextAlignY.Bottom:
// 						return Enum.TextYAlignment.Bottom;
// 					default:
// 						throw `unknown Paragraph.alignY: ${use(alignX)}`;
// 				}
// 			})}
// 			Out:TextBounds={outTextBounds}
// 		/>
// 	);
// }
