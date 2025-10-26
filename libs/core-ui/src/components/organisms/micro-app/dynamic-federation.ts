// libs/core-ui/src/components/organisms/micro-app/dynamic-federation.tsx
export interface IRemoteApp {
    name: string;
    url: string;
}

// Type definition for a function that resolves the URL of a remote module
export type RemoteUrlResolver = (
    remoteName: string
) => string | Promise<string>;

type ModuleFactoryType = () => ({ default: unknown });

declare const __webpack_init_sharing__: (scope: 'default') => Promise<void>;
declare const __webpack_share_scopes__: { default: unknown };

interface IContainer {
    get: (moduleName: string) => Promise<ModuleFactoryType>,
    init: (shareScope?: unknown, initScope?: unknown) => Promise<void>
}
// Class for dynamic federation with singleton pattern
export class DynamicFederation {
    private static instance: DynamicFederation;
    private static remoteApps: IRemoteApp[] = [];
    private remoteUrlResolver: RemoteUrlResolver | undefined;
    private remoteUrlDefinitions: Record<string, string> = DynamicFederation.getRemoteAppsAsObject();
    private remoteModuleCache = new Map<string, unknown>();
    private remoteContainerCache = new Map<string, IContainer>();
    private hasInitialSharingScope = false;
    private loadingRemoteUrls: Array<{ url: string, element: HTMLScriptElement }> = [];
    private loadedRemoteUrls: string[] = [];

    private constructor(remotes?: IRemoteApp[]) {
        DynamicFederation.remoteApps = remotes || DynamicFederation.remoteApps;
        this.remoteUrlDefinitions = DynamicFederation.getRemoteAppsAsObject();
    }

    public static getRemoteAppsAsObject = (): { [key: string]: string } => {
        return DynamicFederation.remoteApps.reduce((acc: { [key: string]: string }, remote: IRemoteApp) => {
            acc[remote.name] = remote.url;
            return acc;
        }, {} as { [key: string]: string });
    }

    public static getInstance(remotes?: IRemoteApp[]): DynamicFederation {
        if (!DynamicFederation.instance) {
            DynamicFederation.instance = new DynamicFederation(remotes);
        }
        return DynamicFederation.instance;
    }

    // Set the function to resolve the URL of a remote module
    public setRemoteUrlResolver(resolver: RemoteUrlResolver) {
        this.remoteUrlResolver = resolver;
    }

    public async tryGetModuleFactory(container: IContainer, moduleName: string): Promise<ModuleFactoryType | undefined> {
        try {
            return await container.get(moduleName);
        } catch {
            const moduleNameSplit = moduleName.split("/").filter(f => f.length > 0);
            moduleNameSplit.pop();

            const parentModuleName = `/${moduleNameSplit.join("/")}`;
            if (parentModuleName !== moduleName && parentModuleName.length > 1) {
                return await this.tryGetModuleFactory(container, parentModuleName);
            }
        }

        return;
    }
    // Load a remote module
    public async loadRemoteModule(remoteName: string, moduleName: string): Promise<any> {
        const moduleKey = `${remoteName}:${moduleName}`;
        if (this.remoteModuleCache.has(moduleKey)) {
            return this.remoteModuleCache.get(moduleKey);
        } else {

            const container: IContainer | undefined = this.remoteContainerCache.has(remoteName)
                ? this.remoteContainerCache.get(remoteName)
                : await this.loadRemoteContainer(remoteName);

            if (container) {
                const moduleFactory = await this.tryGetModuleFactory(container, moduleName);
                if (moduleFactory) {
                    const RemoteModule = moduleFactory();
                    const remoteComponent = RemoteModule && RemoteModule.default ? () => RemoteModule.default : undefined;
                    if (remoteComponent) {
                        this.remoteModuleCache.set(moduleKey, remoteComponent);
                    }
                    return remoteComponent;
                }
            }
            return;
        }
    }

    private loadWithScriptTag = (url: string) => new Promise((resolve, reject) => {
        if (this.loadedRemoteUrls.includes(url)) {
            resolve(true);
            return true;
        }
        const loadingElement = this.loadingRemoteUrls.filter(f => f.url === url).pop();
        if (loadingElement) {
            loadingElement.element.addEventListener("load", () => {
                this.loadedRemoteUrls.push(url);
                resolve(true);
            });
            return true;
        }

        const element = document.createElement("script");
        this.loadingRemoteUrls.push({ url, element });

        element.src = url;
        element.type = "text/javascript";
        element.async = true;

        element.addEventListener("load", () => {
            // console.log(`Dynamic Script Loaded: ${url}`);
            this.loadedRemoteUrls.push(url);
            resolve(true);
        });

        element.addEventListener("error", () => {
            // console.error(`Dynamic Script Error: ${url}`);
            reject(false);
        });

        if (!document.head.contains(element)) {
            document.head.appendChild(element);
        }
    });

    // Helper function to import a module from a URL
    private importModule(remoteName: string, url: string) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const win = (window as any);
        return win[remoteName] ? win[remoteName] : import(/* webpackIgnore:true */ url);
    }

    // Load a remote container
    private async loadRemoteContainer(remoteName: string): Promise<IContainer | undefined> {
        if (!this.remoteUrlResolver && !this.remoteUrlDefinitions) {
            throw new Error(
                'Call setRemoteDefinitions or setRemoteUrlResolver to allow Dynamic Federation to find the remote apps correctly.'
            );
        }

        const remoteUrl = this.remoteUrlDefinitions
            ? this.remoteUrlDefinitions[remoteName]
            : (this.remoteUrlResolver ? await this.remoteUrlResolver(remoteName) : undefined);

        if (!remoteUrl)
            return;

        await this.loadWithScriptTag(remoteUrl);

        if (!this.hasInitialSharingScope) {
            this.hasInitialSharingScope = true;
            await __webpack_init_sharing__('default');
        }

        const containerUrl = `${remoteUrl}`; // ${remoteUrl.endsWith('/') ? '' : '/'}remoteEntry.js

        const container = await this.importModule(remoteName, containerUrl);
        if (container) {
            await container.init(__webpack_share_scopes__.default);

            this.remoteContainerCache.set(remoteName, container);
        }
        return container;
    }
}
