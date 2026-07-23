export interface AIEntryPointInterface {
    run(): Promise<void> | void;
};