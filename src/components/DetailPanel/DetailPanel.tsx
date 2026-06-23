import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { fetchPokemonById } from '@/api/pokeapi';
import { typeColors } from '../../utils/typeColors';
import DetailPanelClose from './DetailPanelClose';

interface Props {
  detailId: string;
}

export default async function DetailPanel({ detailId }: Props) {
  const t = await getTranslations('detail');
  const pokemon = await fetchPokemonById(detailId);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
        <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200">
          {t('title')}
        </h2>
        <div className="flex items-center gap-2">
          <DetailPanelClose />
        </div>
      </div>

      <div className="flex-1 px-6 py-8">
        {pokemon && (
          <div className="flex flex-col items-center gap-6">
            <div className="bg-slate-50 dark:bg-slate-600 rounded-2xl w-full flex items-center justify-center py-10 relative aspect-square max-h-64">
              <span className="absolute top-4 right-4 text-sm text-slate-300 font-mono font-semibold">
                #{String(pokemon.id).padStart(3, '0')}
              </span>
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                fill
                className="object-contain drop-shadow-xl p-6"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>

            <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 capitalize">
              {pokemon.name}
            </h3>

            <div className="flex gap-2 flex-wrap justify-center">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className={`px-4 py-1 rounded-full text-sm font-semibold capitalize ${
                    typeColors[type] ?? 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {type}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">
                  {t('height')}
                </p>
                <p className="text-slate-800 dark:text-slate-100 text-xl font-bold">
                  {(pokemon.height / 10).toFixed(1)} m
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">
                  {t('weight')}
                </p>
                <p className="text-slate-800 dark:text-slate-100 text-xl font-bold">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
