import { tokens } from '@tamagui/themes';
import { createTokens } from 'tamagui';

const customToken = createTokens({
    ...tokens,
    color: {
        ...tokens.color,
        textPrimary100: '#000000',
        textPrimary70: 'rgba(0,0,0,.7)',
        textPrimary40: 'rgba(0,0,0,.4)',
        textSecondary: '#323755',
        primary: '#E94057',
        border: '#E8E6EA',
        placeholder: '#E8E6EA',
        backdrop: 'rgba(0,0,0,.5)',
    },
});

export default customToken;
