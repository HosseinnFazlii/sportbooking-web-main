import { VerticalNavItemsType } from '@mf-core/core-ui';
import { TFunction } from 'i18next';

const buildMenuKey = (name?: string) => {
  if (!name) {
    return null;
  }

  const normalized = name.trim().replace(/\s+/g, '_');

  if (!normalized) {
    return null;
  }

  return `menu_${normalized}`;
};

export const navigation = (
  menus: Array<{ parentId?: number, id: number, name: string, url?: string, icon?: string }>,
  translate: TFunction,
  parentId?: number
): VerticalNavItemsType => {
  return menus.filter(f => f.parentId === parentId).map(m => {
    const children = navigation(menus, translate, m.id);
    const translationKey = buildMenuKey(m.name);

    return {
      title: translationKey ? translate(translationKey, { defaultValue: m.name }) : m.name,
      path: m.url,
      icon: m.icon,
      children: children && children.length ? children : undefined
    }
  });
}
