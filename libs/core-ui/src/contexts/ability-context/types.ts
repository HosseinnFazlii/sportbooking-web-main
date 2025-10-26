// libs/core-ui/src/contexts/ability-context/types.tsx
import { Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppAbility = Ability as any

export type ACLObj = {
    action: Actions
    subject: string
}