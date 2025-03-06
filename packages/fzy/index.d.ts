export = fzy;
export as namespace fzy;
declare namespace fzy {
	/// Check if `needle` is a subsequence of the `haystack`.
	export function has_match(needle: string, haystack: string, caseSensitive?: boolean): boolean;
	/// Computes the matching positions and score of the needle within the haystack.
	export function positions(needle: string, haystack: string, caseSensitive?: boolean): LuaTuple<[number[], number]>;
	/// Computes a matching score for the needle within the haystack.
	export function score(needle: string, haystack: string, caseSensitive?: boolean): number;
	/// Filters an array of strings, returning only those that contain the
	/// needle as a subsequence.
	export function filter(
		needle: string,
		haystacks: string[],
		case_sensitive?: boolean,
	): Array<[idx: number, positions: number[], score: number]>;

	/// Returns the maximum length of strings that the fzy algorithm will
	/// process.
	export function get_max_length(): number;
	/// Returns the maximum score for non-exact matches.
	export function get_score_ceiling(): number;
	/// Returns the minimum score returned for normal matches.
	export function get_score_floor(): number;
	/// Returns the highest possible score (for exact matches).
	export function get_score_max(): number;
	/// Returns the lowest possible score.
	export function get_score_min(): number;
}
