import {useMemo} from 'react';
import {useSearchParams} from 'react-router-dom';

const ITEMS_PER_PAGE = 5;

export default function usePagination(items, number = ITEMS_PER_PAGE) {
	const [searchParams] = useSearchParams();

	const pageValue = useMemo(() => {
		return searchParams.get('page');
	}, [searchParams]);

	const page = useMemo(() => {
		const n = Number(pageValue);
		return n > 1 ? n : 1;
	}, [pageValue]);

	const paginate = useMemo(() => {
		return items.length > number;
	}, [items.length, number]);

	const count = useMemo(() => {
		return Math.ceil(items.length / number);
	}, [items.length, number]);

	const isValid = useMemo(() => {
		if (!pageValue) {
			return true;
		}
		const n = Number(pageValue);
		if (Number.isInteger(n) && n > 1 && n <= count) {
			return true;
		}
		return false;
	}, [count, pageValue]);

	const start = useMemo(() => {
		if (page > 1) {
			return number * (page - 1);
		}
		return 0;
	}, [number, page]);

	const end = useMemo(() => {
		if (page > 1) {
			return number * page;
		}
		return number;
	}, [number, page]);

	return useMemo(() => {
		return [
			items.slice(start, end),
			{isValid, paginate, count, page},
		];
	}, [items, start, end, isValid, paginate, count, page]);
}
