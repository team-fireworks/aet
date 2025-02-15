// From Ethereal, licenced under The 3-Clause BSD License.

export function sans(weight: Enum.FontWeight = Enum.FontWeight.Regular, style: Enum.FontStyle = Enum.FontStyle.Normal) {
	return Font.fromName("SourceSans", weight, style);
}
