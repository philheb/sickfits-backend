import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

// PERMISSIONS check if someone meets a criteria - yes or no
export const permissions = {
  canManageProducts({ session }) {
    return !!session?.data.role?.canManageProducts;
  },
  canSeeOtherUsers({ session }) {
    return !!session?.data.role?.canSeeOtherUsers;
  },
  canManageUsers({ session }) {
    return !!session?.data.role?.canManageUsers;
  },
  canManageRoles({ session }) {
    return !!session?.data.role?.canManageRoles;
  },
  canManageCart({ session }) {
    return !!session?.data.role?.canManageCart;
  },
  canManageOrders({ session }) {
    return !!session?.data.role?.canManageOrders;
  },
};

// RULE based function
//Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (!session) return { status: 'AVAILABLE' }; //user should still be able to see products is not logged in
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    return { OR: [{ user: { id: session.itemId } }, { status: 'AVAILABLE' }] };
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts
    if (permissions.canManageCart({ session })) {
      return true;
    }
    return { order: { user: { id: session.itemId } } };
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    return { id: session.itemId };
  },
};
