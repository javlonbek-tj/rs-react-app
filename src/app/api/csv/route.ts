interface PokeDetailResponse {
  id: number;
  name: string;
  types: Array<{ type: { name: string } }>;
}

const BASE_URL = 'https://pokeapi.co/api/v2';

function escapeCsv(value: string | number) {
  const stringValue = String(value);
  return /[",\n]/.test(stringValue)
    ? `"${stringValue.split('"').join('""')}"`
    : stringValue;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = (searchParams.get('ids') ?? '')
    .split(',')
    .map((id) => Number(id))
    .filter((id) => Number.isInteger(id) && id > 0);

  if (ids.length === 0) {
    return Response.json({ error: 'No Pokemon selected' }, { status: 400 });
  }

  const results = await Promise.all(
    ids.map(async (id) => {
      const res = await fetch(`${BASE_URL}/pokemon/${id}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch Pokemon ${id}`);
      }
      return (await res.json()) as PokeDetailResponse;
    })
  );

  const rows = results.map((pokemon) => {
    const types = pokemon.types.map((type) => type.type.name);
    const description = `A ${types.join('/')} type Pokemon`;
    return [
      pokemon.id,
      pokemon.name,
      types.join('|'),
      description,
      `${BASE_URL}/pokemon/${pokemon.id}`,
    ]
      .map(escapeCsv)
      .join(',');
  });

  const csv = ['id,name,type,description,url', ...rows].join('\n');

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${ids.length}_items.csv"`,
    },
  });
}
