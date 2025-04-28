import { createContext, useContext, useState } from 'react';

const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {
  const [perms, setPerms] = useState(null);

  return (
    <PermissionContext.Provider value={{ perms, setPerms }}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = () => useContext(PermissionContext);