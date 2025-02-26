import { doCleanup, innerScope, Scope } from "@rbxts/fusion";
import { Result } from "@rbxts/rust-classes";
import { ChangeHistoryService, RunService } from "@rbxts/services";

type Cleanup = () => void;

interface Recording {
	scope: Scope;
	id: string;
}

interface RecordProps<S> {
	name: string;
	displayName: string;

	cancelOthers: boolean;
	cancellable: boolean;

	callback: (scope: Scope<S>, id: string) => Enum.FinishRecordingOperation;
}

let currentRecording: Maybe<Recording> = undefined;
let canCancel = false;

export function record<S>(
	scope: Scope<S>,
	{ name, displayName, cancelOthers, cancellable, callback }: RecordProps<S>,
): Result<Cleanup, string> {
	if (currentRecording) {
		if (!canCancel || !cancelOthers) return Result.err("");
		doCleanup(currentRecording.scope);
	}

	if (ChangeHistoryService.IsRecordingInProgress()) return Result.err("");
	if (RunService.IsRunning()) return Result.err("");

	const [ok, id] = pcall(
		(name, displayName) => ChangeHistoryService.TryBeginRecording(name, displayName),
		name,
		displayName,
	);

	if (!ok) return Result.err("Roblox failed to start recording");
	if (id === undefined) return Result.err("");

	const recordingScope = innerScope(scope);
	const currentOperation = Enum.FinishRecordingOperation.Cancel;

	return Result.ok(() => doCleanup(recordingScope));
}
