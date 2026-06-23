'use server';

import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

function isLocale(value: FormDataEntryValue | null): value is Locale {
  return typeof value === 'string' && routing.locales.includes(value as Locale);
}

export async function searchAction(_prevState: null, formData: FormData) {
  const name = (formData.get('name') as string)?.trim().toLowerCase();
  const limit = formData.get('limit') as string | null;
  const currentName = formData.get('currentName') as string | null;
  const submittedLocale = formData.get('locale');
  const locale = isLocale(submittedLocale)
    ? submittedLocale
    : routing.defaultLocale;

  if (name === currentName) return null;

  const params = new URLSearchParams();
  if (name) params.set('name', name);
  if (limit) params.set('limit', limit);

  const query = params.toString();
  redirect(`/${locale}${query ? `?${query}` : ''}`);
}
