import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MessageSquare, ChevronRight, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * @typedef {'US' | 'JP' | 'IN' | 'EU' | 'CN' | 'Global'} FlagCode
 *
 * @typedef {Object} ProductModel
 * @property {string} name
 * @property {string} storage
 * @property {string[]} colors
 * @property {'Available' | 'Active' | 'Non Active'} status
 * @property {string} region
 * @property {Record<string, string>} [variantImages]
 *
 * @typedef {Object} Product
 * @property {string} brand
 * @property {string} name
 * @property {ProductModel[]} models
 * @property {string} image
 * @property {string} glow
 * @property {string} [status]
 * @property {string} [region]
 *
 * @typedef {Object} StatusStyle
 * @property {string} bg
 * @property {string} text
 * @property {string} border
 * @property {string} dot
 *
 * @typedef {Object} ProductCardProps
 * @property {Product} product
 * @property {Record<string, string>} colorMap
 * @property {Record<string, StatusStyle>} statusConfig
 * @property {Record<string, string>} regionFlags
 * @property {Object} [activeFilters]
 * @property {string[]} activeFilters.status
 * @property {string[]} activeFilters.region
 * @property {string[]} activeFilters.storage
 */

// ─── FlagIcon ──────────────────────────────────────────────────────────────

/**
 * @param {{ code: FlagCode; className?: string }} props
 */
function FlagIcon({ code, className = '' }) {
  /** @type {Record<FlagCode, React.ReactElement>} */
  const flags = {
    US: (
      <svg viewBox="0 0 640 480" className={className}>
        <path fill="#bd3d44" d="M0 0h640v480H0" />
        <path stroke="#fff" strokeWidth="37" d="M0 55.5h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640" />
        <path fill="#192f5d" d="M0 0h364.8v258.5H0" />
      </svg>
    ),
    JP: (
      <svg viewBox="0 0 640 480" className={className}>
        <path fill="#fff" d="M0 0h640v480H0" />
        <circle cx="320" cy="240" r="120" fill="#bc002d" />
      </svg>
    ),
    IN: (
      <svg viewBox="0 0 640 480" className={className}>
        <path fill="#f93" d="M0 0h640v160H0z" />
        <path fill="#fff" d="M0 160h640v160H0z" />
        <path fill="#128807" d="M0 320h640v160H0z" />
        <circle cx="320" cy="240" r="60" fill="#008" />
      </svg>
    ),
    EU: (
      <svg viewBox="0 0 640 480" className={className}>
        <path fill="#039" d="M0 0h640v480H0" />
        <g fill="#fc0">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <circle
                key={i}
                cx={320 + 80 * Math.cos(angle)}
                cy={240 + 80 * Math.sin(angle)}
                r="10"
              />
            );
          })}
        </g>
      </svg>
    ),
    CN: (
      <svg viewBox="0 0 640 480" className={className}>
        <path fill="#de2910" d="M0 0h640v480H0" />
        <path fill="#ffde00" d="M120 80l-15-46-15 46 39-28h-48" />
      </svg>
    ),
    Global: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  };

  return flags[code] ?? <span className={className}>{code}</span>;
}

// ─── ProductImage ──────────────────────────────────────────────────────────

// @ts-ignore — Vite's import.meta.glob is not typed in plain JSX; safe to ignore
const phoneImages = import.meta.glob('/src/assets/Phones/*.{png,jpg,jpeg,webp,avif,gif}', { eager: true });

/**
 * @param {{ src: string; alt: string; glowColor: string; isHovered: boolean; fallbackSrc?: string }} props
 */
function ProductImage({ src, alt, glowColor, isHovered, fallbackSrc }) {
  const [displaySrc, setDisplaySrc] = useState(src);
  const [fading, setFading] = useState(false);
  const [imageError, setImageError] = useState(false);
  /** @type {React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>} */
  const timerRef = useRef(undefined);

  useEffect(() => {
    if (src === displaySrc) return;
    clearTimeout(timerRef.current);
    setFading(true);
    setImageError(false);
    timerRef.current = setTimeout(() => {
      setDisplaySrc(src);
      setFading(false);
    }, 200);
    return () => clearTimeout(timerRef.current);
  }, [src, displaySrc]);

  const handleImageError = () => {
    // If local image fails, try fallback
    if (!imageError && fallbackSrc && displaySrc !== fallbackSrc) {
      setImageError(true);
      setDisplaySrc(fallbackSrc);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="absolute inset-0 pointer-events-none rounded-t-[22px]"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 30%, ${glowColor}25, transparent 68%)`,
          opacity: isHovered ? 1 : 0.55,
          transition: 'opacity 0.4s ease',
        }}
      />

      <img
        src={displaySrc}
        alt={alt}
        draggable={false}
        onError={handleImageError}
        className="select-none"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          paddingBottom: 16,
          opacity: fading ? 0 : 1,
          transform: fading
            ? 'scale(0.91) translateY(8px)'
            : isHovered
            ? 'scale(1.08) translateY(-5px)'
            : 'scale(1) translateY(0)',
          filter: isHovered
            ? 'drop-shadow(0 22px 38px rgba(0,0,0,0.22)) drop-shadow(0 4px 10px rgba(0,0,0,0.1))'
            : 'drop-shadow(0 10px 24px rgba(0,0,0,0.14)) drop-shadow(0 2px 5px rgba(0,0,0,0.07))',
          transition: 'opacity 0.2s ease, transform 0.38s cubic-bezier(0.32,0,0.2,1), filter 0.38s ease',
        }}
      />

      <div
        className="absolute bottom-2 left-1/2 rounded-full pointer-events-none"
        style={{
          width: 96,
          height: 12,
          transform: `translateX(-50%) scaleX(${isHovered ? 1.18 : 1})`,
          opacity: isHovered ? 0.75 : 0.45,
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 70%)',
          filter: 'blur(7px)',
          transition: 'all 0.38s ease',
        }}
      />
    </div>
  );
}

// ─── StoragePill ───────────────────────────────────────────────────────────

/**
 * @param {{ label: string; active: boolean; onClick: () => void }} props
 */
function StoragePill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        'relative px-2.5 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide',
        'border transition-all duration-200 select-none outline-none',
        'focus-visible:ring-2 focus-visible:ring-amber-400',
        active
          ? 'bg-slate-900 dark:bg-slate-50 border-slate-900 dark:border-slate-100 text-white dark:text-slate-900 shadow-md'
          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-700 dark:hover:text-slate-200',
      ].join(' ')}
      style={{ transform: active ? 'scale(1.04)' : 'scale(1)' }}
    >
      {label}
      {active && (
        <span
          className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 border-2 border-white dark:border-slate-900"
          style={{ animation: 'pcPopIn 0.2s cubic-bezier(0.34,1.56,0.64,1) both' }}
        />
      )}
    </button>
  );
}

// ─── ColorDot ──────────────────────────────────────────────────────────────

/**
 * @param {{ color: string; hex: string; active: boolean; onClick: () => void }} props
 */
function ColorDot({ color, hex, active, onClick }) {
  const isLightColor = (() => {
    const c = parseInt(hex.replace('#', ''), 16);
    const r = (c >> 16) & 255;
    const g = (c >> 8) & 255;
    const b = c & 255;
    return (r * 299 + g * 587 + b * 114) / 1000 > 148;
  })();

  return (
    <button
      onClick={onClick}
      title={color}
      className="flex flex-col items-center gap-1 group outline-none"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <div className="relative" style={{ padding: active ? 3 : 0 }}>
        {active && (
          <span
            className="absolute -inset-[3px] rounded-full border-2 border-slate-800 dark:border-slate-200"
            style={{ animation: 'pcRingIn 0.22s cubic-bezier(0.34,1.56,0.64,1) both' }}
          />
        )}

        <div
          className="rounded-full border transition-all duration-200"
          style={{
            width: 28,
            height: 28,
            backgroundColor: hex,
            borderColor:
              hex === '#f5f5f5' || hex === '#ffffff' || hex === '#f0f0ee' || hex === '#c0c0c0'
                ? '#d1d5db'
                : 'transparent',
            borderWidth: 1.5,
            transform: active ? 'scale(1.06)' : 'scale(1)',
            boxShadow: active
              ? `0 3px 12px ${hex}60, inset 0 0 0 1.5px rgba(255,255,255,0.18)`
              : '0 1px 4px rgba(0,0,0,0.12)',
            transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease',
          }}
        />

        {active && (
          <span
            className="absolute inset-0 flex items-center justify-center"
            style={{ animation: 'pcFadeScaleIn 0.18s cubic-bezier(0.34,1.56,0.64,1) 0.05s both' }}
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <polyline
                points="2,6 5,9 10,3"
                stroke={isLightColor ? '#374151' : '#ffffff'}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </div>

      <span
        className="text-[9px] font-medium leading-tight text-center transition-colors duration-150 truncate"
        style={{
          maxWidth: 34,
          color: active ? '#374151' : '#9ca3af',
        }}
      >
        {color}
      </span>
    </button>
  );
}

// ─── SelectionBadge ────────────────────────────────────────────────────────

/**
 * @param {{ storage: string; color: string; colorHex: string | null }} props
 */
function SelectionBadge({ storage, color, colorHex }) {
  if (!storage) return null;
  return (
    <div
      className="flex items-center gap-1.5 flex-wrap"
      style={{ animation: 'pcFadeUp 0.22s ease both' }}
    >
      <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
        Selected:
      </span>
      <span className="inline-flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-2 py-0.5 rounded-full">
        {color && colorHex && (
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              backgroundColor: colorHex,
              boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15)',
            }}
          />
        )}
        <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-200 leading-none">
          {storage}
          {color ? ` · ${color}` : ''}
        </span>
      </span>
    </div>
  );
}

// ─── ProductCard (main export) ─────────────────────────────────────────────

/** @param {ProductCardProps} props */
export default function ProductCard({ product, colorMap, statusConfig, regionFlags, activeFilters }) {
  // Filter models based on activeFilters
  const filteredModels = product.models.filter(model => {
    if ((activeFilters?.status?.length ?? 0) > 0 && !activeFilters?.status?.includes(model.status || '')) return false;
    if ((activeFilters?.region?.length ?? 0) > 0 && !activeFilters?.region?.includes(model.region || '')) return false;
    if ((activeFilters?.storage?.length ?? 0) > 0 && !activeFilters?.storage?.includes(model.storage)) return false;
    return true;
  });

  // Show ALL storage options from the product, not just filtered ones
  const allStorage = [...new Set(product.models.map((m) => m.storage))];

  const firstStorage = allStorage[0] ?? '';
  const firstModel   = product.models.find((m) => m.storage === firstStorage) ?? product.models[0];

  const [selectedStorage, setSelectedStorage] = useState(firstStorage);
  const [selectedColor,   setSelectedColor]   = useState(firstModel?.colors[0] ?? '');
  const [isHovered,       setIsHovered]       = useState(false);
  const [inquireOpen,     setInquireOpen]     = useState(false);
  const inquireRef                            = useRef(/** @type {HTMLDivElement|null} */ (null));
  const navigate                              = useNavigate();

  const activeModel     = product.models.find((m) => m.storage === selectedStorage) ?? product.models[0];
  const availableColors = activeModel?.colors ?? [];

  // Close popover on outside click
  useEffect(() => {
    if (!inquireOpen) return;
    const handler = (/** @type {MouseEvent} */ e) => {
      if (inquireRef.current && !inquireRef.current.contains(/** @type {Node} */ (e.target))) {
        setInquireOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [inquireOpen]);

  const whatsappNumber = '971523222928';

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello, I'm interested in:\n\n` +
      `📱 *${product.name}*\n` +
      `💾 Storage: ${selectedStorage}\n` +
      `🎨 Color: ${selectedColor}\n\n` +
      `Could you please provide more details and pricing?`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
    setInquireOpen(false);
  };

  const handleEmail = () => {
    navigate('/contact#inquiry-form', {
      state: {
        product: product.name,
        model:   activeModel?.name ?? '',
        storage: selectedStorage,
        color:   selectedColor,
      },
    });
    setInquireOpen(false);
  };

  // Image: prefer per-color variantImage on the model, then product-level image
  const getImagePath = () => {
    if (selectedColor && activeModel?.variantImages?.[selectedColor]) {
      const imageName = activeModel.variantImages[selectedColor];
      const importPath = `/src/assets/Phones/${imageName}`;
      const imageModule = phoneImages[importPath];
      if (imageModule?.default) {
        return imageModule.default;
      }
      return product.image;
    }
    return product.image;
  };

  const currentImage = getImagePath();

  const status      = activeModel?.status ?? product.status ?? 'Available';
  const region      = activeModel?.region ?? product.region ?? 'Global';
  const statusStyle = statusConfig[status] ?? statusConfig['Available'];
  const colorHex    = selectedColor ? (colorMap[selectedColor] ?? '#888') : null;

  /** @param {string} r @returns {FlagCode} */
  const getFlagCode = (r) => {
    /** @type {Record<string, FlagCode>} */
    const map = { USA: 'US', Japan: 'JP', India: 'IN', Europe: 'EU', China: 'CN' };
    return map[r] ?? 'Global';
  };

  const handleStorageChange = useCallback(
    /** @param {string} gb */
    (gb) => {
      if (gb === selectedStorage) return;
      setSelectedStorage(gb);
      const model = product.models.find((m) => m.storage === gb);
      setSelectedColor(model?.colors[0] ?? '');
    },
    [selectedStorage, product.models]
  );

  return (
    <>
      <style>{`
        @keyframes pcPopIn       { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes pcRingIn      { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }
        @keyframes pcFadeScaleIn { from{opacity:0;transform:scale(0.3)} to{opacity:1;transform:scale(1)} }
        @keyframes pcFadeUp      { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative bg-white dark:bg-slate-900 rounded-[22px] overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col select-none"
        style={{
          boxShadow: isHovered
            ? '0 20px 60px rgba(0,0,0,0.12), 0 6px 20px rgba(0,0,0,0.06)'
            : '0 1px 6px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)',
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'box-shadow 0.32s ease, transform 0.32s cubic-bezier(0.32,0,0.2,1)',
        }}
      >
        {/* Color-reactive background blush */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[22px]"
          style={{
            background: colorHex
              ? `radial-gradient(ellipse 90% 45% at 50% 0%, ${colorHex}14, transparent 60%)`
              : `radial-gradient(circle at 50% 0%, ${product.glow}10, transparent 55%)`,
            transition: 'background 0.6s ease',
          }}
        />

        {/* ── IMAGE ZONE ── */}
        <div
          className="relative flex-shrink-0"
          style={{
            height: 220,
            background: 'linear-gradient(155deg, #f9f9fc 0%, #ececf4 100%)',
          }}
        >
          <ProductImage
            src={currentImage}
            alt={`${activeModel?.name ?? product.name} ${selectedStorage} ${selectedColor}`}
            glowColor={colorHex ?? product.glow}
            isHovered={isHovered}
            fallbackSrc={product.image}
          />

          {/* Brand badge */}
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[10px] font-bold text-slate-800 dark:text-slate-100 border border-white/60 dark:border-slate-700/50 shadow-sm tracking-wide uppercase">
              {product.brand}
            </span>
          </div>

          {/* Status badge */}
          <div className="absolute top-3.5 right-3.5 z-10">
            <span
              className={[
                'inline-flex items-center gap-1 px-2 py-0.5 rounded-full',
                'text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm border',
                statusStyle.bg,
                statusStyle.text,
                statusStyle.border,
              ].join(' ')}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
              {status}
            </span>
          </div>

          {/* Region badge */}
          <div className="absolute bottom-3 right-3.5 z-10">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-[9px] font-medium border border-white/20">
              <FlagIcon code={getFlagCode(region)} className="w-3.5 h-2.5 rounded-sm" />
              {region}
            </span>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="relative flex flex-col flex-1 gap-3.5 p-4 pt-3.5">

          {/* Model name */}
          <div>
            <h3 className="text-[17px] font-bold text-slate-900 dark:text-slate-50 leading-snug tracking-tight">
              {activeModel?.name ?? product.name}
            </h3>
          </div>

          {/* STEP 1: Storage */}
          <div>
            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
              Storage
            </p>
            <div className="flex flex-wrap gap-1.5">
              {allStorage.map((gb) => (
                <StoragePill
                  key={gb}
                  label={gb}
                  active={selectedStorage === gb}
                  onClick={() => handleStorageChange(gb)}
                />
              ))}
            </div>
          </div>

          {/* STEP 2: Color */}
          <div key={selectedStorage} style={{ animation: 'pcFadeUp 0.25s ease both' }}>
            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
              Color
              {availableColors.length > 0 && (
                <span className="ml-1.5 normal-case font-medium text-slate-300 dark:text-slate-600">
                  · {availableColors.length} options
                </span>
              )}
            </p>

            {availableColors.length > 0 ? (
              <div className="flex flex-wrap gap-2.5">
                {availableColors.map((color) => (
                  <ColorDot
                    key={color}
                    color={color}
                    hex={colorMap[color] ?? '#888'}
                    active={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                No colors for this storage
              </p>
            )}
          </div>

          {/* Selection badge */}
          <SelectionBadge
            key={`${selectedStorage}-${selectedColor}`}
            storage={selectedStorage}
            color={selectedColor}
            colorHex={colorHex}
          />

          {/* Divider */}
          <div className="h-px bg-slate-100 dark:bg-slate-800" />


          {/* CTA — Inquire popover */}
          <div ref={inquireRef} className="relative">

            {/* Trigger button */}
            <button
              type="button"
              onClick={() => setInquireOpen(prev => !prev)}
              className="group/btn relative flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-white text-[11px] font-bold tracking-widest uppercase shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/35 hover:from-amber-400 hover:to-amber-300 active:scale-[0.97] transition-all duration-250 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
            >
              <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out pointer-events-none" />
              <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
              Inquire
              <ChevronRight className={`w-3 h-3 opacity-60 -ml-0.5 transition-transform duration-200 ${inquireOpen ? 'rotate-90' : 'group-hover/btn:translate-x-0.5'}`} />
            </button>

            {/* Popover panel — opens upward */}
            {inquireOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2.5 z-50">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-slate-900/15 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 overflow-hidden">

                  {/* Header */}
                  <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.22em]">
                      Choose contact method
                    </span>
                    <button
                      type="button"
                      onClick={() => setInquireOpen(false)}
                      className="w-5 h-5 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Options */}
                  <div className="p-2 space-y-1">

                    {/* WhatsApp */}
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="group/wa flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors duration-150 text-left"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center group-hover/wa:bg-emerald-500/20 transition-colors">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[12px] font-bold text-slate-800 dark:text-slate-100 leading-none mb-0.5">WhatsApp</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">Chat with us instantly</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 flex-shrink-0 group-hover/wa:text-emerald-500 group-hover/wa:translate-x-0.5 transition-all duration-150" />
                    </button>

                    {/* Email */}
                    <button
                      type="button"
                      onClick={handleEmail}
                      className="group/em flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-400/10 transition-colors duration-150 text-left"
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-amber-400/15 flex items-center justify-center group-hover/em:bg-amber-500/20 transition-colors">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[12px] font-bold text-slate-800 dark:text-slate-100 leading-none mb-0.5">Email</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">Fill the inquiry form</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 flex-shrink-0 group-hover/em:text-amber-500 group-hover/em:translate-x-0.5 transition-all duration-150" />
                    </button>
                  </div>
                </div>

                {/* Arrow pointing down to button */}
                <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white dark:bg-slate-900 border-r border-b border-slate-100 dark:border-slate-800 rotate-45" />
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}