import { useAccountStore as useStore } from '@/shared/config/store/account-store';
export type AccountStore = ReturnType<typeof useStore>;
export { useStore };

import { useTranslationStore } from '@/shared/config/store/translation-store';
export type TranslationStore = ReturnType<typeof useTranslationStore>;
export { useTranslationStore };

import { useSideNavbarStore } from '@/shared/config/store/side-navbar-store';
export type SideNavbarStore = ReturnType<typeof useSideNavbarStore>;
export { useSideNavbarStore };

import { useSolutionStore } from '@/shared/config/store/solution-store';
export type SolutionStore = ReturnType<typeof useSolutionStore>;
export { useSolutionStore };
