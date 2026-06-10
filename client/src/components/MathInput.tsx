import { useState, useRef, useCallback } from 'react';

// ── Counter for stable IDs within a render lifecycle ──────────────────────────
let _n = 0;
const uid = () => `m${++_n}`;

// ── Types ─────────────────────────────────────────────────────────────────────

type TextSeg    = { id: string; kind: 'text';    value: string };
type PowerSeg   = { id: string; kind: 'power';   base: string; exp: string };
type FracSeg    = { id: string; kind: 'frac';    num: string;  den: string };
type SpecialSeg = { id: string; kind: 'special'; display: string; latex: string };
type Seg = TextSeg | PowerSeg | FracSeg | SpecialSeg;

type SlotKey = 'value' | 'base' | 'exp' | 'num' | 'den';
type FocusRef = { id: string; slot: SlotKey } | null;

// ── LaTeX conversion ──────────────────────────────────────────────────────────

function toLatex(segs: Seg[]): string {
  return segs.map(s => {
    if (s.kind === 'text')    return s.value;
    if (s.kind === 'power')   return `${s.base}^{${s.exp}}`;
    if (s.kind === 'frac')    return `\\frac{${s.num}}{${s.den}}`;
    if (s.kind === 'special') return s.latex;
    return '';
  }).join('');
}

function isBlank(segs: Seg[]) {
  return segs.every(s => {
    if (s.kind === 'special') return false;
    if (s.kind === 'text')    return s.value === '';
    if (s.kind === 'power')   return s.base === '' && s.exp === '';
    if (s.kind === 'frac')    return s.num === '' && s.den === '';
    return true;
  });
}

// ── Component ─────────────────────────────────────────────────────────────────

interface MathInputProps {
  onChange: (latex: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function MathInput({ onChange, placeholder = 'Escribe tu respuesta...', disabled, className }: MathInputProps) {
  const mkSegs = (): Seg[] => [{ id: uid(), kind: 'text', value: '' }];
  const [segs, setSegs] = useState<Seg[]>(mkSegs);
  const [focus, setFocus] = useState<FocusRef>(null);
  const refs = useRef<Record<string, HTMLInputElement | null>>({});

  // Commit state + emit LaTeX
  const commit = useCallback((next: Seg[]) => {
    setSegs(next);
    onChange(toLatex(next));
  }, [onChange]);

  // Focus a slot by id + slot name
  const focusSlot = useCallback((id: string, slot: SlotKey) => {
    setFocus({ id, slot });
    setTimeout(() => refs.current[`${id}:${slot}`]?.focus(), 0);
  }, []);

  // Mutate a single field inside a segment
  const updateField = (id: string, field: string, val: string) => {
    commit(segs.map(s => s.id === id ? { ...s, [field]: val } : s));
  };

  // ── Toolbar actions ────────────────────────────────────────────────────────

  // Insert xⁿ: last text segment becomes base, new power + trailing text added
  const insertPower = () => {
    const li = segs.reduce<number | undefined>((acc, s, i) => s.kind === 'text' ? i : acc, undefined);
    const powId = uid(), txtId = uid();
    if (li !== undefined) {
      const base = (segs[li] as TextSeg).value;
      const next: Seg[] = [
        ...segs.slice(0, li),
        { id: powId, kind: 'power', base, exp: '' },
        { id: txtId, kind: 'text', value: '' },
        ...segs.slice(li + 1),
      ];
      commit(next);
      focusSlot(powId, base ? 'exp' : 'base');
    } else {
      commit([...segs,
        { id: powId, kind: 'power', base: '', exp: '' },
        { id: txtId, kind: 'text', value: '' },
      ]);
      focusSlot(powId, 'base');
    }
  };

  // Insert a/b: create fraction + trailing text, focus numerator
  const insertFrac = () => {
    const fracId = uid(), txtId = uid();
    commit([...segs,
      { id: fracId, kind: 'frac', num: '', den: '' },
      { id: txtId, kind: 'text', value: '' },
    ]);
    focusSlot(fracId, 'num');
  };

  // Append a symbol into the currently focused (or last text) slot, at cursor
  const appendSymbol = (sym: string) => {
    const tgt = focus ?? (() => {
      const li = segs.reduce<number | undefined>((acc, s, i) => s.kind === 'text' ? i : acc, undefined);
      return li !== undefined ? { id: segs[li].id, slot: 'value' as SlotKey } : null;
    })();
    if (!tgt) return;
    const seg = segs.find(s => s.id === tgt.id);
    if (!seg) return;
    const input = refs.current[`${tgt.id}:${tgt.slot}`];
    if (input) {
      const s = input.selectionStart ?? ((seg as any)[tgt.slot] as string).length;
      const e = input.selectionEnd ?? s;
      const cur = (seg as any)[tgt.slot] as string;
      updateField(tgt.id, tgt.slot, cur.slice(0, s) + sym + cur.slice(e));
      setTimeout(() => {
        input.focus();
        input.setSelectionRange(s + sym.length, s + sym.length);
      }, 0);
    } else {
      updateField(tgt.id, tgt.slot, ((seg as any)[tgt.slot] as string) + sym);
    }
  };

  const insertSpecial = (display: string, latex: string) => {
    commit([...segs, { id: uid(), kind: 'special', display, latex }]);
  };

  const reset = () => {
    const next = mkSegs();
    setSegs(next);
    setFocus(null);
    onChange('');
    setTimeout(() => focusSlot(next[0].id, 'value'), 0);
  };

  // ── Keyboard navigation within structures ──────────────────────────────────

  const handleKeyDown = (id: string, slot: SlotKey) => (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const seg = segs.find(s => s.id === id);
    if (!seg) return;
    if (seg.kind === 'power' && slot === 'base') { focusSlot(id, 'exp'); return; }
    if (seg.kind === 'frac'  && slot === 'num')  { focusSlot(id, 'den'); return; }
    // Exit structure → focus next text segment
    const idx = segs.findIndex(s => s.id === id);
    const next = segs.slice(idx + 1).find(s => s.kind === 'text');
    if (next) focusSlot(next.id, 'value');
  };

  // ── Slot input builder ─────────────────────────────────────────────────────

  const slotInput = (id: string, slot: SlotKey, val: string, extraCls = '') => {
    const key = `${id}:${slot}`;
    const active = focus?.id === id && focus?.slot === slot;
    return (
      <input
        key={key}
        ref={el => { refs.current[key] = el; }}
        type="text"
        value={val}
        onChange={e => updateField(id, slot, e.target.value)}
        onFocus={() => setFocus({ id, slot })}
        onKeyDown={handleKeyDown(id, slot)}
        disabled={disabled}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        style={{ width: `${Math.max(1.4, val.length * 0.72 + 0.6)}em` }}
        className={[
          'bg-transparent outline-none text-center border-b-2 min-w-6 transition-colors',
          active ? 'border-blue-500' : val ? 'border-transparent' : 'border-dashed border-gray-400',
          extraCls,
        ].join(' ')}
      />
    );
  };

  // ── Segment renderer ───────────────────────────────────────────────────────

  const renderSeg = (seg: Seg) => {
    switch (seg.kind) {
      case 'text':
        return (
          <span key={seg.id} className="inline">
            {slotInput(seg.id, 'value', seg.value, 'text-xl')}
          </span>
        );
      case 'power':
        return (
          <span key={seg.id} className="inline-flex items-start align-baseline">
            {slotInput(seg.id, 'base', seg.base, 'text-xl')}
            <sup className="relative -top-1.5 leading-none">
              {slotInput(seg.id, 'exp', seg.exp, 'text-sm')}
            </sup>
          </span>
        );
      case 'frac':
        return (
          <span key={seg.id} className="inline-flex flex-col items-center mx-1.5 align-middle text-base leading-tight">
            <span className="pb-0.5">{slotInput(seg.id, 'num', seg.num)}</span>
            <span className="border-t border-gray-700 w-full min-w-5" />
            <span className="pt-0.5">{slotInput(seg.id, 'den', seg.den)}</span>
          </span>
        );
      case 'special':
        return (
          <span key={seg.id} className="mx-1 text-xl text-gray-800 select-none">
            {seg.display}
          </span>
        );
    }
  };

  // ── Toolbar ────────────────────────────────────────────────────────────────

  const btn = [
    'px-2.5 py-1.5 text-sm border border-gray-300 rounded bg-white',
    'hover:bg-blue-50 active:bg-blue-100 disabled:opacity-40 select-none',
  ].join(' ');

  const symBtns: [string, string][] = [
    ['×', '×'], ['÷', '÷'], ['±', '±'],
    ['≠', '≠'], ['≤', '≤'], ['≥', '≥'],
    ['∞', '∞'], ['π', 'π'],
  ];

  return (
    <div className={`border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-400 transition-colors ${className ?? ''}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200">
        {/* Structure buttons */}
        <button type="button" onClick={insertPower} disabled={disabled} className={btn} title="Potencia">
          x<sup>n</sup>
        </button>
        <button type="button" onClick={insertFrac} disabled={disabled} className={btn} title="Fracción">
          <span className="flex flex-col items-center text-xs leading-none gap-px">
            <span>a</span>
            <span className="border-t border-current w-3.5" />
            <span>b</span>
          </span>
        </button>

        <span className="w-px bg-gray-300 self-stretch mx-0.5" />

        {/* Symbol buttons */}
        {symBtns.map(([sym]) => (
          <button
            key={sym}
            type="button"
            onClick={() => appendSymbol(sym)}
            disabled={disabled}
            className={`${btn} font-mono`}
          >
            {sym}
          </button>
        ))}

        <span className="w-px bg-gray-300 self-stretch mx-0.5" />

        <button
          type="button"
          onClick={() => insertSpecial('No existe', '\\text{No existe}')}
          disabled={disabled}
          className={btn}
        >
          No existe
        </button>

        {/* Reset */}
        <button
          type="button"
          onClick={reset}
          disabled={disabled || isBlank(segs)}
          className={`${btn} hover:bg-red-50 ml-auto`}
          title="Borrar todo"
        >
          ✕
        </button>
      </div>

      {/* Expression area */}
      <div
        className="flex items-center flex-wrap min-h-14 px-4 py-3 bg-white cursor-text"
        onClick={() => {
          if (!focus) {
            const last = [...segs].reverse().find(s => s.kind === 'text');
            if (last) focusSlot(last.id, 'value');
          }
        }}
      >
        {isBlank(segs) ? (
          <span className="text-gray-400 select-none pointer-events-none text-base">
            {placeholder}
          </span>
        ) : (
          segs.map(renderSeg)
        )}
      </div>
    </div>
  );
}
