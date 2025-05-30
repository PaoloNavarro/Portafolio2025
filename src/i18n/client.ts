// src/i18n/client.ts
'use client';

import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import { useCookies } from 'react-cookie';
import resourcesToBackend from 'i18next-resources-to-backend';

import { getOptions, languages, defaultNS } from './settings';

const runsOnServerSide = typeof window === 'undefined';

// Initialize i18next once globally, but without a specific 'lng' or detection,
// as the `useTranslation` hook will manage language changes based on the URL.
if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`../../public/locales/${language}/${namespace}.json`)))
    .init({
      ...getOptions(), // Get base options, but override lng and detection
      lng: undefined, // Let the useEffect in useTranslation handle the primary lng
      detection: {
        order: ['cookie', 'htmlTag', 'navigator'], // Keep detector for robustness, but rely on useEffect for primary language
        caches: ['cookie'],
      },
      preload: runsOnServerSide ? languages : []
    });
}

export function useTranslation(lng: string, ns = defaultNS, options?: any) {
  const [cookies, setCookie] = useCookies(['i18next']);
  const ret = useTranslationOrg(ns, {
    ...options,
    // CRITICAL: Provide the correct language for the initial render, both server and client.
    // This tells react-i18next what language to use for the initial `t` function.
    lng: lng,
  });
  const { i18n } = ret;

  // This useEffect ensures i18n's internal language matches the URL's `lng`
  // if it somehow gets out of sync (e.g., direct navigation, client-side route changes).
  useEffect(() => {
    if (i18n.resolvedLanguage !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  // Sync i18n's resolved language with the cookie
  useEffect(() => {
    if (cookies.i18next !== i18n.resolvedLanguage) {
      setCookie('i18next', i18n.resolvedLanguage, { path: '/' });
    }
  }, [cookies.i18next, i18n.resolvedLanguage, setCookie]);

  return ret;
}