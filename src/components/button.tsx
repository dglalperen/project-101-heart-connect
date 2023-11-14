import { styled, Button as TButton } from 'tamagui';

const Button = styled(TButton, {
    variants: {
        outlined: {
            true: {
                color: '$primary',
                borderColor: '#F3F3F3',
            },
        },
        chosen: {
            true: {
                color: 'white',
                backgroundColor: '$primary',
            },
        },
        isText: {
            true: {
                color: '$primary',
            },
        },
    } as const,
    borderRadius: '$radius.6',
});

export default Button;
