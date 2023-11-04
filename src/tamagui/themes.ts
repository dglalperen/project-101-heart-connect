import { createStrengthenMask, createThemeBuilder } from '@tamagui/theme-builder';

const colorPalette_Light = [
    '#ffffff',
    '#ffeeed',
    '#ffdcdc',
    '#ffcbcb',
    '#ffb9ba',
    '#fda7a9',
    '#fa9598',
    '#f78288',
    '#f36e77',
    '#ee5967',
    '#e94057',
    '#000000',
];

const colorPalette_Dark = [
    '#000000',
    '#030000',
    '#130103',
    '#290508',
    '#410b12',
    '#5a131c',
    '#741b27',
    '#902433',
    '#ad2d3e',
    '#cb364b',
    '#e94057',
    '#ffffff',
];

const themesBuilder = createThemeBuilder()
    .addPalettes({
        dark: colorPalette_Dark,
        light: colorPalette_Light,
    })
    .addTemplates({
        base: {
            background: 0,
            backgroundHover: 3,
            backgroundPress: 4,
            backgroundFocus: 5,
            backgroundStrong: 1,
            backgroundTransparent: 0,
            color: -0,
            colorHover: -2,
            colorPress: -1,
            colorFocus: -2,
            colorTransparent: -0,
            borderColor: 5,
            borderColorHover: 6,
            borderColorFocus: 4,
            borderColorPress: 5,
            placeholderColor: -4,
            primary: -0,
        },
    })
    .addMasks({
        soften: createStrengthenMask(),
    })
    .addThemes({
        light: {
            template: 'base',
            palette: 'light',
        },
        dark: {
            template: 'base',
            palette: 'dark',
        },
    })
    .addChildThemes({
        active: {
            mask: 'soften',
            override: {
                color: 0,
                background: -1,
            },
        },
        subtle: {
            mask: 'soften',
        },
    });

export default themesBuilder.build();
