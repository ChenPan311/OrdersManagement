import { LayoutAnimation } from "react-native";

export const setAnimation = () => {
    LayoutAnimation.configureNext({
        duration: 250,
        update: {
            type: LayoutAnimation.Types.easeIn,
            springDamping: 0.7,
        },
    });
    LayoutAnimation.configureNext({
        duration: 500,
        create: {
            type: LayoutAnimation.Types.easeIn,
            property: LayoutAnimation.Properties.scaleXY,
            springDamping: 0.7,
        },
    });
};