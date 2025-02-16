// From Ethereal, licensed under the GNU General Public License v3.0

import Fusion from "@rbxts/fusion";
import { Scoped } from "ui/scoped";

const CoreGui = game.GetService("CoreGui");

export function Notifications({ scope }: Scoped) {
	return <screengui scope={scope} Name="etherealNotifications"></screengui>;
}
