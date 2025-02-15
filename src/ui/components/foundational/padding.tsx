import Fusion, { UsedAs } from "@rbxts/fusion";
import { Scoped } from "ui/scoped";

export interface PaddingProps extends Scoped {
	padding?: UsedAs<UDim>;
	paddingX?: UsedAs<UDim>;
	paddingY?: UsedAs<UDim>;
	paddingLeft?: UsedAs<UDim>;
	paddingRight?: UsedAs<UDim>;
	paddingTop?: UsedAs<UDim>;
	paddingBottom?: UsedAs<UDim>;
}

const ZERO_UDIM = new UDim();

export function Padding({
	scope,
	padding,
	paddingX,
	paddingY,
	paddingLeft,
	paddingRight,
	paddingTop,
	paddingBottom,
}: PaddingProps) {
	return (
		<uipadding
			scope={scope}
			Name="Padding"
			PaddingLeft={scope.Computed((use) => use(paddingLeft) ?? use(paddingX) ?? use(padding) ?? ZERO_UDIM)}
			PaddingRight={scope.Computed((use) => use(paddingRight) ?? use(paddingX) ?? use(padding) ?? ZERO_UDIM)}
			PaddingTop={scope.Computed((use) => use(paddingTop) ?? use(paddingY) ?? use(padding) ?? ZERO_UDIM)}
			PaddingBottom={scope.Computed((use) => use(paddingBottom) ?? use(paddingY) ?? use(padding) ?? ZERO_UDIM)}
		/>
	);
}
