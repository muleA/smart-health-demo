import React, { useEffect, useState } from "react";
import { useAuth } from "./use-auth";

type isPermittedProps = {
  requiredPermissions: string[];
  children: React.ReactNode;
};

const IsPermitted = ({ requiredPermissions, children }: isPermittedProps): JSX.Element => {
    
  const [authorized, setAuthorized] = useState<boolean>(false);
  const {session} = useAuth();
  console.log("session obj",session)
  console.log("requiredPermissions",requiredPermissions)

  useEffect(() => {
  /*   const userPermissions = session?.userInfo?.EmployeeRoles?.flatMap(
      (role: { role: { rolePermission: any; }; }) => role?.role?.rolePermission ?? []
    ).map((permission: { permissionName: any; }) => permission.permissionName) ?? []; */

/*     console.log("userPermissions at permitted",userPermissions)
 */    const employeeRoles = session?.userInfo?.EmployeeRoles;
  console.log('employeeRoles:', employeeRoles);

  const flattenedRoles = employeeRoles?.flatMap((role: { role: { rolePermission: any; }; }) => role?.role?.rolePermission ?? []).flat();
  console.log('flattenedRoles:', flattenedRoles);

  const userPermission = flattenedRoles?.map((permission: { permissionName: any; }) => permission?.permissionName) ?? [];
  console.log('userPermissions:', userPermission);

    const isAuthorized =
      userPermission?.includes("SYSTEM_ROOT") ||
      requiredPermissions.every((permission) => userPermission?.includes(permission));

    setAuthorized(isAuthorized);
  }, [requiredPermissions, session?.userInfo?.EmployeeRoles]);

  return <>{authorized && <>{children}</>}</>;
};

export default IsPermitted;

export const IsPermittedWithoutChildren = (requiredPermissions: string[]): boolean => {
  const [authorized, setAuthorized] = useState<boolean>(false);

  const session = useAuth();

  useEffect(() => {
    const userPermissions =
    session?.userInfo?.EmployeeRoles?.flatMap((role: { role: { rolePermission: any; }; }) => role?.role?.rolePermission ?? []).flat().map(
      (permission: { permissionName: any; }) => permission.permissionName,
    ) ?? [];

    const isAuthorized =
      userPermissions?.includes("SYSTEM_ROOT") ||
      requiredPermissions.every((permission) => userPermissions?.includes(permission));

    setAuthorized(isAuthorized);
  }, [requiredPermissions, session?.userInfo?.EmployeeRoles]);
  return authorized;
};
