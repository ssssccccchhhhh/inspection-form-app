import { useApplyStore } from '../store/useApplyStore';
import { PersonInfo } from '../schemas';

export default function StepPerson({ onValid, onPrev }: { onValid: () => void; onPrev: () => void }) {
  const { person, setPerson } = useApplyStore();

  const validate = () => {
    const parsed = PersonInfo.safeParse(person);
    if (!parsed.success) {
      alert(parsed.error.issues[0]?.message ?? '검사자 정보를 확인해 주세요.');
      return;
    }
    onValid();
  };

  return (
    <div style={{ display:'grid', gap: 8 }}>
      <h3>2) 검사자 정보</h3>
      <input placeholder="이름" value={person.name} onChange={e => setPerson({ name: e.target.value })} />
      <input placeholder="생년월일(YYYYMMDD)" value={person.birth} onChange={e => setPerson({ birth: e.target.value })} />
      <input placeholder="연락처" value={person.phone} onChange={e => setPerson({ phone: e.target.value })} />

      <div style={{ display:'flex', gap: 8 }}>
        <button onClick={onPrev}>이전</button>
        <button onClick={validate}>다음</button>
      </div>
    </div>
  );
}