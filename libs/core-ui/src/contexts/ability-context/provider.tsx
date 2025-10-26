// libs/core-ui/src/contexts/ability-context/provider.tsx
import { FC, ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import { ACLObj, AppAbility } from './types';
import { useAuth } from '../../hooks';
import { buildAbilityFor } from './rules';
import { AbilityContext } from './context';
import { Page401 } from '../../components';
import { publicRoutes } from '../../configs';

interface IAclProvider {
    children: ReactNode
    guestGuard: boolean
    aclAbilities: ACLObj
}

export const AbilityProvider: FC<IAclProvider> = ({ aclAbilities, children, guestGuard }) => {
    const [ability, setAbility] = useState<AppAbility | undefined>(undefined)

    // ** Hooks
    const auth = useAuth()
    const router = useRouter()

    // If guestGuard is true and user is not logged in or its an error page, render the page without checking access
    if (guestGuard || publicRoutes.includes(router.route)) {
        return children
    }

    // User is logged in, build ability for the user based on his role
    if (auth.user && auth.user.roleId && !ability) {
        setAbility(buildAbilityFor(auth.user.roleId, aclAbilities.subject))
    }

    // Check the access of current user and render pages
    if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
        return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    }

    // Render Not Authorized component if the current user has limited access
    return <Page401 />
}