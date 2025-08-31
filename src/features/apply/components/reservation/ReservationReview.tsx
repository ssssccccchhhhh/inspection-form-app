import { useApplyStore } from '../../store/useApplyStore';
import { ReservationApplyPayload } from '../../schemas';
import { useCreateApplication, useCenters } from '../../hooks';

export default function ReservationReview({ onPrev, onDone }: { onPrev: () => void; onDone: (id: string) => void }) {
  const { reservation, person, agreements, setApplicationResult } = useApplyStore();
  const { data: centers } = useCenters();
  const { mutate, isPending } = useCreateApplication();

  const submit = () => {
    const payload = {
      inspectionType: 'RESERVATION' as const,
      reservation,
      person,
      agreements,
    };
    
    const parsed = ReservationApplyPayload.safeParse(payload);
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
      <h3>예약 신청 확인</h3>
      <div style={{ background:'#f6f6f6', padding: 12, borderRadius: 6 }}>
        <h4>예약 정보</h4>
        <p>센터: {centers?.find(c => c.id === reservation.centerId)?.name || reservation.centerId}</p>
        <p>날짜: {reservation.date}</p>
        <p>시간: {reservation.time}</p>
        
        <h4>검사 대상자 정보</h4>
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
          {isPending ? '신청 중...' : '예약 신청하기'}
        </button>
      </div>
    </div>
  );
}