export class Template {
    id: number;
    createTime: Date;
    createUser: string;
    file: Object;
    dashboardId: number;
    title: string;
    tags: string[];
    slug: string;
    url: string;
    panelNum: number;
    variables: Array<{
        name: string;
        value: string;
    }>;
}