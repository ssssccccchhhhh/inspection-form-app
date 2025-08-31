import { useApplyStore } from '../store/useApplyStore';
import ReservationWizard from './reservation/ReservationWizard';
import ShippingWizard from './shipping/ShippingWizard';

export default function ApplyWizard() {
  const { inspectionType, setInspectionType, reset } = useApplyStore();

  if (!inspectionType) {
    return (
      <div style={{ maxWidth: 560, margin: '24px auto', display:'grid', gap: 12 }}>
        <h3>검사 방법 선택</h3>
        <div style={{ display:'grid', gap: 8 }}>
          <button 
            style={{ padding: 16, fontSize: 16 }}
            onClick={() => setInspectionType('RESERVATION')}
          >
            🏢 센터 예약 방문
          </button>
          <button 
            style={{ padding: 16, fontSize: 16 }}
            onClick={() => setInspectionType('SHIPPING')}
          >
            📦 키트 배송 신청
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <button 
          onClick={reset}
          style={{ padding: '4px 8px', fontSize: 12, background: 'transparent', border: '1px solid #ccc' }}
        >
          ← 검사 방법 다시 선택
        </button>
      </div>
      
      {inspectionType === 'RESERVATION' ? <ReservationWizard /> : <ShippingWizard />}
    </div>
  );
}