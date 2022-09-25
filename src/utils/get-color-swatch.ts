const swatches: { [key: string]: string } = {
  black: '#000000',
  white: '#ffffff',
};

export default function getColorSwatch(color: string) {
  return swatches[color.toLowerCase()] || color;
}
