import { useApplyStore } from '../../store/useApplyStore';
import StepReservation from './StepReservation';
import StepExaminee from '../StepExaminee';
import StepAgreements from '../StepAgreements';
import StepReservationReview from './StepReservationReview';

export default function ReservationWizard() {
  const { step, next, prev } = useApplyStore();

  return (
    <div style={{ maxWidth: 560, margin: '24px auto', display:'grid', gap: 12 }}>
      <Progress step={step} />
      {step === 0 && <StepReservation onValid={next} />}
      {step === 1 && <StepExaminee onValid={next} onPrev={prev} />}
      {step === 2 && <StepAgreements onValid={next} onPrev={prev} />}
      {step === 3 && <StepReservationReview onPrev={prev} onDone={() => {}} />}
    </div>
  );
}

function Progress({ step }: { step: number }) {
  const labels = ['예약정보', '검사대상자정보', '약관동의', '확인'];
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