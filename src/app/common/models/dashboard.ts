export class Dashboard {
    id: number;
    createTime: Date;
    createUser: string;
    file: {
        hash: string;
        name: string;
    };
    dashboardId: number;
    title: string;
    tags: string[];
    slug: string;
    url: string;
    panelNum: number;
    variables: {
        name: string;
        query: string;
        value: string;
        mname: string;
    }[];
    desc: string;
}
