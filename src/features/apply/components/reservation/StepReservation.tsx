import { useApplyStore } from '../../store/useApplyStore';
import { useCenters, useSlots } from '../../hooks';
import { ReservationInfo } from '../../schemas';

export default function StepReservation({ onValid, onPrev }: { onValid: () => void; onPrev?: () => void }) {
  const { reservation, setReservation } = useApplyStore();
  const { data: centers } = useCenters();
  const { data: slots } = useSlots(reservation.centerId, reservation.date);

  const validate = () => {
    const parsed = ReservationInfo.safeParse(reservation);
    if (!parsed.success) {
      alert(parsed.error.issues[0]?.message ?? '예약 정보를 확인해 주세요.');
      return;
    }
    onValid();
  };

  return (
    <div style={{ display:'grid', gap: 8 }}>
      <h3>예약 정보</h3>
      
      <select
        value={reservation.centerId}
        onChange={e => setReservation({ centerId: e.target.value })}
      >
        <option value="">센터 선택</option>
        {centers?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>

      <input
        type="date"
        value={reservation.date}
        onChange={e => setReservation({ date: e.target.value })}
      />

      <select
        value={reservation.time}
        onChange={e => setReservation({ time: e.target.value })}
      >
        <option value="">시간 선택</option>
        {slots?.map(s => (
          <option key={s.time} value={s.time}>
            {s.time} (잔여 {s.available}/{s.capacity})
          </option>
        ))}
      </select>

      <div style={{ display:'flex', gap: 8 }}>
        {onPrev && <button onClick={onPrev}>이전</button>}
        <button onClick={validate}>다음</button>
      </div>
    </div>
  );
}