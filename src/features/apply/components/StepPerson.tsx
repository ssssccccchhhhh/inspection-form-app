import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApplyStore } from '../store/useApplyStore';
import { PersonInfo, type PersonInfoT } from '../schemas';

export default function StepPerson({ onValid, onPrev }: { onValid: () => void; onPrev: () => void }) {
  const { person, setPerson } = useApplyStore();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PersonInfoT>({
    resolver: zodResolver(PersonInfo),
    defaultValues: person,
    mode: 'onChange'
  });

  // Remove the useEffect that was causing infinite loop

  const onSubmit = (data: PersonInfoT) => {
    setPerson(data);
    onValid();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display:'grid', gap: 8 }}>
      <h3>검사자 정보</h3>
      
      <div>
        <input 
          placeholder="이름" 
          {...register('name')} 
        />
        {errors.name && (
          <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
            {errors.name.message}
          </div>
        )}
      </div>
      
      <div>
        <input 
          placeholder="생년월일(YYYYMMDD)" 
          {...register('birth')}
        />
        {errors.birth && (
          <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
            {errors.birth.message}
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

      <div style={{ display:'flex', gap: 8 }}>
        <button type="button" onClick={onPrev}>이전</button>
        <button type="submit">다음</button>
      </div>
    </form>
  );
}