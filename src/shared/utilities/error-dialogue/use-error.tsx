import { useAppDispatch, useAppSelector } from "../../../store/app-store-hook";
import { selectError, setError } from "./error-slice";

  export const useError: any = () => {
 const dispatch = useAppDispatch();
 const error = useAppSelector(selectError);
  
 return {
setError: (error: any) => {
  dispatch(setError(error));
},
error,
 };
  };
  