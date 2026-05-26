'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ADDONS, PRODUCTS, type CartItem, type ColorOption, type Product, type StemOption } from './data';
import s from './shop.module.css';

type View = 'catalog' | 'builder' | 'checkout' | 'confirm';
type Particle = { x: number; y: number; rotation: number };

const MAX_PARTICLES = 120;

function classes(...c: (string | false | undefined | null)[]) {
  return c.filter(Boolean).join(' ');
}

function generateParticles(width: number, height: number): Particle[] {
  if (width === 0 || height === 0) return [];
  const SIZE = 36;
  const PAD = SIZE;
  const MIN_DIST = SIZE;
  const MAX_TRIES = 80;
  const cx = width / 2;
  const cy = height / 2;
  const CLEAR_RADIUS = Math.min(width, height) * 0.28;
  const placed: Particle[] = [];

  for (let i = 0; i < MAX_PARTICLES; i++) {
    let px = 0;
    let py = 0;
    let ok = false;
    let tries = 0;
    while (tries < MAX_TRIES) {
      px = PAD + Math.random() * (width - PAD * 2);
      py = PAD + Math.random() * (height - PAD * 2);
      const distToCenter = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2);
      if (distToCenter < CLEAR_RADIUS) {
        tries++;
        continue;
      }
      ok = placed.every((p) => {
        const dx = p.x - px;
        const dy = p.y - py;
        return Math.sqrt(dx * dx + dy * dy) >= MIN_DIST;
      });
      if (ok) break;
      tries++;
    }
    if (!ok) continue;
    placed.push({ x: px, y: py, rotation: Math.random() * 40 - 20 });
  }
  return placed;
}

export default function Shop() {
  const [view, setView] = useState<View>('catalog');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartHydrated, setCartHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [selectedStem, setSelectedStem] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [initialLetter, setInitialLetter] = useState('');
  const [calligraphyNote, setCalligraphyNote] = useState('');
  const [error, setError] = useState('');
  const [fulfillment, setFulfillment] = useState('');
  const [toast, setToast] = useState<{ name: string; price: number } | null>(null);

  const activeProduct = useMemo(
    () => (activeProductId ? PRODUCTS.find((p) => p.id === activeProductId) ?? null : null),
    [activeProductId],
  );

  // ── Cart persistence ────────────────────────────────
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('ftg_cart');
      if (stored) setCart(JSON.parse(stored));
    } catch {}
    setCartHydrated(true);
  }, []);

  useEffect(() => {
    if (!cartHydrated) return;
    try {
      sessionStorage.setItem('ftg_cart', JSON.stringify(cart));
    } catch {}
  }, [cart, cartHydrated]);

  // ── Lock body scroll when cart drawer is open ──────
  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [cartOpen]);

  // ── Scroll to top on view change ────────────────────
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  // ── Handlers ────────────────────────────────────────
  const openProduct = useCallback((id: string) => {
    setActiveProductId(id);
    setSelectedStem(null);
    setSelectedColor(null);
    setSelectedAddOns(new Set());
    setInitialLetter('');
    setCalligraphyNote('');
    setError('');
    setView('builder');
  }, []);

  const toggleAddOn = useCallback((id: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const addToCart = useCallback(() => {
    if (!activeProduct) return;
    if (!selectedStem) {
      setError('Please choose a stem count.');
      document.getElementById('stem-options')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!selectedColor) {
      setError('Please choose a color.');
      document.getElementById('color-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const stem = activeProduct.stemOptions.find((x) => x.id === selectedStem)!;
    const color = activeProduct.colors.find((x) => x.id === selectedColor)!;
    const aoTotal = Array.from(selectedAddOns).reduce((sum, id) => {
      const ao = activeProduct.addOns.find((a) => a.id === id);
      return sum + (ao ? ao.price : 0);
    }, 0);
    const item: CartItem = {
      id: Date.now(),
      productId: activeProduct.id,
      productName: activeProduct.name,
      stemId: stem.id,
      stemLabel: stem.label,
      colorId: color.id,
      colorLabel: color.label,
      colorHex: color.hex,
      addOns: Array.from(selectedAddOns),
      initialLetter: selectedAddOns.has('babiesbreath') ? initialLetter.trim() : '',
      calligraphyNote: selectedAddOns.has('calligraphy') ? calligraphyNote.trim() : '',
      unitPrice: stem.price + aoTotal,
      qty: 1,
    };
    setCart((c) => [...c, item]);
    setToast({ name: `${activeProduct.name} — ${stem.label}`, price: stem.price + aoTotal });
    setCartOpen(true);
  }, [activeProduct, selectedStem, selectedColor, selectedAddOns, initialLetter, calligraphyNote]);

  // ── Toast auto-dismiss ──────────────────────────────
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const removeFromCart = useCallback((id: number) => {
    setCart((c) => c.filter((i) => i.id !== id));
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.unitPrice * i.qty, 0);

  const startOver = () => {
    setCart([]);
    setSelectedStem(null);
    setSelectedColor(null);
    setSelectedAddOns(new Set());
    setActiveProductId(null);
    setView('catalog');
  };

  return (
    <div className={s.shop}>
      {view === 'catalog' && <Catalog onOpen={openProduct} />}

      {view === 'builder' && activeProduct && (
        <Builder
          product={activeProduct}
          selectedStem={selectedStem}
          selectedColor={selectedColor}
          selectedAddOns={selectedAddOns}
          initialLetter={initialLetter}
          calligraphyNote={calligraphyNote}
          error={error}
          onBack={() => setView('catalog')}
          onPickStem={(id) => {
            setSelectedStem(id);
            setError('');
          }}
          onPickColor={(id) => {
            setSelectedColor(id);
            setError('');
          }}
          onToggleAddOn={toggleAddOn}
          onInitialChange={setInitialLetter}
          onNoteChange={setCalligraphyNote}
          onAddToCart={addToCart}
        />
      )}

      {view === 'checkout' && (
        <Checkout
          cart={cart}
          fulfillment={fulfillment}
          onFulfillmentChange={setFulfillment}
          onBack={() => setView('builder')}
          onPlaceOrder={() => {
            setCart([]);
            setView('confirm');
          }}
        />
      )}

      {view === 'confirm' && (
        <div className={s.confirm}>
          <div className={s.confirmInner}>
            <div className="icon">🌸</div>
            <h2>Thank you!</h2>
            <p>
              Your order has been received. From The Garden will be in touch shortly to confirm everything
              and arrange payment.
            </p>
            <button className={s.confirmBackBtn} onClick={startOver}>
              Shop Again →
            </button>
          </div>
        </div>
      )}

      {/* Floating cart button — visible across all views */}
      <button
        type="button"
        className={s.cartFab}
        onClick={() => setCartOpen(true)}
        aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
      >
        🌸 Cart {cartCount > 0 && <span className={s.cartFabCount}>{cartCount}</span>}
      </button>

      {/* Cart drawer */}
      <div
        className={classes(s.cartOverlay, cartOpen && 'open')}
        onClick={() => setCartOpen(false)}
        aria-hidden
      />
      <aside
        className={classes(s.cartDrawer, cartOpen && 'open')}
        aria-label="Cart"
        aria-hidden={!cartOpen}
      >
        <div className={s.drawerHeader}>
          <div className={s.drawerTitle}>Your Bouquet</div>
          <button className={s.drawerClose} onClick={() => setCartOpen(false)} aria-label="Close cart">
            ✕
          </button>
        </div>

        <div className={s.drawerBody}>
          {cart.length === 0 ? (
            <div className={s.cartEmpty}>
              <div className="icon">🌸</div>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item) => {
              const p = PRODUCTS.find((pp) => pp.id === item.productId);
              const aoNames = item.addOns
                .map((id) => p?.addOns.find((a) => a.id === id)?.label)
                .filter(Boolean)
                .join(', ');
              return (
                <div key={item.id} className={s.cartItem}>
                  <div className={s.cartItemSwatch} style={{ background: item.colorHex }} />
                  <div className={s.cartItemInfo}>
                    <div className={s.cartItemName}>{item.productName}</div>
                    <div className={s.cartItemMeta}>
                      {item.stemLabel} · {item.colorLabel}
                    </div>
                    {aoNames && <div className={s.cartItemAddons}>{aoNames}</div>}
                  </div>
                  <div className={s.cartItemRight}>
                    <div className={s.cartItemPrice}>${item.unitPrice.toLocaleString()}</div>
                    <button className={s.cartItemRemove} onClick={() => removeFromCart(item.id)}>
                      ✕
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className={s.drawerFooter}>
            <div className={s.drawerTotalRow}>
              <span className={s.drawerTotalLabel}>Total</span>
              <span className={s.drawerTotalValue}>${cartTotal.toLocaleString()}</span>
            </div>
            <button
              className={s.checkoutBtn}
              onClick={() => {
                setCartOpen(false);
                setView('checkout');
              }}
            >
              Proceed to Checkout →
            </button>
            <p className={s.drawerNote}>Payment collected at checkout · Free pickup available</p>
          </div>
        )}
      </aside>

      {/* Toast */}
      <div className={classes(s.toast, toast && 'show')} aria-live="polite">
        <div>
          <div className={s.toastLabel}>Added to cart</div>
          <div className={s.toastName}>{toast?.name ?? ''}</div>
        </div>
        <div className={s.toastPrice}>{toast ? `$${toast.price.toLocaleString()}` : ''}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
 * CATALOG
 * ───────────────────────────────────────────────────── */
function Catalog({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className={s.catalog}>
      <div className={s.storeHeader}>
        <p className={s.eyebrow}>From The Garden · Shop</p>
        <h1>
          Order your <em>bouquet.</em>
        </h1>
        <p>Hand-wrapped, seasonally sourced, made just for you. Choose a variety below to get started.</p>
      </div>

      <div className={s.productGrid}>
        {PRODUCTS.map((p) => {
          const from = Math.min(...p.stemOptions.map((o) => o.price));
          return (
            <button key={p.id} type="button" className={s.productCard} onClick={() => onOpen(p.id)}>
              <div className={s.productCardVisual}>
                <div
                  className={s.productCardVisualBg}
                  style={{
                    background: `radial-gradient(ellipse 70% 80% at 60% 40%, ${p.bgColor} 0%, transparent 70%), #1a1a1a`,
                  }}
                />
                <span className={s.productCardEmoji}>{p.emoji}</span>
              </div>
              <div className={s.productCardBody}>
                <div className={s.productCardName}>{p.name}</div>
                <div className={s.productCardDesc}>{p.tagline}</div>
                <div className={s.productCardPriceRow}>
                  <div className={s.productCardPrice}>
                    From ${from.toLocaleString()} <small>/ order</small>
                  </div>
                  <div className={s.productCardCta}>Customize →</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
 * BUILDER
 * ───────────────────────────────────────────────────── */
type BuilderProps = {
  product: Product;
  selectedStem: string | null;
  selectedColor: string | null;
  selectedAddOns: Set<string>;
  initialLetter: string;
  calligraphyNote: string;
  error: string;
  onBack: () => void;
  onPickStem: (id: string) => void;
  onPickColor: (id: string) => void;
  onToggleAddOn: (id: string) => void;
  onInitialChange: (v: string) => void;
  onNoteChange: (v: string) => void;
  onAddToCart: () => void;
};

function Builder(p: BuilderProps) {
  const stem = p.selectedStem ? p.product.stemOptions.find((x) => x.id === p.selectedStem) ?? null : null;
  const color = p.selectedColor ? p.product.colors.find((x) => x.id === p.selectedColor) ?? null : null;

  const aoTotal = useMemo(
    () =>
      Array.from(p.selectedAddOns).reduce((sum, id) => {
        const ao = p.product.addOns.find((a) => a.id === id);
        return sum + (ao ? ao.price : 0);
      }, 0),
    [p.selectedAddOns, p.product],
  );
  const total = (stem?.price ?? 0) + aoTotal;

  return (
    <>
      <button className={s.builderBack} onClick={p.onBack}>
        ← All Products
      </button>

      <div className={s.builderLayout}>
        <BuilderVisual product={p.product} stem={stem} color={color} addOnIds={p.selectedAddOns} total={total} />

        <div className={s.builderForm}>
          <div className={s.builderProductName}>{p.product.name}</div>
          <div className={s.builderProductDesc}>{p.product.description}</div>
          {p.product.scarcity && <div className={s.scarcityNote}>⚠️ {p.product.scarcity}</div>}

          {/* Step 1 — Stem Count */}
          <div className={s.builderSection}>
            <div className={s.sectionLabel}>Step 1 — Stem Count</div>
            <div className={s.stemOptions} id="stem-options">
              {p.product.stemOptions.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={classes(s.stemOpt, p.selectedStem === o.id && 'selected')}
                  onClick={() => p.onPickStem(o.id)}
                >
                  <div className={s.stemRadio} />
                  <div className={s.stemInfo}>
                    <div className={s.stemName}>
                      {o.label}
                      {o.note && <span className={s.stemNote}>{o.note}</span>}
                    </div>
                  </div>
                  <div className={s.stemPrice}>${o.price.toLocaleString()}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 — Color */}
          <div className={s.builderSection}>
            <div className={s.sectionLabel}>Step 2 — Color</div>
            <div className={s.colorGrid} id="color-grid">
              {p.product.colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={classes(s.colorOpt, p.selectedColor === c.id && 'selected')}
                  onClick={() => p.onPickColor(c.id)}
                  aria-label={c.label}
                >
                  <div
                    className={s.colorSwatch}
                    style={{
                      background: c.hex,
                      border: c.id === 'white' ? '1px solid #ddd' : undefined,
                    }}
                  />
                  <div className={s.colorName}>{c.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 — Add-ons */}
          <div className={s.builderSection}>
            <div className={s.sectionLabel}>
              Step 3 — Add-ons <span className={s.optionalTag}>(optional)</span>
            </div>
            <div className={s.addonList}>
              {p.product.addOns.map((a) => {
                const isSelected = p.selectedAddOns.has(a.id);
                return (
                  <div key={a.id}>
                    <button
                      type="button"
                      className={classes(s.addonOpt, isSelected && 'selected')}
                      onClick={() => p.onToggleAddOn(a.id)}
                    >
                      <div className={s.addonCheck}>{isSelected ? '✓' : ''}</div>
                      <div className={s.addonInfo}>
                        <div className={s.addonName}>{a.label}</div>
                        <div className={s.addonDesc}>{a.desc}</div>
                      </div>
                      <div className={s.addonPrice}>+${a.price}</div>
                    </button>

                    {a.id === 'babiesbreath' && isSelected && (
                      <div className={s.addonExtra}>
                        <label htmlFor="initial-input">Which letter initial?</label>
                        <input
                          id="initial-input"
                          type="text"
                          maxLength={8}
                          placeholder="e.g. A"
                          className={s.initialInput}
                          value={p.initialLetter}
                          onChange={(e) => p.onInitialChange(e.target.value)}
                        />
                      </div>
                    )}

                    {a.id === 'calligraphy' && isSelected && (
                      <div className={s.addonExtra}>
                        <label htmlFor="note-input">
                          What should the note say?{' '}
                          <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
                            (max 500 characters)
                          </span>
                        </label>
                        <textarea
                          id="note-input"
                          rows={3}
                          maxLength={500}
                          placeholder="e.g. Happy Birthday Sarah, love you always..."
                          value={p.calligraphyNote}
                          onChange={(e) => p.onNoteChange(e.target.value)}
                        />
                        <div className={s.charCount}>{500 - p.calligraphyNote.length} characters remaining</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={s.vasesComingSoon}>
            <span className={s.vcsIcon}>🏺</span>
            <div>
              <div className={s.vcsLabel}>Vases</div>
              <div className={s.vcsSub}>Coming soon</div>
            </div>
          </div>

          <div className={s.builderCta}>
            <div className={s.builderTotalRow}>
              <div className={s.builderTotalLabel}>Your total</div>
              <div className={s.builderTotalPrice}>
                <sup>$</sup>
                {total > 0 ? total.toLocaleString() : '0'}
              </div>
            </div>
            <button className={s.addToCartBtn} onClick={p.onAddToCart}>
              Add to Cart →
            </button>
            <div className={s.builderError}>{p.error}</div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────
 * BUILDER VISUAL — particle system + reactive panel
 * ───────────────────────────────────────────────────── */
function BuilderVisual({
  product,
  stem,
  color,
  addOnIds,
  total,
}: {
  product: Product;
  stem: StemOption | null;
  color: ColorOption | null;
  addOnIds: Set<string>;
  total: number;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const countRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLSpanElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const prevColorId = useRef<string | null>(null);
  const prevStemId = useRef<string | null>(null);
  const prevTotal = useRef<number>(0);

  // Generate particles once the panel has real dimensions (re-run on product switch)
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const init = () => {
      const rect = panel.getBoundingClientRect();
      const next = generateParticles(rect.width, rect.height);
      if (next.length > 0) {
        setParticles(next);
        particleRefs.current = new Array(next.length).fill(null);
      }
    };
    // First paint may report 0; retry on next frame
    init();
    const id = requestAnimationFrame(() => {
      if (particles.length === 0) init();
    });
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  // Reset particles when product changes
  useEffect(() => {
    prevColorId.current = null;
    prevStemId.current = null;
    prevTotal.current = 0;
  }, [product.id]);

  // Computed values
  const maxStems = useMemo(() => Math.max(...product.stemOptions.map((s) => s.stems)), [product]);
  const visibleCount = stem ? Math.max(2, Math.round((stem.stems / maxStems) * particles.length)) : 0;

  // Bump the stem-count display when stem changes
  useEffect(() => {
    if (!stem || stem.id === prevStemId.current) return;
    prevStemId.current = stem.id;
    const el = countRef.current;
    const emoji = emojiRef.current;
    if (el) {
      el.classList.remove('bump');
      void el.offsetWidth;
      el.classList.add('bump');
    }
    if (emoji) {
      emoji.classList.remove('bump');
      void emoji.offsetWidth;
      emoji.classList.add('bump');
      setTimeout(() => emoji.classList.remove('bump'), 380);
    }
  }, [stem]);

  // Pop the price when total changes
  useEffect(() => {
    if (total === prevTotal.current) return;
    prevTotal.current = total;
    const el = priceRef.current;
    if (!el) return;
    el.classList.remove('pop');
    void el.offsetWidth;
    if (total > 0) el.classList.add('pop');
  }, [total]);

  // Color change → bg gradient + box shadow + ring pulse + bounce particles
  useEffect(() => {
    if (!color) return;
    if (color.id === prevColorId.current) return;
    prevColorId.current = color.id;

    const hex = color.hex.startsWith('linear') ? '#D4748A' : color.hex;
    const panel = panelRef.current;
    if (panel) {
      panel.style.boxShadow = `inset 0 -60px 120px ${hex}40, inset 0 0 60px ${hex}20, 0 0 50px 10px ${hex}60`;
      const t = setTimeout(() => {
        panel.style.boxShadow = '';
      }, 950);
      // Ring pulse
      const ring = ringRef.current;
      if (ring) {
        ring.style.background = `radial-gradient(circle, ${hex}95, transparent 70%)`;
        ring.classList.remove('pulse');
        void ring.offsetWidth;
        ring.classList.add('pulse');
      }
      // Bounce visible particles
      particleRefs.current.forEach((p, i) => {
        if (!p || i >= visibleCount) return;
        p.classList.remove('bounce');
        void p.offsetWidth;
        p.classList.add('bounce');
        setTimeout(() => p?.classList.remove('bounce'), 400);
      });
      return () => clearTimeout(t);
    }
  }, [color, visibleCount]);

  // Build dynamic bg style
  const bgStyle = useMemo(() => {
    if (!color) {
      return {
        background: `radial-gradient(ellipse 85% 85% at 55% 45%, ${product.bgColor} 0%, transparent 70%), #1a1a1a`,
      };
    }
    const hex = color.hex.startsWith('linear') ? '#D4748A' : color.hex;
    return {
      background:
        `radial-gradient(ellipse 130% 110% at 50% 80%, ${hex}75 0%, ${hex}45 20%, ${hex}18 45%, transparent 70%),` +
        `radial-gradient(ellipse 80% 70% at 15% 95%, ${hex}45 0%, transparent 50%),` +
        `radial-gradient(ellipse 60% 50% at 85% 5%, ${hex}30 0%, transparent 45%),` +
        `#1a1a1a`,
    };
  }, [color, product.bgColor]);

  return (
    <div className={s.builderVisual} ref={panelRef}>
      <div className={s.vpBg} style={bgStyle} />

      <div className={s.vpRoses}>
        {particles.map((pt, i) => (
          <span
            key={i}
            ref={(el) => {
              particleRefs.current[i] = el;
            }}
            className={classes(s.vpRose, i < visibleCount && 'visible')}
            style={
              {
                left: `${pt.x.toFixed(1)}px`,
                top: `${pt.y.toFixed(1)}px`,
                '--r': `${pt.rotation.toFixed(1)}deg`,
              } as React.CSSProperties
            }
          >
            {product.emoji}
          </span>
        ))}
      </div>

      <div className={s.vpColorRing} ref={ringRef} />

      <div className={s.vpCenter}>
        <div className={s.vpProductName}>{product.name}</div>
        <span className={s.vpMainEmoji} ref={emojiRef}>
          {product.emoji}
        </span>
        <div className={s.vpStemCount} ref={countRef}>
          {stem ? stem.stems : '—'}
        </div>
        <div className={s.vpStemLabel}>{stem ? stem.label : 'Select your stem count'}</div>
        <div className={s.vpPrice} ref={priceRef}>
          <sup>$</sup>
          {total > 0 ? total.toLocaleString() : '—'}
        </div>
        <div className={s.vpAddons}>
          {product.addOns.map((a) => (
            <span
              key={a.id}
              className={classes(s.vpAddonBadge, addOnIds.has(a.id) && 'visible')}
            >
              {a.badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
 * CHECKOUT
 * ───────────────────────────────────────────────────── */
function Checkout({
  cart,
  fulfillment,
  onFulfillmentChange,
  onBack,
  onPlaceOrder,
}: {
  cart: CartItem[];
  fulfillment: string;
  onFulfillmentChange: (v: string) => void;
  onBack: () => void;
  onPlaceOrder: () => void;
}) {
  const subtotal = cart.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);

  return (
    <>
      <button className={s.builderBack} onClick={onBack}>
        ← Edit Order
      </button>
      <div className={s.checkoutLayout}>
        <div className={s.checkoutFormPanel}>
          <h2>
            Your <em>details.</em>
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onPlaceOrder();
            }}
          >
            <div className={s.sectionLabel} style={{ marginBottom: 18 }}>
              Contact
            </div>
            <div className={s.formRow}>
              <div className={s.formGroup}>
                <label>First Name</label>
                <input type="text" placeholder="First name" required />
              </div>
              <div className={s.formGroup}>
                <label>Last Name</label>
                <input type="text" placeholder="Last name" required />
              </div>
            </div>
            <div className={s.formGroup}>
              <label>Email</label>
              <input type="email" placeholder="you@email.com" required />
            </div>
            <div className={s.formGroup}>
              <label>Phone (optional)</label>
              <input type="tel" placeholder="(202) 000-0000" />
            </div>

            <div className={s.sectionLabel} style={{ marginBottom: 18, marginTop: 6 }}>
              Fulfillment
            </div>
            <div className={s.formGroup}>
              <label>Pickup or Delivery?</label>
              <select
                value={fulfillment}
                onChange={(e) => onFulfillmentChange(e.target.value)}
                required
              >
                <option value="">Select an option</option>
                <option value="pickup">Pickup (Free)</option>
                <option value="delivery">Local Delivery</option>
              </select>
            </div>
            {fulfillment === 'delivery' && (
              <div>
                <div className={s.formGroup}>
                  <label>Street Address</label>
                  <input type="text" placeholder="Street address" />
                </div>
                <div className={s.formRow}>
                  <div className={s.formGroup}>
                    <label>City</label>
                    <input type="text" placeholder="City" />
                  </div>
                  <div className={s.formGroup}>
                    <label>ZIP</label>
                    <input type="text" placeholder="ZIP" />
                  </div>
                </div>
              </div>
            )}
            <div className={s.formGroup}>
              <label>Preferred Date</label>
              <input type="date" required />
            </div>

            <div className={s.sectionLabel} style={{ marginBottom: 18, marginTop: 6 }}>
              Notes
            </div>
            <div className={s.formGroup}>
              <label>Special Instructions (optional)</label>
              <textarea placeholder="Color preferences, occasion, delivery notes..." />
            </div>

            <div className={s.sectionLabel} style={{ marginBottom: 14, marginTop: 6 }}>
              Payment
            </div>
            <div className={s.paymentPlaceholder}>
              <div className="phIcon">💳</div>
              <p>
                <strong>Payment coming soon.</strong>
                <br />
                After placing your order, From The Garden will reach out to collect payment via Venmo, Zelle,
                or card link.
              </p>
            </div>

            <button type="submit" className={s.placeOrderBtn}>
              Place Order →
            </button>
            <p className={s.checkoutDisclaimer}>
              You won&apos;t be charged now. We&apos;ll confirm and arrange payment.
            </p>
          </form>
        </div>

        <div className={s.checkoutSummaryPanel}>
          <h3>Order Summary</h3>
          {cart.length === 0 ? (
            <p style={{ color: 'var(--mid-grey)', fontSize: '0.87rem', padding: '14px 0' }}>
              Your cart is empty.
            </p>
          ) : (
            <>
              {cart.map((item) => {
                const p = PRODUCTS.find((pp) => pp.id === item.productId);
                const aoNames = item.addOns
                  .map((id) => p?.addOns.find((a) => a.id === id)?.label)
                  .filter(Boolean)
                  .join(', ');
                return (
                  <div key={item.id} className={s.summaryItem}>
                    <div className={s.summarySwatch} style={{ background: item.colorHex }} />
                    <div className={s.summaryInfo}>
                      <div className={s.summaryName}>{item.productName}</div>
                      <div className={s.summaryMeta}>
                        {item.stemLabel} · {item.colorLabel}
                      </div>
                      {aoNames && <div className={s.summaryAddons}>{aoNames}</div>}
                    </div>
                    <div className={s.summaryPrice}>${item.unitPrice.toLocaleString()}</div>
                  </div>
                );
              })}
              <div className={s.summaryTotals}>
                <div className={s.summaryRow}>
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className={s.summaryRow}>
                  <span>Delivery</span>
                  <span>TBD</span>
                </div>
                <div className={classes(s.summaryRow, 'grand')}>
                  <span className={s.grandLabel}>Total</span>
                  <span>${subtotal.toLocaleString()}+</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
