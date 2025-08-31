import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApplyStore } from '../../store/useApplyStore';
import { Agreements, type AgreementsT } from '../../schemas';

export default function AgreementsForm({ onValid, onPrev }: { onValid: () => void; onPrev: () => void }) {
  const { agreements, setAgreements } = useApplyStore();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AgreementsT>({
    resolver: zodResolver(Agreements),
    defaultValues: agreements,
    mode: 'onChange'
  });

  // Remove the useEffect that was causing infinite loop

  const onSubmit = (data: AgreementsT) => {
    setAgreements(data);
    onValid();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display:'grid', gap: 8 }}>
      <h3>약관 동의</h3>
      
      <div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" {...register('terms')} />
          이용약관 동의(필수)
        </label>
        {errors.terms && (
          <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
            {errors.terms.message}
          </div>
        )}
      </div>
      
      <div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" {...register('privacy')} />
          개인정보 처리방침(필수)
        </label>
        {errors.privacy && (
          <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
            {errors.privacy.message}
          </div>
        )}
      </div>
      
      <div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" {...register('marketing')} />
          마케팅 수신 동의(선택)
        </label>
        {errors.marketing && (
          <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
            {errors.marketing.message}
          </div>
        )}
      </div>

      <div style={{ display:'flex', gap: 8 }}>
        <button type="button" onClick={onPrev}>이전</button>
        <button type="submit">다음</button>
      </div>
    </form>
  );
}