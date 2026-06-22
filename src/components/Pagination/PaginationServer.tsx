import { fetchTotal } from '@/api/pokeapi';
import Pagination from './Pagination';

interface Props {
  name?: string;
  limit: number;
}

export default async function PaginationServer({ name, limit }: Props) {
  const total = await fetchTotal(name);
  return <Pagination total={total} limit={limit} />;
}
