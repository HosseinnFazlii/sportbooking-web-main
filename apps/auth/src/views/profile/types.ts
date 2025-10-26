import { ThemeColorType } from "@mf-core/core-ui"

export type ProfileTabCommonType = {
    icon: string
    value: string
    property: string
}
export type ProfileTeamsType = ProfileTabCommonType & { color: ThemeColorType }
export type ProfileHeaderType = {
    fullName: string
    role: string
    profileImg: string
    joiningDate: string
    designation: string
    designationIcon?: string
  }