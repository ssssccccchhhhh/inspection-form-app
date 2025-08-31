import { useApplyStore } from '../../store/useApplyStore';
import { ShippingInfo } from '../../schemas';

export default function StepShipping({ onValid, onPrev }: { onValid: () => void; onPrev?: () => void }) {
  const { shipping, setShipping } = useApplyStore();

  const validate = () => {
    const parsed = ShippingInfo.safeParse(shipping);
    if (!parsed.success) {
      alert(parsed.error.issues[0]?.message ?? '배송 정보를 확인해 주세요.');
      return;
    }
    onValid();
  };

  return (
    <div style={{ display:'grid', gap: 8 }}>
      <h3>배송 정보</h3>
      
      <input
        placeholder="수령인"
        value={shipping.receiver}
        onChange={e => setShipping({ receiver: e.target.value })}
      />
      
      <input
        placeholder="연락처"
        value={shipping.phone}
        onChange={e => setShipping({ phone: e.target.value })}
      />
      
      <input
        placeholder="주소"
        value={shipping.address}
        onChange={e => setShipping({ address: e.target.value })}
      />

      <div style={{ display:'flex', gap: 8 }}>
        {onPrev && <button onClick={onPrev}>이전</button>}
        <button onClick={validate}>다음</button>
      </div>
    </div>
  );
}