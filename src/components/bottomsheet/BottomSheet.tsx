import React, { RefObject } from "react";
import { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import styles from "./style";

interface Props {
    children?: React.ReactNode | any;
    bottomSheetModalRef: RefObject<BottomSheetModalMethods>;
    index : number;
}

const BottomSheet: React.FC<Props> = ({ bottomSheetModalRef, children, index }) => {

    const snapPoints = React.useMemo(() => ['30%', '40%', '50%', '60%', '70%', '80%', '90%'], []);

    // const handleSheetChanges = React.useCallback((index: number) => {
    //     console.log('handleSheetChanges', index);
    // }, []);

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={index}
                snapPoints={snapPoints}
                style={styles.shadow}
                // onChange={handleSheetChanges}
            >
                {children}
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

export default BottomSheet;
