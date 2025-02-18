// Eternal is a full-featured companion plugin for Eternal Towers of Hell
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

import Fusion, { Scope, StateObject, Value } from "@rbxts/fusion";

export function createLayoutOrder() {
	let i = 1;
	return () => {
		i++;
		return i;
	};
}

export function lockValue<T>(value: Value<T>): StateObject<T> {
	return value;
}

type EventLike<T extends Callback = Callback> =
	| { Connect(callback: T): ConnectionLike }
	| { connect(callback: T): ConnectionLike }
	| { subscribe(callback: T): ConnectionLike };

type ConnectionLike = { Disconnect(): void } | { disconnect(): void } | (() => void);

const connect = (event: EventLike, callback: Callback): ConnectionLike => {
	if (typeIs(event, "RBXScriptSignal")) {
		// With deferred events, a "hard disconnect" is necessary to avoid causing
		// state updates after a component unmounts. Use 'Connected' to check if
		// the connection is still valid before invoking the callback.
		// https://devforum.roblox.com/t/deferred-engine-events/2276564/99
		const connection = event.Connect((...args: unknown[]) => {
			if (connection.Connected) {
				return callback(...args);
			}
		});
		return connection;
	} else if ("Connect" in event) {
		return event.Connect(callback);
	} else if ("connect" in event) {
		return event.connect(callback);
	} else if ("subscribe" in event) {
		return event.subscribe(callback);
	} else {
		throw "Event-like object does not have a supported connect method.";
	}
};

const disconnect = (connection: ConnectionLike) => {
	if (typeIs(connection, "function")) {
		connection();
	} else if (typeIs(connection, "RBXScriptConnection") || "Disconnect" in connection) {
		connection.Disconnect();
	} else if ("disconnect" in connection) {
		connection.disconnect();
	} else {
		throw "Connection-like object does not have a supported disconnect method.";
	}
};

export function useEventListener<T extends EventLike>(
	scope: Scope<typeof Fusion>,
	event: T,
	listener: T extends EventLike<infer U> ? U : never,
): ReturnType<T> {
	const connection = connect(event, listener);

	scope.push(() => disconnect(connection));
	return connection as ReturnType<T>;
}
