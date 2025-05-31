'use client';

import { useEffect } from 'react';
import i18next from 'i18next';
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
  type UseTranslationOptions,
} from 'react-i18next';
import { useCookies } from 'react-cookie';
import resourcesToBackend from 'i18next-resources-to-backend';

import { getOptions, languages, defaultNS } from './settings';

const runsOnServerSide = typeof window === 'undefined';

if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`../../public/locales/${language}/${namespace}.json`)))
    .init({
      ...getOptions(),
      lng: undefined,
      detection: {
        order: ['cookie', 'htmlTag', 'navigator'],
        caches: ['cookie'],
      },
      preload: runsOnServerSide ? languages : [],
    });
}

export function useTranslation(
  lng: string,
  ns = defaultNS,
  options?: UseTranslationOptions<string>
) {
  const [cookies, setCookie] = useCookies(['i18next']);
  const ret = useTranslationOrg(ns, {
    ...options,
    lng,
  });
  const { i18n } = ret;

  useEffect(() => {
    if (i18n.resolvedLanguage !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  useEffect(() => {
    if (cookies.i18next !== i18n.resolvedLanguage) {
      setCookie('i18next', i18n.resolvedLanguage, { path: '/' });
    }
  }, [cookies.i18next, i18n.resolvedLanguage, setCookie]);

  return ret;
}
