import { Input, styled } from 'tamagui';

const BaseInput = styled(Input, {
    size: '$5',
    borderColor: '$border',
    focusStyle: { borderColor: '$primary' },
    placeholderTextColor: '$textPrimary40',
    color: '$textPrimary100',
    fontSize: '$4',
    br: 15,
});

export default BaseInput;
