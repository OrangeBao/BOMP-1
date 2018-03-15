class Options {
    job_name: string;
    static_configs: any[];
    honor_labels: boolean;
    scrape_interval: string;
}

// export class DataSource {
//     id: number;
//     name: string;
//     lang1: string;
//     desc: string;
//     url: string;
//     labels: string[];
//     createdTime: number;
//     updateTime: number;
//     regionId: string;
//     regionName: string;
//     options: Options;
// }


export class DataSource {
    id: number;
    orgId: number;
    name: string;
    type: string;
    typeLogoUrl: string;
    access: string;
    url: string;
    password: string;
    user: string;
    database: string;
    basicAuth: boolean;
    basicAuthUser: string;
    basicAuthPassword: string;
    isDefault: boolean;
    jsonData: object;
}