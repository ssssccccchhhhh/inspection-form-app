import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApplyStore } from '../../store/useApplyStore';
import { useCenters, useSlots } from '../../hooks';
import { ReservationInfo, type ReservationInfoT } from '../../schemas';

export default function StepReservation({ onValid, onPrev }: { onValid: () => void; onPrev?: () => void }) {
  const { reservation, setReservation } = useApplyStore();
  const { data: centers } = useCenters();
  const { data: slots } = useSlots(reservation.centerId, reservation.date);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ReservationInfoT>({
    resolver: zodResolver(ReservationInfo),
    defaultValues: reservation,
    mode: 'onChange'
  });

  // Remove the useEffect that was causing infinite loop

  const onSubmit = (data: ReservationInfoT) => {
    setReservation(data);
    onValid();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display:'grid', gap: 8 }}>
      <h3>예약 정보</h3>
      
      <div>
        <select {...register('centerId')}>
          <option value="">센터 선택</option>
          {centers?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        {errors.centerId && (
          <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
            {errors.centerId.message}
          </div>
        )}
      </div>

      <div>
        <input
          type="date"
          {...register('date')}
        />
        {errors.date && (
          <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
            {errors.date.message}
          </div>
        )}
      </div>

      <div>
        <select {...register('time')}>
          <option value="">시간 선택</option>
          {slots?.map(s => (
            <option key={s.time} value={s.time}>
              {s.time} (잔여 {s.available}/{s.capacity})
            </option>
          ))}
        </select>
        {errors.time && (
          <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
            {errors.time.message}
          </div>
        )}
      </div>

      <div style={{ display:'flex', gap: 8 }}>
        {onPrev && <button type="button" onClick={onPrev}>이전</button>}
        <button type="submit">다음</button>
      </div>
    </form>
  );
}