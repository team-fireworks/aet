import type { ToolApi } from "@rbxts/ethereal-for-plugins";
import { scoped } from "@rbxts/fusion";
import { Dictionary } from "@rbxts/sift";
import { plugin } from "plugin";

export function newToolApi(): ToolApi {
	const scope = scoped();

	return Dictionary.freezeDeep(
		identity<ToolApi>({
			scope,

			tower() {
				return undefined;
			},

			args: {
				boolean(arg) {
					throw "not yet implemented";
				},

				select(arg) {
					throw "not yet implemented";
				},

				string(arg) {
					throw "not yet implemented";
				},

				number(arg) {
					throw "not yet implemented";
				},

				numberSeqeunce(arg) {
					throw "not yet implemented";
				},

				color(arg) {
					throw "not yet implemented";
				},

				colorSequence(arg) {
					throw "not yet implemented";
				},

				vector2(arg) {
					throw "not yet implemented";
				},

				vector3(arg) {
					throw "not yet implemented";
				},

				cframe(arg) {
					throw "not yet implemented";
				},
			},

			self: {
				id: "",
				name: "",
				overview: "",
				description: "",

				fullname: "",

				source: {
					id: "",
					name: "",
					icon: "",
					plugin,
				},
			},

			widget() {
				throw "not yet implemented";
			},

			action(props) {
				throw "not yet implemented";
			},

			notify() {
				throw "not yet implemented";
			},

			popup() {
				throw "not yet implemented";
			},

			confirm() {
				throw "not yet implemented";
			},
		}),
	) as ToolApi;
}
