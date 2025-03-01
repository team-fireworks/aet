// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

import { memoize } from "libs/memoize";

export const HALF_ANCHOR = new Vector2(0.5, 0.5);

export const FULL_UDIM_2 = UDim2.fromScale(1, 1);
export const HALF_UDIM_2 = UDim2.fromScale(0.5, 0.5);
export const ZERO_UDIM_2 = UDim2.fromScale(0, 0);

export const ZERO_UDIM = new UDim();

export const udimPx = memoize((px?: number) => new UDim(0, px));
export const udimScale = memoize((scale?: number) => new UDim(0, scale));

export const udimSqPx = memoize((px?: number) => UDim2.fromOffset(px, px));
export const udimSqScale = memoize((scale?: number) => UDim2.fromScale(scale, scale));

export const udim2Px = memoize((xPx?: number, yPx?: number) => UDim2.fromOffset(xPx, yPx));
export const udim2Scale = memoize((xScale?: number, yScale?: number) => UDim2.fromScale(xScale, yScale));
