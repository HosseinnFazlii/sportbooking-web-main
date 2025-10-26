import { useContext } from "react";
import { AbilityContext } from "../contexts";

export const useAbility = () => {
    const context = useContext(AbilityContext);
    if (!context) {
        throw new Error('useAbility must be used within an AbilityProvider');
    }
    return context;
};
