const CHARACTERS_RAW = [
  0b0010000100001000010000100000000010000000,
  0b0101001010010100000000000000000000000000,
  0b0101001010111110101011111010100101000000,
  0b0010001111101000111000101111100010000000,
  0b1100011001000100010001000100110001100000,
  0b0110010010101000100010101100100110100000,
  0b0110000100010000000000000000000000000000,
  0b0001000100010000100001000001000001000000,
  0b0100000100000100001000010001000100000000,
  0b0000000100101010111010101001000000000000,
  0b0000000100001001111100100001000000000000,
  0b0000000000000000000001100001000100000000,
  0b0000000000000001111100000000000000000000,
  0b0000000000000000000000000011000110000000,
  0b0000000001000100010001000100000000000000,
  0b0111010001100111010111001100010111000000,
  0b0010001100001000010000100001000111000000,
  0b0111010001000010001000100010001111100000,
  0b1111100010001000001000001100010111000000,
  0b0001000110010101001011111000100001000000,
  0b1111110000111100000100001100010111000000,
  0b0011001000100001111010001100010111000000,
  0b1111100001000100010001000010000100000000,
  0b0111010001100010111010001100010111000000,
  0b0111010001100010111100001000100110000000,
  0b0000001100011000000001100011000000000000,
  0b0000001100011000000001100001000100000000,
  0b0001000100010001000001000001000001000000,
  0b0000000000111110000011111000000000000000,
  0b0100000100000100000100010001000100000000,
  0b0111010001000010001000100000000010000000,
  0b0111010001000010110110101101010111000000,
  0b0111010001100011000111111100011000100000,
  0b1111010001100011111010001100011111000000,
  0b0111010001100001000010000100010111000000,
  0b1110010010100011000110001100101110000000,
  0b1111110000100001111010000100001111100000,
  0b1111110000100001111010000100001000000000,
  0b0111010001100001011110001100010111100000,
  0b1000110001100011111110001100011000100000,
  0b0111000100001000010000100001000111000000,
  0b0011100010000100001000010100100110000000,
  0b1000110010101001100010100100101000100000,
  0b1000010000100001000010000100001111100000,
  0b1000111011101011010110001100011000100000,
  0b1000110001110011010110011100011000100000,
  0b0111010001100011000110001100010111000000,
  0b1111010001100011111010000100001000000000,
  0b0111010001100011000110101100100110100000,
  0b1111010001100011111010100100101000100000,
  0b0111110000100000111000001000011111000000,
  0b1111100100001000010000100001000010000000,
  0b1000110001100011000110001100010111000000,
  0b1000110001100011000110001010100010000000,
  0b1000110001100011010110101101010101000000,
  0b1000110001010100010001010100011000100000,
  0b1000110001100010101000100001000010000000,
  0b1111100001000100010001000100001111100000,
  0b0111001000010000100001000010000111000000,
  0b1000101010111110010011111001000010000000,
  0b0111000010000100001000010000100111000000,
  0b0010001010100010000000000000000000000000,
  0b0000000000000000000000000000001111100000,
  0b0100000100000100000000000000000000000000,
  0b0000000000011100000101111100010111100000,
  0b1000010000101101100110001100011111000000,
  0b0000000000011101000010000100010111000000,
  0b0000100001011011001110001100010111100000,
  0b0000000000011101000111111100000111000000,
  0b0011001001010001110001000010000100000000,
  0b0000001111100011000101111000010111000000,
  0b1000010000101101100110001100011000100000,
  0b0010000000011000010000100001000111000000,
  0b0001000000001100001000010100100110000000,
  0b1000010000100101010011000101001001000000,
  0b0110000100001000010000100001000111000000,
  0b0000000000110101010110101100011000100000,
  0b0000000000101101100110001100011000100000,
  0b0000000000011101000110001100010111000000,
  0b0000000000111101000111110100001000000000,
  0b0000000000011011001101111000010000100000,
  0b0000000000101101100110000100001000000000,
  0b0000000000011101000001110000011111000000,
  0b0100001000111000100001000010010011000000,
  0b0000000000100011000110001100110110100000,
  0b0000000000100011000110001010100010000000,
  0b0000000000100011000110101101010101000000,
  0b0000000000100010101000100010101000100000,
  0b0000000000100011000101111000010111000000,
  0b0000000000111110001000100010001111100000,
  0b0001000100001000100000100001000001000000,
  0b0010000100001000010000100001000010000000,
  0b0100000100001000001000100001000100000000,
  0b0000000100000101111100010001000000000000,
  0b0000000100010001111101000001000000000000,
  0b0000000000000000000011100101001110000000,
  0b0011100100001000010000000000000000000000,
  0b0000000000000000010000100001001110000000,
  0b0000000000000000000010000010000010000000,
  0b0000000000000000110001100000000000000000,
  0b0000011111000011111100001000100010000000,
  0b0000000000111110000100110001000100000000,
  0b0000000000000100010001100101000010000000,
  0b0000000000001001111110001000010011000000,
  0b0000000000000001111100100001001111100000,
  0b0000000000000101111100110010101001000000,
  0b0000000000010001111101001010100100000000,
  0b0000000000000000111000010000101111100000,
  0b0000000000111100001011110000101111000000,
  0b0000000000000001010110101000010011000000,
  0b0000000000000001111100000000000000000000,
  0b1111100001001010011000100001000100000000,
  0b0000100010001000110010100001000010000000,
  0b0010011111100011000100001000100010000000,
  0b0000011111001000010000100001001111100000,
  0b0001011111000100011001010100100001000000,
  0b0100011111010010100101001010011001000000,
  0b0010011111001001111100100001000010000000,
  0b0000001111010011000100001000100110000000,
  0b0100001111100100001000010000100010000000,
  0b0000011111000010000100001000011111100000,
  0b0101011111010100101000010001000100000000,
  0b0000011000000011100100001000101110000000,
  0b0000011111000010001000100010101000100000,
  0b0100011111010010101001000010000011100000,
  0b0000010001100010100100001000100110000000,
  0b0000001111010011010100010000100110000000,
  0b0001011100001001111100100001000100000000,
  0b0000010101101011010100001000100010000000,
  0b0111000000111110010000100001000100000000,
  0b0100001000010000110001010010000100000000,
  0b0010000100111110010000100010001000000000,
  0b0000001110000000000000000000001111100000,
  0b0000011111000010101000100010101000000000,
  0b0010011111000100010001110101010010000000,
  0b0001000010000100001000010001000100000000,
  0b0000000100000101000110001100011000100000,
  0b1000010000111111000010000100000111100000,
  0b0000011111000010000100001000100110000000,
  0b0000001000101000001000001000010000000000,
  0b0010011111001000010010101101010010000000,
  0b0000011111000010000101010001000001000000,
  0b0000001110000000111000000011100000100000,
  0b0000000100010001000010001111110000100000,
  0b0000000001000010101000100010101000000000,
  0b0000011111010001111101000010000011100000,
  0b0100001000111110100101010010000100000000,
  0b0000001110000100001000010000101111100000,
  0b0000011111000011111100001000011111100000,
  0b0111000000111110000100001000100010000000,
  0b1001010010100101001000010001000100000000,
  0b0000000000001001010010101101011011000000,
  0b0000010000100001000110010101001100000000,
  0b0000011111100011000110001100011111100000,
  0b0000011111100011000100001000100010000000,
  0b0000011000000000000100001000101110000000,
  0b0010010010010000000000000000000000000000,
  0b1110010100111000000000000000000000000000,
  0b0000000000010011010110010100100110100000,
  0b0101000000011100000101111100010111100000,
  0b0000000000011101000111110100011111010000,
  0b0000000000011101000001100100010111000000,
  0b0000000000100011000110001100111110110000,
  0b0000000000011111010010010100010111000000,
  0b0000000000001100100110001100011111010000,
  0b0000000000011111000110001100010111100001,
  0b0000000000001110010000100101000100000000,
  0b0000000010110100001000000000000000000000,
  0b0001000000001100001000010000100001000010,
  0b0000010100010001010000000000000000000000,
  0b0000000100011101010010101011100010000000,
  0b0100001000111000100011100010000111100000,
  0b0111000000101101100110001100011000100000,
  0b0101000000011101000110001100010111000000,
  0b0000000000101101100110001100011111010000,
  0b0000000000011011001110001100010111100001,
  0b0000001110100011111110001100010111000000,
  0b0000000000000000101110101110100000000000,
  0b0000000000011101000110001010101101100000,
  0b0101000000100011000110001100110110100000,
  0b1111110000010000010001000100001111100000,
  0b0000000000111110101001010010101001100000,
  0b1111100000100010101000100010101000100000,
  0b0000000000100011000110001100010111100001,
  0b0000000001111100010011111001000010000000,
  0b0000000000111110100001111010011000100000,
  0b0000000000111111010111111100011000100000,
  0b0000000000001000000011111000000010000000,
  0b0000000000000000000000000000000000000000,
  0b1111111111111111111111111111111111111111,
];

CHARACTERS_RAW.splice(0, 0, ...Array(33).fill(0));
CHARACTERS_RAW.splice(128, 0, ...Array(33).fill(0));

export const CHAR_WIDTH = 5;
export const CHAR_HEIGHT = 8;

export const CHARACTERS = CHARACTERS_RAW.map(importCharacter);

export const CHAR_CUSTOM_COUNT = 8;

export function getBlankCharacter() {
  return new Array(CHAR_WIDTH * CHAR_HEIGHT).fill(0);
}

export function importCharacter(raw) {
  const bits = [];

  for (let i = 0; i < CHAR_WIDTH * CHAR_HEIGHT; i++) {
    bits.push(raw % 2);
    raw = Math.floor(raw / 2);
  }

  return bits.reverse().slice(0, CHAR_WIDTH * CHAR_HEIGHT);
}
