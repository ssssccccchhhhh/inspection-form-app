interface SuccessPageProps {
  applicationId: string;
  payload: any;
  onStartNew: () => void;
}

export default function SuccessPage({ applicationId, payload, onStartNew }: SuccessPageProps) {
  return (
    <div style={{ 
      maxWidth: 600, 
      margin: '24px auto', 
      padding: 24, 
      textAlign: 'center',
      border: '1px solid #ddd',
      borderRadius: 8,
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ color: '#22c55e', marginBottom: 8 }}>✅ 신청이 완료되었습니다!</h2>
        <p style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>
          접수번호: <span style={{ color: '#3b82f6' }}>{applicationId}</span>
        </p>
      </div>

      <div style={{ 
        textAlign: 'left', 
        backgroundColor: 'white', 
        padding: 16, 
        borderRadius: 6, 
        border: '1px solid #e5e5e5',
        marginBottom: 24
      }}>
        <h3 style={{ marginTop: 0, marginBottom: 12, color: '#374151' }}>신청 내용</h3>
        <pre style={{ 
          fontSize: 14, 
          lineHeight: 1.6, 
          overflow: 'auto', 
          backgroundColor: '#f8fafc',
          padding: 12,
          borderRadius: 4,
          border: '1px solid #e2e8f0'
        }}>
          {JSON.stringify(payload, null, 2)}
        </pre>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button 
          onClick={onStartNew}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontSize: 16,
            cursor: 'pointer'
          }}
        >
          새 신청하기
        </button>
        
        <button 
          onClick={() => window.print()}
          style={{
            padding: '12px 24px',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontSize: 16,
            cursor: 'pointer'
          }}
        >
          출력하기
        </button>
      </div>

      <div style={{ 
        marginTop: 24, 
        padding: 16, 
        backgroundColor: '#eff6ff',
        borderRadius: 6,
        fontSize: 14,
        color: '#1e40af'
      }}>
        <p style={{ margin: 0 }}>
          📧 신청 확인 메일이 발송되었습니다.<br />
          📱 검사 일정 변경은 고객센터(1588-0000)로 문의해 주세요.
        </p>
      </div>
    </div>
  );
}