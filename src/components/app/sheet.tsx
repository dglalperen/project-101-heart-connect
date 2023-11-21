import { SheetProps, Sheet as TSheet } from '@tamagui/sheet';

type IProps = Omit<SheetProps, 'modal'>;

function Sheet(props: IProps) {
    return (
        <TSheet
            modal
            {...props}>
            <TSheet.Overlay bg="$backdrop" />
            <TSheet.Handle />
            <TSheet.Frame p="$5">{props.children}</TSheet.Frame>
        </TSheet>
    );
}

export default Sheet;
