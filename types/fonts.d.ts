interface FontFaceConstructor {
	fromName: (name: Enum.Font["Name"] | (string & {}), weight?: Enum.FontWeight, style?: Enum.FontStyle) => Font;
}
