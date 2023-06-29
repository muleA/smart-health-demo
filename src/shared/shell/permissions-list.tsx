export const permissionGroups = {
  approve_application: "Approve_Applications",
  create_user: "create_user",
  reject_application: "reject_application",
  view_dashboard: "view_dashboard",
  view_employee: "view_employee",
  view_role: "view_role",
  create_role: "create_role",
  view_permission: "view_permission",
  create_permission: "create_permission",
  view_user: "view_user",
  assign_role_to_employee: "assign_role_to_employee",
  view_applications: "view_applications",
  _view_applications: "committe_review",
  view_license: "view_license",
  change_license_status: "change_license_status",
  view_archives: "view_archives",
  update_permission:"update_permission"
};

export const CreateUserPermission: string[] = [permissionGroups.create_user];
export const UpdateUserPermission: string[] = [permissionGroups.update_permission];


export const ApproveApplication: string[] = [
  permissionGroups.approve_application,
];
export const RejectApplication: string[] = [
  permissionGroups.reject_application,
];
export const AssignRole: string[] = [permissionGroups.assign_role_to_employee];
export const CreatePermission: string[] = [permissionGroups.create_permission];
export const CreateRole: string[] = [permissionGroups.create_role];
export const CreateUser: string[] = [permissionGroups.create_user];
export const ChangeLicenseStatus: string[] = [
  permissionGroups.change_license_status,
];
/* views */
export const ViewDashboard: string[] = [permissionGroups.view_dashboard];
export const ViewEmployee: string[] = [permissionGroups.view_employee];
export const ViewRole: string[] = [permissionGroups.view_role];
export const ViewUser: string[] = [permissionGroups.view_user];
export const ViewApplications: string[] = [permissionGroups.view_applications];
export const _ViewApplications: string[] = [permissionGroups._view_applications];
export const ViewArchives: string[] = [permissionGroups.view_archives];
export const ViewLicense: string[] = [permissionGroups.view_license];
export const viewPermission: string[] = [permissionGroups.view_permission];
