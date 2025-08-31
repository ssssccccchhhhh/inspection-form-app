import { useApplyStore } from '../../store/useApplyStore';
import { ShippingApplyPayload } from '../../schemas';
import { useCreateApplication } from '../../hooks';

export default function StepShippingReview({ onPrev, onDone }: { onPrev: () => void; onDone: (id: string) => void }) {
  const { shipping, person, agreements, setApplicationResult } = useApplyStore();
  const { mutate, isPending } = useCreateApplication();

  const submit = () => {
    const payload = {
      inspectionType: 'SHIPPING' as const,
      shipping,
      person,
      agreements,
    };
    
    const parsed = ShippingApplyPayload.safeParse(payload);
    if (!parsed.success) {
      alert(parsed.error.issues[0]?.message ?? '입력값을 확인해 주세요.');
      return;
    }
    
    mutate(parsed.data, {
      onSuccess: (res) => {
        setApplicationResult({
          id: res.id,
          payload: parsed.data
        });
        onDone(res.id);
      },
      onError: (e: any) => {
        alert(e?.message ?? '신청 실패');
      },
    });
  };

  return (
    <div style={{ display:'grid', gap: 8 }}>
      <h3>배송 신청 확인</h3>
      <div style={{ background:'#f6f6f6', padding: 12, borderRadius: 6 }}>
        <h4>배송 정보</h4>
        <p>수령인: {shipping.receiver}</p>
        <p>연락처: {shipping.phone}</p>
        <p>주소: {shipping.address}</p>
        
        <h4>검사자 정보</h4>
        <p>이름: {person.name}</p>
        <p>생년월일: {person.birth}</p>
        <p>연락처: {person.phone}</p>
        
        <h4>약관 동의</h4>
        <p>이용약관: {agreements.terms ? '동의' : '미동의'}</p>
        <p>개인정보: {agreements.privacy ? '동의' : '미동의'}</p>
        <p>마케팅: {agreements.marketing ? '동의' : '미동의'}</p>
      </div>

      <div style={{ display:'flex', gap: 8 }}>
        <button onClick={onPrev}>이전</button>
        <button onClick={submit} disabled={isPending}>
          {isPending ? '신청 중...' : '배송 신청하기'}
        </button>
      </div>
    </div>
  );
}