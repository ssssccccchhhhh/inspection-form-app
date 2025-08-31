import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApplyStore } from '../../store/useApplyStore';
import { ShippingInfo, type ShippingInfoT } from '../../schemas';

export default function ShippingForm({ onValid, onPrev }: { onValid: () => void; onPrev?: () => void }) {
  const { shipping, setShipping } = useApplyStore();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ShippingInfoT>({
    resolver: zodResolver(ShippingInfo),
    defaultValues: shipping,
    mode: 'onChange'
  });

  // Remove the useEffect that was causing infinite loop

  const onSubmit = (data: ShippingInfoT) => {
    setShipping(data);
    onValid();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display:'grid', gap: 8 }}>
      <h3>배송 정보</h3>
      
      <div>
        <input
          placeholder="수령인"
          {...register('receiver')}
        />
        {errors.receiver && (
          <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
            {errors.receiver.message}
          </div>
        )}
      </div>
      
      <div>
        <input
          placeholder="연락처"
          {...register('phone')}
        />
        {errors.phone && (
          <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
            {errors.phone.message}
          </div>
        )}
      </div>
      
      <div>
        <input
          placeholder="주소"
          {...register('address')}
        />
        {errors.address && (
          <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
            {errors.address.message}
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