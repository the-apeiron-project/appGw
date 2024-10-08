import { computed, defineComponent, inject, ref, type Ref, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { useAlertService } from '@/shared/alert/alert.service';
import useDataUtils from '@/shared/data/data-utils.service';
import useSolucionUtils from '@/shared/solucion/solucion-utils.service';

import { useValidation, useDateFormat } from '@/shared/composables';

//Entity services
import SolucionService from '@/entities/solucion/solucion.service';
import ScriptService from '@/shared/script/script.service';

//Entity model
import { Solucion, type ISolucion } from '@/shared/model/solucion.model';

import { useSelectOptions } from '@/shared/composables/use-select-options';

import type { NodeChange } from '@/shared/model/proceso/diagram.model';
import { NodeChangeType } from '@/shared/model/enumerations/node-change-type.model';
import { EdgeChangeType } from '@/shared/model/enumerations/edge-change-type.model';

import { useSideNavbarStore, useSolutionStore } from '@/store';
import { type IStateEditable } from '@/shared/model/proceso/estado.model';
import useObjectUtils from '@/shared/util/object-utils';
import { EstadoSolucion } from '@/shared/model/enumerations/estado-solucion.model';
import VersionComponent from '@/components/process/version/version.vue';
import GeneralData from './components/general-data/general-data.vue';
import Messages from './components/messages/messages.vue';
import AccessControl from './components/access-control/access-control.vue';
import ChangeControl from './components/change-control/change-control.vue';
import Configuration from './components/configuration/configuration.vue';
import Dashboard from './components/dashboard/dashboard.vue';
import EmailTemplate from './components/email-template/email-template.vue';
import Forms from './components/forms/forms.vue';

const useValidationRules = (validations: any, t$: any) => {
  return {
    title: { required: validations.required(t$('entity.validation.required').toString()) },
    menuName: {},
    description: {},
    name: {},
    path: {},
    type: {},
    icon: {},
    display: {},
    tags: {},
    owner: {},
    machineName: {},
    tipo: {},
  };
};

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'SolucionUpdate',
  components: {
    version: VersionComponent,
    'access-control': AccessControl,
    'change-control': ChangeControl,
    configuration: Configuration,
    dashboard: Dashboard,
    'email-template': EmailTemplate,
    forms: Forms,
    'general-data': GeneralData,
    messages: Messages,
  },
  setup() {
    //Commons methods
    const { t: t$ } = useI18n();
    const coreFlow = ref<any>(null);
    const selectOptions = useSelectOptions();
    const validations = useValidation();
    const validationRules = useValidationRules(validations, t$);
    const dateFormat = useDateFormat();
    const dataUtils = useDataUtils();
    const solucionUtils = useSolucionUtils();
    const route = useRoute();
    const router = useRouter();
    const objectUtils = useObjectUtils();
    //Common services
    const alertService = inject('alertService', () => useAlertService(), true);
    const solucionService = inject('solucionService', () => new SolucionService());
    const scriptService = inject('scriptService', () => new ScriptService());

    //Common properties
    const solucion: Ref<ISolucion> = ref(new Solucion());
    const currentPublishedSolution: Ref<ISolucion> = ref(new Solucion());

    const isSaving: Ref<boolean> = ref(false);
    const isFetching: Ref<boolean> = ref(false);

    const isImporting: Ref<boolean> = ref(false);
    const tabIndex: Ref<number> = ref(0);
    const stateToEdit: Ref<IStateEditable | null> = ref(null);
    //SelectOne options
    const tipoMenuOptions = ref(selectOptions.menuOptions);
    const tipoComponentOptions = ref(selectOptions.componenteOptions);

    //Store configuration
    const sideNavbarStore = useSideNavbarStore();
    const solutionStore = useSolutionStore();

    // Method definition
    const retriveById = async (solucionId: any) => {
      isFetching.value = true;
      try {
        const res: ISolucion = await solucionService().findByLastEdited(solucionId);
        solucion.value = res;
        isFetching.value = false;
        solutionStore.initContext(objectUtils.clone(solucion.value));
        //Dirty fix to fit the flow view after loading
        setTimeout(() => coreFlow.value.fitViewHandler(), 100);
      } catch (error: any) {
        alertService.showHttpError(error.response);
      }
    };

    const retriveLastPublishedById = async (solucionId: any) => {
      try {
        const res: ISolucion = await solucionService().find(solucionId);
        currentPublishedSolution.value = res;
      } catch (error: any) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.solucionId) {
      retriveById(route.params.solucionId);
      retriveLastPublishedById(route.params.solucionId);
    }

    //Validation configuration
    const v$ = useVuelidate(validationRules, solucion as any);
    v$.value.$validate();

    onUnmounted(() => {
      sideNavbarStore.closeLeftSidebar();
      sideNavbarStore.closeRightSidebar();
    });

    const saveStateToEditInSolution = () => {
      if (stateToEdit.value && solucion.value.proceso?.estados) {
        const index = solucion.value.proceso.estados.findIndex(state => state.nombre === stateToEdit.value?.id);

        if (index >= 0 && stateToEdit.value.state) {
          solucion.value.proceso.estados[index] = objectUtils.clone(stateToEdit.value.state);
        }
        sideNavbarStore.closeRightSidebar();
      }
    };

    const isNavbarOpen = computed(() => sideNavbarStore.isLeftOpened || sideNavbarStore.isRightOpened);

    // Save the statetoEdit into the solution
    watch([stateToEdit], () => {
      if (stateToEdit?.value?.saved) {
        saveStateToEditInSolution();
      }
    });

    const isArchivada = computed(() => solucion.value.estado === EstadoSolucion.ARCHIVADA);

    return {
      tipoMenuOptions,
      tipoComponentOptions,
      ...dateFormat,
      ...dataUtils,
      solucion,
      currentPublishedSolution,
      isSaving,
      tabIndex,
      isImporting,
      isFetching,
      t$,
      v$,
      router,
      alertService,
      solucionService,
      scriptService,
      sideNavbarStore,
      solucionUtils,
      stateToEdit,
      solutionStore,
      objectUtils,
      isArchivada,
      isNavbarOpen,
      coreFlow,
    };
  },
  methods: {
    handleClone(): void {},
    handleExport(): void {},
    handleOpenImportModal(): void {},
    handleActivatedTab(): void {},
    linkClass(index: number): string[] {
      if (this.tabIndex === index) {
        return ['bg-light', 'text-primary'];
      } else {
        return ['bg-light'];
      }
    },
    resolveIcon(icon: string, index: number): string {
      return icon + (this.isTabActive(index) ? '-fill' : '');
    },
    isTabActive(index: number): boolean {
      if (this.tabIndex === index) {
        return true;
      } else {
        return false;
      }
    },
    previousState(): void {
      this.router.go(-1);
    },
    createForm(): void {},
    save(): void {
      this.isSaving = true;
      if (this.solucion.id) {
        this.solucionService()
          .update(this.solucion)
          .then((param: any) => {
            this.isSaving = false;
            this.alertService.showInfo(this.t$('flowMsApp.flowMsDemoPaginate.updated', { param: param.id }));
          })
          .catch((error: any) => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.solucionService()
          .create(this.solucion)
          .then((param: any) => {
            this.isSaving = false;
            this.alertService.showSuccess(this.t$('flowMsApp.flowMsDemoPaginate.created', { param: param.id }).toString());
          })
          .catch((error: any) => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },

    nodeChangeHandler(change: NodeChange) {
      if (change.type === NodeChangeType.POSITION) {
        this.positionChangeHandler(change);
      } else if (change.type === NodeChangeType.ADD) {
        this.addNodeHandler(change);
      } else if (change.type === NodeChangeType.DELETE) {
        this.deleteNodeHandler(change);
      } else if (change.type === NodeChangeType.DOUBLE_CLICK) {
        this.doubleClickNodeHandler(change);
      }
    },

    edgeChangeHandler(change: any) {
      if (change.type === EdgeChangeType.ADD) {
        this.addEdgeHandler(change);
      } else if (change.type === EdgeChangeType.DELETE) {
        this.deleteEdgeHandler(change);
      } else if (change.type === EdgeChangeType.DOUBLE_CLICK) {
        this.doubleClickEdgeHandler(change);
      }
    },

    positionChangeHandler(change: any) {
      console.log('positionChangeHandler');
      this.solucion.proceso?.estados?.forEach(estado => {
        if (estado.nombre === change.id && estado.diagram) {
          estado.diagram.x = change.x;
          estado.diagram.y = change.y;
        }
      });
    },
    addNodeHandler(change: any) {
      console.log('addNodeHandler');
    },
    addEdgeHandler(change: any) {
      console.log('addEdgeHandler');
    },
    deleteNodeHandler(change: any) {
      console.log('deleteNodeHandler');
    },
    deleteEdgeHandler(change: any) {
      console.log('deleteEdgeHandler');
    },
    clickNodeHandler(change: any) {
      console.log('clickNodeHandler');
    },
    doubleClickNodeHandler(change: any) {
      this.stateToEdit = this.solucionUtils.createStateToEdit(this.solucion.proceso, change.id);

      if (this.stateToEdit.state?.nombre) {
        this.sideNavbarStore.setStateToEdit(this.stateToEdit);
        this.sideNavbarStore.openRightSidebar();
      }
    },
    clickEdgeHandler(change: any) {
      console.log('clickEdgeHandler');
    },
    doubleClickEdgeHandler(change: any) {
      console.log('doubleClickEdgeHandler');
    },
    fitViewHandler() {
      this.coreFlow.fitViewHandler();
    },
  },
});
