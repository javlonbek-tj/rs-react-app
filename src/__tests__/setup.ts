import '@testing-library/jest-dom';
import { server } from '../mocks/server';
import React from 'react';

vi.mock('next/image', () => ({
  default: ({
    alt,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement('img', { alt, src, ...props }),
}));

const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  prefetch: vi.fn(),
};

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
  redirect: vi.fn(),
  usePathname: () => '/',
  useRouter: () => mockRouter,
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    React.createElement('a', { href: String(href), ...props }, children),
  redirect: vi.fn(),
  usePathname: () => '/',
  useRouter: () => mockRouter,
}));

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
