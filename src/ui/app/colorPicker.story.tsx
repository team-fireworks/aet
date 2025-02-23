// Eternal is a full-featured companion plugin for Eternal Towers of Hell.
// Copyright (C) 2025 znotfireman
//
// This program is free software: you can redistribute it and/or modify it unde
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
// details.
//
// You should have received a copy of the GNU General Public License along with
// this program. If not, see <https://www.gnu.org/licenses/>.

import Fusion from "@rbxts/fusion";
import { Button, ButtonStyle } from "ui/components/button";
import { fusionStory } from "uilabs";
import { ColorPicker } from "./colorPicker";

export = fusionStory({
	story: ({ scope }) => {
		const colorPicker = new ColorPicker(scope);
		return (
			<Button
				scope={scope}
				label="Open Color Picker"
				style={ButtonStyle.Primary}
				onClick={() => (colorPicker as ColorPicker).toggle()}
			/>
		);
	},
});
