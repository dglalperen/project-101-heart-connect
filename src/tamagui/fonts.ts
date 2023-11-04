import { createFont } from 'tamagui';

const genericFontSizes = {
    1: 10,
    2: 12,
    3: 14,
    4: 16,
    $true: 14,
};

const headingFontSizes = {
    1: 16,
    2: 18,
    3: 24,
    4: 34,
    $true: 18,
};

const genericLineHeights = {
    1: 21,
    2: 24,
    $true: 21,
};
const headingLineHeights = {
    1: 36,
    2: 51,
    $true: 36,
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
    size: headingFontSizes,
    lineHeight: headingLineHeights,
    face: genericFontFaces,
});

export default { bodyFont, headingFont };
