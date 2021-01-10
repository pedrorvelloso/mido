import { roles } from '../utils/InitializeRoles';

export default (role: string): boolean => {
  const checkRole = roles.find(r => r.name === role);

  return !!checkRole;
};
