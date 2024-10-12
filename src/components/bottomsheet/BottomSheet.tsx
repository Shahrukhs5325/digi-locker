import React from "react";
import RBSheet from 'react-native-raw-bottom-sheet';

interface Props {
    children?: React.ReactNode | any;
    refRBSheet: any;
 }

const BottomSheet: React.FC<Props> = ({ refRBSheet, children }) => {

 


    return (
        <RBSheet
            height={300}
            useNativeDriver={false}
            ref={refRBSheet}
            draggable={true}
            customModalProps={{
                animationType: 'slide',
                statusBarTranslucent: true,
            }}
            customAvoidingViewProps={{
                enabled: false,
            }}

            customStyles={{
                container: {
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                },
                draggableIcon: {
                    width: 80,
                },
            }}>

            {children}
        </RBSheet>
    );
}

export default BottomSheet;
