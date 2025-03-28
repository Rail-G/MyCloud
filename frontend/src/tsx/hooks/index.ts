import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "../redux/store/store";

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<RootDispatch>();