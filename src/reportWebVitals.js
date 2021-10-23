export default async function reportWebVitals(onPerfEntry) {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		const {getCLS, getFID, getFCP, getLCP, getTTFB} = await import(
			/* webpackChunkName: "web-vitals" */'web-vitals');
		getCLS(onPerfEntry);
		getFID(onPerfEntry);
		getFCP(onPerfEntry);
		getLCP(onPerfEntry);
		getTTFB(onPerfEntry);
	}
}
