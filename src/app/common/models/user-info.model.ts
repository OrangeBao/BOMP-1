/**
 * Created by baoyinghai on 12/20/17.
 */
export class Organization {
    id: number;
    name: string;
    parentId: number;
    createUserId: number;
    updateUserId: number;
    userId: number;
    hasChildren: true;
}

export class GraOrg {
  template: number;
  dashboard: number;
}

export enum Role {
    ADMIN,
    VIEWER
}


export class UserInfo {
    userId: number;
    userName: string;
    perms: string[];
    menus: string[];
    homePage: string;
    roles: Array<Role>;
    org: Organization;
    graOrg: GraOrg;
    geass: string;
}
