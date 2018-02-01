export enum AlertType {
    SUCCESS,
    INFO,
    WARNING,
    ERROR
}

export class Alert {
    title: string;
    content: string;
    remark: string;
    okText: string;
    cancelText: string;
    ok: VoidFunction;
    cancel: VoidFunction;
    type: AlertType;
}

