export const mod_roles = client => client.mod_roles
  .map(id => ({ type: "ROLE", id: id, permission: true }));
