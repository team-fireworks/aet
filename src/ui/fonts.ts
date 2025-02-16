// From Ethereal, licensed under the GNU General Public License v3.0

export function sans(weight: Enum.FontWeight = Enum.FontWeight.Regular, style: Enum.FontStyle = Enum.FontStyle.Normal) {
	return Font.fromName("SourceSans", weight, style);
}
