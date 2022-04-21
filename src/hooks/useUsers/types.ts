import { Employee } from "../useEmployees/types"

type Role = {
    _id: string
    name: string
}

export type User = {
    _id: string
    username: string
    password: string
    status: number | null
    roles: Role[]
    employee: Employee | null
}