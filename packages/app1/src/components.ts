declare module "components/ButtonNotification" {
    const ButtonNotification: React.ComponentType<{
        onNotification: (notification: {
            id: string,
            app: string,
            title: string,
            data: any
        }) => void
    }>;

    export default ButtonNotification;
}