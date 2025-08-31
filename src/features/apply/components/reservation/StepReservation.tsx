import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApplyStore } from '../../store/useApplyStore';
import { useCenters, useTimeSlots, useHolidays } from '../../hooks';
import { ReservationInfo, type ReservationInfoT } from '../../schemas';

export default function StepReservation({ onValid, onPrev }: { onValid: () => void; onPrev?: () => void }) {
  const { reservation, setReservation } = useApplyStore();
  const { data: centers } = useCenters();
  const { data: holidays } = useHolidays();
  const [holidayError, setHolidayError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<ReservationInfoT>({
    resolver: zodResolver(ReservationInfo),
    defaultValues: reservation,
    mode: 'onChange'
  });

  // Watch form values to get current centerId and date
  const watchedCenterId = watch('centerId');
  const watchedDate = watch('date');

  // Use watched values for slots query
  const { data: slots } = useTimeSlots(watchedCenterId, watchedDate);

  const onSubmit = (data: ReservationInfoT) => {
    setReservation(data);
    onValid();
  };

  // Get today's date and minimum selectable date (today + 1 day)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Check if a date is a holiday
  const isHoliday = useCallback((dateString: string) => {
    return holidays?.some(holiday => holiday.date === dateString);
  }, [holidays]);

  // Get holiday name for a date
  const getHolidayName = useCallback((dateString: string) => {
    return holidays?.find(holiday => holiday.date === dateString)?.name;
  }, [holidays]);

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
          min={minDate}
          {...register('date', {
            onChange: (e) => {
              // Check if selected date is a holiday
              if (isHoliday(e.target.value)) {
                const holidayName = getHolidayName(e.target.value);
                setHolidayError(`${e.target.value}(${holidayName})로 예약이 불가능합니다. 다른 날짜를 선택해 주세요.`);
                setValue('date', ''); // Clear the form value
                return;
              }
              setHolidayError(null); // Clear holiday error
            }
          })}
        />
        {errors.date && (
          <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
            {errors.date.message}
          </div>
        )}
        {holidayError && (
          <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
            📅 {holidayError}
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