import * as React from "react";

function loadComponent<Module>(scope: string, module: string) {
    return async () => {
        // Initializes the share scope. This fills it with known provided modules from this build and all remotes
        // @ts-ignore
        await __webpack_init_sharing__("default");
        // @ts-ignore
        const container = window[scope]; // or get the container somewhere else
        // Initialize the container, it may provide shared modules
        // @ts-ignore
        await container.init(__webpack_share_scopes__.default);
        // @ts-ignore
        const factory = await window[scope].get(module);
        const Module = factory();
        return Module as Module;
    };
}

const useDynamicScript = (args: { url: string }) => {
    const [ready, setReady] = React.useState(false);
    const [failed, setFailed] = React.useState(false);

    React.useEffect(() => {
        if (!args.url) {
            return;
        }

        const element = document.createElement("script");

        element.src = args.url;
        element.type = "text/javascript";
        element.async = true;

        setReady(false);
        setFailed(false);

        element.onload = () => {
            console.log(`Dynamic Script Loaded: ${args.url}`);
            setReady(true);
        };

        element.onerror = () => {
            console.error(`Dynamic Script Error: ${args.url}`);
            setReady(false);
            setFailed(true);
        };

        document.head.appendChild(element);

        return () => {
            console.log(`Dynamic Script Removed: ${args.url}`);
            document.head.removeChild(element);
        };
    }, [args.url]);

    return {
        ready,
        failed,
    };
};

interface ExternalComponentProps<T> {
    scope: string;
    url: string;
    module: string,
    componentProps: T
}

function ExternalComponent<T>(props: ExternalComponentProps<T>) {
    const { ready, failed } = useDynamicScript({
        url: props && props.url,
    });

    if (!props) {
        return <h2>Please select one app</h2>;
    }

    if (!ready) {
        return <h2>Loading dynamic script: {props.url}</h2>;
    }

    if (failed) {
        return <h2>Failed to load dynamic script: {props.url}</h2>;
    }

    const Component = React.lazy<React.ComponentType<T>>(
        loadComponent(props.scope, props.module)
    );

    return (
        <React.Suspense fallback="Loading ExternalComponent">
            <Component  {...props.componentProps} />
        </React.Suspense>
    );
}

export { ExternalComponent };