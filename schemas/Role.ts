import { list } from '@keystone-next/keystone/schema';
import { text, relationship } from '@keystone-next/fields';
import { permissionFields } from './fields';

export const Role = list({
  //access:
  //ui
  fields: {
    name: text({ isRequired: true }),
    assignedTo: relationship({
      ref: 'User.role',
      many: true,
      ui: {
        itemView: { fieldMode: 'read' },
      },
    }),
    ...permissionFields,
  },
});
