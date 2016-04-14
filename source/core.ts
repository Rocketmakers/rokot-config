export interface IConfigurationProvider {
    get<T>(key: string): Promise<T>;
}
