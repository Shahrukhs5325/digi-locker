import React from "react";
import RBSheet from 'react-native-raw-bottom-sheet';

interface Props {
    children?: React.ReactNode | any;
    refRBSheet: any;
    index: number;
}

const BottomSheet: React.FC<Props> = ({ refRBSheet, children, index }) => {

    const snapPoints = React.useMemo(() => ['30%', '40%', '50%', '60%', '70%', '80%', '90%'], []);



    return (
        <RBSheet
            useNativeDriver={false}
            ref={refRBSheet}
            customStyles={{
                wrapper: {
                    // backgroundColor: 'transparent',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
            }}
            customModalProps={{
                animationType: 'slide',
                statusBarTranslucent: true,
            }}
            customAvoidingViewProps={{
                enabled: false,
            }}>
            {children}
        </RBSheet>
    );
}

export default BottomSheet;
