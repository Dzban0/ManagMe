export type Role = "admin"|"devops"|"developer"

export interface User {
    id: number;
    name: string;
    role: Role;
}

export const users: User[] = [
    { id: 1, name: "Admin", role: "admin" },
    { id: 2, name: "DevOps User", role: "devops" },
    { id: 3, name: "Developer User", role: "developer" },
];