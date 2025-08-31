import { create } from 'zustand';
import type { 
  InspectionTypeT, 
  ReservationInfoT, 
  ShippingInfoT, 
  PersonInfoT, 
  AgreementsT 
} from '../schemas';

type Step = 0 | 1 | 2 | 3;

type State = {
  inspectionType: InspectionTypeT | null;
  step: Step;
  reservation: ReservationInfoT;
  shipping: ShippingInfoT;
  person: PersonInfoT;
  agreements: AgreementsT;
};

type Actions = {
  setInspectionType: (type: InspectionTypeT) => void;
  next: () => void;
  prev: () => void;
  setReservation: (v: Partial<ReservationInfoT>) => void;
  setShipping: (v: Partial<ShippingInfoT>) => void;
  setPerson: (v: Partial<PersonInfoT>) => void;
  setAgreements: (v: Partial<AgreementsT>) => void;
  reset: () => void;
};

const initial: State = {
  inspectionType: null,
  step: 0,
  reservation: { centerId: '', date: '', time: '' },
  shipping: { receiver: '', address: '', phone: '' },
  person: { name: '', birth: '', phone: '' },
  agreements: { terms: false, privacy: false, marketing: false },
};

export const useApplyStore = create<State & Actions>((set) => ({
  ...initial,
  setInspectionType: (type) => set({ inspectionType: type, step: 0 }),
  next: () => set(s => ({ step: (Math.min(3, s.step + 1) as Step) })),
  prev: () => set(s => ({ step: (Math.max(0, s.step - 1) as Step) })),
  setReservation: (v) => set(s => ({ reservation: { ...s.reservation, ...v }})),
  setShipping: (v) => set(s => ({ shipping: { ...s.shipping, ...v }})),
  setPerson: (v) => set(s => ({ person: { ...s.person, ...v }})),
  setAgreements: (v) => set(s => ({ agreements: { ...s.agreements, ...v }})),
  reset: () => set({ ...initial }),
}));