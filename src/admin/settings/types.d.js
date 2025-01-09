// Global WordPress types
declare global {
    interface Window {
        wp: {
            element: any;
            i18n: any;
            components: any;
        };
        postNestSettings: {
            apiUrl: string;
            nonce: string;
            adminUrl: string;
            user: {
                id: number;
                name: string;
                email: string;
                avatar: string;
            };
            capabilities: {
                canManageOptions: boolean;
                canPublishPosts: boolean;
            };
            initialRoute: string;
        };
    }
}

export {}; 