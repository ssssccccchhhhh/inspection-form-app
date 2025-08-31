import { z } from 'zod';

export const InspectionType = z.enum(['RESERVATION', 'SHIPPING']);

export const ReservationInfo = z.object({
  centerId: z.string().min(1, '센터를 선택해 주세요.'),
  date: z.string().min(1, '날짜를 선택해 주세요.'),
  time: z.string().min(1, '시간을 선택해 주세요.'),
});

export const ShippingInfo = z.object({
  receiver: z.string().min(1, '수령인을 입력해 주세요.'),
  address: z.string().min(1, '주소를 입력해 주세요.'),
  phone: z.string().min(8, '연락처를 입력해 주세요.'),
});

export const PersonInfo = z.object({
  name: z.string().min(1),
  birth: z.string().min(8), // YYYYMMDD
  phone: z.string().min(8),
});

export const Agreements = z.object({
  terms: z.boolean().refine(v => v, '약관 동의가 필요합니다.'),
  privacy: z.boolean().refine(v => v, '개인정보 동의가 필요합니다.'),
  marketing: z.boolean().optional(),
});

export const ReservationApplyPayload = z.object({
  inspectionType: z.literal('RESERVATION'),
  reservation: ReservationInfo,
  person: PersonInfo,
  agreements: Agreements,
});

export const ShippingApplyPayload = z.object({
  inspectionType: z.literal('SHIPPING'),
  shipping: ShippingInfo,
  person: PersonInfo,
  agreements: Agreements,
});

export type InspectionTypeT = z.infer<typeof InspectionType>;
export type ReservationInfoT = z.infer<typeof ReservationInfo>;
export type ShippingInfoT = z.infer<typeof ShippingInfo>;
export type PersonInfoT = z.infer<typeof PersonInfo>;
export type AgreementsT = z.infer<typeof Agreements>;
export type ReservationApplyPayloadT = z.infer<typeof ReservationApplyPayload>;
export type ShippingApplyPayloadT = z.infer<typeof ShippingApplyPayload>;