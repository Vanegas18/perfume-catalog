import { cn } from '@/lib/utils'
import type { Fragrance, SizeMl } from '@/lib/products'

/*
  "Ficha de laboratorio": la imagen de producto de Gota.
  Probeta dibujada con la misma escala graduada; el líquido sube según el tamaño elegido.
  Texto real en SVG (nítido a cualquier tamaño, pesa ~2 KB, sin fotos genéricas).
*/

interface FragranceLabelProps {
  fragrance: Fragrance
  ml?: SizeMl
  className?: string
}

const LEVEL: Record<SizeMl, number> = { 5: 0.12, 30: 0.42, 100: 0.9 }

export function FragranceLabel({ fragrance, ml = 30, className }: FragranceLabelProps) {
  // Probeta: cuerpo de y=120 a y=430 (310px de alto)
  const top = 120
  const height = 310
  const level = LEVEL[ml]
  const ticks = Array.from({ length: 21 }, (_, i) => i)

  return (
    <svg
      viewBox="0 0 400 500"
      role="img"
      aria-label={`Ficha de Nº ${fragrance.code} ${fragrance.name}, ${ml} ml`}
      className={cn('block h-auto w-full bg-papel', className)}
    >
      {/* encabezado */}
      <text x="28" y="44" className="num" fontSize="13" fill="var(--grafito)" letterSpacing="1.5">
        GOTA · FÓRMULA
      </text>
      <text x="372" y="44" className="num" fontSize="13" fill="var(--grafito)" textAnchor="end">
        {fragrance.family.toUpperCase()}
      </text>
      <line x1="28" y1="60" x2="372" y2="60" stroke="var(--tinta)" strokeWidth="1" />

      {/* número grande */}
      <text x="24" y="190" fontSize="132" fontWeight="700" fill="var(--tinta)" letterSpacing="-8">
        {fragrance.code}
      </text>
      <text x="30" y="226" fontSize="26" fontWeight="600" fill="var(--tinta)" letterSpacing="-0.5">
        {fragrance.name}
      </text>

      {/* notas */}
      {(['Salida', 'Corazón', 'Fondo'] as const).map((label, i) => (
        <g key={label} transform={`translate(30 ${300 + i * 42})`}>
          <text className="num" fontSize="11" fill="var(--grafito)" letterSpacing="1">
            {label.toUpperCase()}
          </text>
          <text y="19" fontSize="16" fill="var(--tinta)">
            {fragrance.notes[i]}
          </text>
        </g>
      ))}

      {/* probeta */}
      <g transform="translate(262 0)">
        <rect x="18" y={top - 26} width="44" height="18" fill="var(--tinta)" />
        <rect x="30" y={top - 8} width="20" height="8" fill="var(--tinta)" />
        <clipPath id={`vial-${fragrance.id}`}>
          <rect x="0" y={top} width="80" height={height} rx="6" />
        </clipPath>
        <g clipPath={`url(#vial-${fragrance.id})`}>
          <rect
            x="0"
            y={top}
            width="80"
            height={height}
            fill="var(--rojo)"
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'bottom',
              transform: `scaleY(${level})`,
              transition: 'transform 600ms cubic-bezier(0.22,1,0.36,1)',
            }}
          />
        </g>
        <rect x="0.5" y={top} width="79" height={height} rx="6" fill="none" stroke="var(--tinta)" strokeWidth="1.5" />
        {ticks.map((t) => {
          const y = top + height - (t / 20) * height
          const major = t % 10 === 0
          return <line key={t} x1="80" x2={major ? 100 : t % 2 === 0 ? 94 : 88} y1={y} y2={y} stroke="var(--tinta)" strokeWidth="1" />
        })}
        <text x="104" y={top + 4} className="num" fontSize="11" fill="var(--grafito)">
          100
        </text>
        <text x="104" y={top + height / 2 + 4} className="num" fontSize="11" fill="var(--grafito)">
          50
        </text>
      </g>

      <line x1="28" y1="456" x2="372" y2="456" stroke="var(--tinta)" strokeWidth="1" />
      <text x="28" y="480" className="num" fontSize="12" fill="var(--grafito)">
        EL POBLADO · MEDELLÍN
      </text>
      <text x="372" y="480" className="num" fontSize="12" fill="var(--tinta)" textAnchor="end">
        {ml} ML
      </text>
    </svg>
  )
}
