import { Shield } from 'lucide-react';
import { theme } from '@/styles/theme';
import type { DashboardProof } from '@/shared/types/dashboard.types';

const CARD_GRADIENTS = [
  theme.colors.gradients.primary,
  theme.colors.gradients.secondary,
  theme.colors.gradients.victory,
  theme.colors.gradients.danger,
];

interface ProofGalleryProps {
  proofs: DashboardProof[];
}

export const ProofGallery = ({ proofs }: ProofGalleryProps) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '8px',
    }}
  >
    {proofs.slice(0, 4).map((proof, index) => (
      <div
        key={proof.id}
        className="hover:opacity-90 transition-opacity"
        style={{
          position: 'relative',
          borderRadius: theme.borderRadius.lg,
          overflow: 'hidden',
          height: '100px', // Fixed height — NOT aspect-ratio: 1
          background: CARD_GRADIENTS[index % CARD_GRADIENTS.length],
          cursor: 'pointer',
          border: `1px solid ${theme.colors.border.primary}`,
        }}
      >
        {/* Centered watermark icon */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.18,
          }}
        >
          <Shield size={28} color="#ffffff" />
        </div>

        {/* Bottom text overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '6px 10px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '11px',
              fontWeight: theme.typography.fontWeight.bold,
              color: '#ffffff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {proof.habitName}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: '10px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.3,
            }}
          >
            {proof.warriorName} · {proof.submittedAt}
          </p>
        </div>
      </div>
    ))}
  </div>
);
