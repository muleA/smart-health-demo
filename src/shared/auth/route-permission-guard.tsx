import { Navigate } from "react-router-dom";
import { useAuth } from "./use-auth";
import { SYSTEM_ROOT_PERMISSION } from "../../models/permission";

interface ProtectedRouteProps {
  requiredPermissions: string[];
  children: JSX.Element;
}

const RoutePermissionGuard = (props: ProtectedRouteProps): JSX.Element => {
  const { session } = useAuth();

  // Get the user's permissions from the authentication session
  const userPermissions =
    session?.userInfo?.EmployeeRoles?.flatMap((role: { role: { rolePermission: any; }; }) => role?.role?.rolePermission ?? []).flat().map(
      (permission: { permissionName: any; }) => permission.permissionName,
    ) ?? [];

  // Check if the user has the root permission, if so allow access
  if (userPermissions.includes(SYSTEM_ROOT_PERMISSION)) {
    return props.children;
  }
  
  // Check if the user has ALL of the required permissions, if not redirect to a custom route such as an error page or home page
  if (!props.requiredPermissions.every((permission) => userPermissions.includes(permission))) {
    return <Navigate to="/*" replace />;
   }

   // Allow access if the user has all required permissions specified in prop
   return props.children; 
};

export default RoutePermissionGuard;