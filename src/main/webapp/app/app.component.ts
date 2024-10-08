import { type ComputedRef, defineComponent, provide, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import Ribbon from '@/core/ribbon/ribbon.vue';
import JhiFooter from '@/core/jhi-footer/jhi-footer.vue';
import JhiNavbar from '@/core/jhi-navbar/jhi-navbar.vue';
import HeroImage from '@/core/hero-image/hero-image.vue';
import LoginForm from '@/account/login-form/login-form.vue';

import { useAlertService } from '@/shared/alert/alert.service';
import { useSideNavbarStore } from '@/store';

import '@/shared/config/dayjs';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'App',
  components: {
    ribbon: Ribbon,
    'jhi-navbar': JhiNavbar,
    'login-form': LoginForm,
    'jhi-footer': JhiFooter,
    'hero-image': HeroImage,
  },
  setup() {
    provide('alertService', useAlertService());
    const authenticated = inject<ComputedRef<boolean>>('authenticated');

    const sideNavbarStore = useSideNavbarStore();
    sideNavbarStore.closeLeftSidebar();
    sideNavbarStore.closeRightSidebar();
    return {
      t$: useI18n().t,
      sideNavbarStore,
      authenticated,
    };
  },
});
