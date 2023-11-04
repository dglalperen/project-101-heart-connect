import { createFont } from 'tamagui';

const genericFontSizes = {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    true: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 23,
    9: 30,
    10: 46,
    11: 55,
    12: 62,
    13: 72,
    14: 92,
    15: 114,
    16: 134,
};

const genericLineHeights = {
    1: 21,
    2: 24,
    true: 21,
};
const headingLineHeights = {
    1: 36,
    2: 51,
    true: 36,
};

const genericFontFaces = {
    normal: {
        normal: 'Poppins_400Regular',
    },
    600: {
        normal: 'Poppins_600SemiBold',
    },
    bold: {
        normal: 'Poppins_700Bold',
    },
};

const bodyFont = createFont({
    size: genericFontSizes,
    lineHeight: genericLineHeights,
    face: genericFontFaces,
});

const headingFont = createFont({
    size: genericFontSizes,
    lineHeight: headingLineHeights,
    face: genericFontFaces,
});

export default { bodyFont, headingFont };
