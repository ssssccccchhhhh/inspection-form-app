import { useApplyStore } from '../../store/useApplyStore';
import StepShipping from './StepShipping';
import StepPerson from '../StepPerson';
import StepAgreements from '../StepAgreements';
import StepShippingReview from './StepShippingReview';

export default function ShippingWizard() {
  const { step, next, prev } = useApplyStore();

  return (
    <div style={{ maxWidth: 560, margin: '24px auto', display:'grid', gap: 12 }}>
      <Progress step={step} />
      {step === 0 && <StepShipping onValid={next} />}
      {step === 1 && <StepPerson onValid={next} onPrev={prev} />}
      {step === 2 && <StepAgreements onValid={next} onPrev={prev} />}
      {step === 3 && <StepShippingReview onPrev={prev} onDone={(id) => alert(`배송 신청 완료! 접수번호: ${id}`)} />}
    </div>
  );
}

function Progress({ step }: { step: number }) {
  const labels = ['배송정보', '검사자정보', '약관동의', '확인'];
  return (
    <div style={{ display:'flex', gap: 8 }}>
      {labels.map((l, i) => (
        <div key={l} style={{
          padding: '6px 10px',
          borderRadius: 6,
          border: '1px solid #ddd',
          background: i <= step ? '#e0f2ff' : 'white'
        }}>
          {i+1}. {l}
        </div>
      ))}
    </div>
  );
}