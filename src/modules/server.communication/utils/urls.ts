export function getAbsPath (path: string, port?: number): string {
    return `${this.getServerAddr()}${port ? `:${port}` : ''}/${path}`;
}

export function getServerAddr (): string {
    return `${location.protocol}//${location.host}`;
}
