import { KeystoneContext } from '@keystone-next/types';

import { OrderCreateInput } from '../.keystone/schema-types';

async function checkout(
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {}

export default checkout;
