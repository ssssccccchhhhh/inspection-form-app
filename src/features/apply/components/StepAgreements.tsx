import { useApplyStore } from '../store/useApplyStore';
import { Agreements } from '../schemas';

export default function StepAgreements({ onValid, onPrev }: { onValid: () => void; onPrev: () => void }) {
  const { agreements, setAgreements } = useApplyStore();

  const validate = () => {
    const parsed = Agreements.safeParse(agreements);
    if (!parsed.success) {
      alert(parsed.error.issues[0]?.message ?? '약관 동의를 확인해 주세요.');
      return;
    }
    onValid();
  };

  return (
    <div style={{ display:'grid', gap: 8 }}>
      <h3>3) 약관 동의</h3>
      <label>
        <input type="checkbox" checked={agreements.terms} onChange={e => setAgreements({ terms: e.target.checked })} />
        이용약관 동의(필수)
      </label>
      <label>
        <input type="checkbox" checked={agreements.privacy} onChange={e => setAgreements({ privacy: e.target.checked })} />
        개인정보 처리방침(필수)
      </label>
      <label>
        <input type="checkbox" checked={agreements.marketing ?? false} onChange={e => setAgreements({ marketing: e.target.checked })} />
        마케팅 수신 동의(선택)
      </label>

      <div style={{ display:'flex', gap: 8 }}>
        <button onClick={onPrev}>이전</button>
        <button onClick={validate}>다음</button>
      </div>
    </div>
  );
}