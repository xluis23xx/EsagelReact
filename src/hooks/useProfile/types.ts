import { GeneralResponse } from "../types";
import {User} from '../useUsers'

export type ResetPassordResponse = GeneralResponse

export type ProfileResponse = GeneralResponse & {
    doc?: User | null;
}