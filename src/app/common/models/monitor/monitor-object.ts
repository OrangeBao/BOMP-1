import { DataSource } from '../data-source';

export class MonitorObject {
    id: string;
    name: string;
    desc: string;
    tags: string[];
    datasource: DataSource
}

