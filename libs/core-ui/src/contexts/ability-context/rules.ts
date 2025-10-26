// libs/core-ui/src/contexts/ability-context/rules.tsx
import { AbilityBuilder, ExtractSubjectType } from '@casl/ability';
import { ACLObj, AppAbility, Subjects } from './types';
import { aclConfig } from "../../configs";

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string | number, subject: string) => {
    const { can, rules } = new AbilityBuilder(AppAbility)
    const roleConfig = aclConfig[role];

    if (roleConfig) {
        roleConfig.actions.forEach((action: string) => {
            if (roleConfig.subjects.includes(subject) || roleConfig.subjects.includes('all')) {
                can(action, subject);
            }
        });
    }

    return rules
}

export const buildAbilityFor = (role: string | number, subject: string): AppAbility => {
    return new AppAbility(defineRulesFor(role, subject), {
        // https://casl.js.org/v5/en/guide/subject-type-detection
        // detectSubjectType: object => object!.type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        detectSubjectType: (object: any) => object.constructor as ExtractSubjectType<Subjects>
    })
}

export const defaultACLObj: ACLObj = {
    action: 'manage',
    subject: 'all'
}

export default defineRulesFor
