import { baseUrl } from "../../../shared/config";
export const employeeEndPoints = {
  getEmployee: `${baseUrl}employees/get-Employees`,
  getEmployeeById: `${baseUrl}employees/get-employee`,
  getArchivedEmployee: `${baseUrl}employees/get-archived-employees`,
  getArchivedEmployeeById: `${baseUrl}employees/get-archived-employeesById`,
  getRoleToEmployee: `${baseUrl}employees/get-role-to-employeesId`,  
  createEmployee: `${baseUrl}employees/create-employees`,
  archiveEmployee: `${baseUrl}employees/archive-employees`,
  restoreEmployee: `${baseUrl}employees/restore-employees`,
  deleteEmployee: `${baseUrl}employees/delete-employees`,
  updateEmployee: `${baseUrl}employees/update-employees`, 
  addRoleToEmployee: `${baseUrl}employees/add-role-to-employees`,  

};
