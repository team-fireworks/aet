// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file, You can
// obtain one at http://mozilla.org/MPL/2.0/.

export function sans(weight: Enum.FontWeight = Enum.FontWeight.Regular, style: Enum.FontStyle = Enum.FontStyle.Normal) {
	return Font.fromName("SourceSansPro", weight, style);
}
