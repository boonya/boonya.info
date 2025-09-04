declare module 'astro:env/client' {
	export const BUILD: string;	
	export const ENVIRONMENT: string;	
	export const ORIGIN: string;	
	export const GISCUS_REPO: string | undefined;	
	export const GISCUS_REPO_ID: string | undefined;	
	export const GISCUS_CATEGORY: string | undefined;	
	export const GISCUS_CATEGORY_ID: string | undefined;	
	export const FARO_COLLECTOR_URL: string | undefined;	
	export const GOOGLE_ANALYTICS_ID: string | undefined;	
}declare module 'astro:env/server' {
	export const NODE_ENV: 'development' | 'production';	
	export const PORT: number;	
}