/* Згенеровані векторні ілюстрації товарів і страв.
   Щоб використати справжні фото, у даних товару вкажіть поле img: "шлях/до/фото.jpg" —
   тоді замість ілюстрації буде показано фото. */
const ART = (() => {
  const clamp = v => Math.max(0, Math.min(255, v));
  function shade(hex, amt){
    const n = parseInt(hex.slice(1), 16);
    const r = clamp((n >> 16) + amt), g = clamp(((n >> 8) & 255) + amt), b = clamp((n & 255) + amt);
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  }
  const svg = inner => `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;
  const ground = `<ellipse cx="100" cy="220" rx="62" ry="7" fill="#000" opacity=".12"/>`;

  const clothes = {
    tee(c){ const d = shade(c,-26);
      return svg(`${ground}<path d="M62 42 L86 32 Q100 52 114 32 L138 42 L176 72 L156 98 L140 88 V202 H60 V88 L44 98 L24 72 Z" fill="${c}" stroke="${d}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M86 32 Q100 52 114 32" fill="none" stroke="${d}" stroke-width="3"/>
      <path d="M140 88 V202 H114 Q134 150 128 62 Z" fill="#000" opacity=".07"/>
      <path d="M72 120 Q84 150 70 196" fill="none" stroke="${d}" stroke-width="1.5" opacity=".35"/>`); },
    hoodie(c){ const d = shade(c,-28);
      return svg(`${ground}<path d="M72 48 Q100 34 128 48 L168 70 L182 156 L160 160 L150 104 V206 H50 V104 L40 160 L18 156 L32 70 Z" fill="${c}" stroke="${d}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M72 48 Q100 12 128 48 Q100 68 72 48 Z" fill="${shade(c,-10)}" stroke="${d}" stroke-width="2"/>
      <path d="M82 47 Q100 26 118 47 Q100 60 82 47 Z" fill="${shade(c,-48)}"/>
      <path d="M94 64 V96 M106 64 V96" stroke="${shade(c,70)}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M66 148 H134 L142 186 H58 Z" fill="none" stroke="${d}" stroke-width="2"/>
      <rect x="50" y="196" width="100" height="10" fill="${shade(c,-14)}"/>
      <path d="M150 104 V206 H122 Q142 150 136 70 Z" fill="#000" opacity=".08"/>`); },
    jeans(c){ const d = shade(c,-30);
      return svg(`${ground}<path d="M56 28 H144 L152 76 L164 216 H118 L100 92 L82 216 H36 L48 76 Z" fill="${c}" stroke="${d}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M56 28 H144 L145 42 H55 Z" fill="${shade(c,-14)}" stroke="${d}" stroke-width="1.5"/>
      <path d="M100 42 V92" stroke="${d}" stroke-width="1.5"/>
      <path d="M60 44 Q68 68 88 62 M140 44 Q132 68 112 62" fill="none" stroke="${shade(c,60)}" stroke-width="1.5" stroke-dasharray="3 3"/>
      <path d="M118 216 L100 92 L152 76 L164 216 Z" fill="#000" opacity=".07"/>
      <path d="M50 190 H84 M118 190 H156" stroke="${shade(c,40)}" stroke-width="1.5" opacity=".5"/>`); },
    cargo(c){ const d = shade(c,-30);
      return svg(`${ground}<path d="M56 28 H144 L152 76 L164 216 H118 L100 92 L82 216 H36 L48 76 Z" fill="${c}" stroke="${d}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M56 28 H144 L145 42 H55 Z" fill="${shade(c,-14)}" stroke="${d}" stroke-width="1.5"/>
      <path d="M100 42 V92" stroke="${d}" stroke-width="1.5"/>
      <rect x="47" y="118" width="22" height="38" rx="2" fill="${shade(c,-8)}" stroke="${d}" stroke-width="1.5"/>
      <rect x="131" y="118" width="22" height="38" rx="2" fill="${shade(c,-8)}" stroke="${d}" stroke-width="1.5"/>
      <path d="M47 128 H69 M131 128 H153" stroke="${d}" stroke-width="1.5"/>
      <path d="M118 216 L100 92 L152 76 L164 216 Z" fill="#000" opacity=".08"/>`); },
    bomber(c){ const d = shade(c,-28);
      return svg(`${ground}<path d="M66 40 L90 32 H110 L134 40 L172 66 L178 170 L156 172 L148 104 V184 H52 V104 L44 172 L22 170 L28 66 Z" fill="${c}" stroke="${d}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M88 33 Q100 48 112 33 V48 Q100 60 88 48 Z" fill="${shade(c,-14)}" stroke="${d}" stroke-width="1.5"/>
      <rect x="52" y="172" width="96" height="14" fill="${shade(c,-16)}" stroke="${d}" stroke-width="1.5"/>
      <path d="M22 158 L44 162 V173 L22 170 Z M178 158 L156 162 V173 L178 170 Z" fill="${shade(c,-16)}" stroke="${d}" stroke-width="1.5"/>
      <path d="M100 52 V172" stroke="${shade(c,75)}" stroke-width="2" stroke-dasharray="2 3"/>
      <path d="M66 128 H84 M116 128 H134" stroke="${d}" stroke-width="2" stroke-linecap="round"/>
      <path d="M148 104 V184 H120 Q140 140 134 60 Z" fill="#000" opacity=".08"/>`); },
    sneakers(c, accent='#2f5bd8'){ const d = shade(c,-34);
      return svg(`<ellipse cx="106" cy="186" rx="84" ry="8" fill="#000" opacity=".12"/>
      <path d="M30 156 V120 Q30 108 44 108 L80 102 Q92 114 114 118 Q152 122 172 140 Q186 148 186 156 Z" fill="${c}" stroke="${d}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M142 126 Q172 134 186 156 H130 Z" fill="#fff" opacity=".35"/>
      <path d="M30 120 Q30 108 44 108 L52 124 Z" fill="${shade(c,-14)}"/>
      <path d="M56 134 Q92 146 126 138" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>
      <path d="M88 106 L100 116 M98 102 L110 112 M108 100 L120 110" stroke="${d}" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="26" y="154" width="162" height="20" rx="9" fill="#f6f6f4" stroke="#cfcfcb" stroke-width="2"/>
      <path d="M34 164 H180" stroke="#d9d9d4" stroke-width="2" stroke-dasharray="4 5"/>`); },
    cap(c){ const d = shade(c,-30);
      return svg(`${ground}<path d="M44 150 Q44 76 104 76 Q164 76 164 150 Z" fill="${c}" stroke="${d}" stroke-width="2"/>
      <path d="M104 76 V150 M74 84 Q64 116 70 150 M134 84 Q144 116 138 150" fill="none" stroke="${d}" stroke-width="1.5" opacity=".6"/>
      <circle cx="104" cy="76" r="5" fill="${shade(c,-14)}" stroke="${d}" stroke-width="1.5"/>
      <path d="M40 148 H164 Q198 150 194 168 Q150 158 40 160 Z" fill="${shade(c,-16)}" stroke="${d}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M164 150 Q164 100 140 82 Q154 110 148 150 Z" fill="#000" opacity=".08"/>`); }
  };

  /* LCG для стабільного "випадкового" розташування */
  const rng = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  const food = {
    latte(){ return svg(`<circle cx="100" cy="120" r="88" fill="#f4f1ec" stroke="#e0dad0" stroke-width="2"/>
      <path d="M160 100 Q196 100 196 122 Q196 144 160 144" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/>
      <circle cx="100" cy="120" r="64" fill="#fff" stroke="#e4ded4" stroke-width="2"/>
      <circle cx="100" cy="120" r="52" fill="#a86a3c"/><circle cx="100" cy="120" r="46" fill="#b9794a"/>
      <path d="M100 82 Q130 102 100 150 Q70 102 100 82 Z" fill="#f4e4cc"/>
      <path d="M100 92 V140 M100 108 L88 100 M100 108 L112 100 M100 122 L86 114 M100 122 L114 114" stroke="#c18a5c" stroke-width="2" stroke-linecap="round"/>`); },
    croissant(){ let s = '';
      for (let i = -2; i <= 2; i++){
        const t = i * 0.5, x = 100 + 70 * Math.sin(t), y = 150 - 70 * Math.cos(t) + 28;
        const rx = 30 - Math.abs(i) * 4, ry = 40 - Math.abs(i) * 6;
        s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rx}" ry="${ry}" transform="rotate(${(t*57.3).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${i===0?'#e0a04a':'#d6923c'}" stroke="#b36f26" stroke-width="2"/>
        <ellipse cx="${(x-6).toFixed(1)}" cy="${(y-8).toFixed(1)}" rx="${rx-14}" ry="${ry-18}" transform="rotate(${(t*57.3).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="#efbb6b" opacity=".7"/>`;
      }
      return svg(`<ellipse cx="100" cy="196" rx="76" ry="8" fill="#000" opacity=".1"/>${s}`); },
    toast(){ return svg(`<circle cx="100" cy="120" r="88" fill="#f4f2ee" stroke="#e1dcd2" stroke-width="2"/>
      <rect x="42" y="62" width="116" height="116" rx="26" fill="#cf9a55"/><rect x="48" y="68" width="104" height="104" rx="22" fill="#ecd09a"/>
      ${[0,1,2,3,4].map(i=>`<ellipse cx="${72+i*14}" cy="${108+Math.sin(i)*8}" rx="12" ry="26" transform="rotate(${-24+i*12} ${72+i*14} ${108})" fill="#8cae58"/><ellipse cx="${72+i*14}" cy="${108+Math.sin(i)*8}" rx="8" ry="20" transform="rotate(${-24+i*12} ${72+i*14} ${108})" fill="#c6dc8e"/>`).join('')}
      <circle cx="104" cy="138" r="20" fill="#fff" stroke="#eee" stroke-width="2"/><circle cx="104" cy="138" r="10" fill="#f2b21b"/>
      ${[[70,150],[132,96],[86,92],[128,152],[60,118]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="2.2" fill="#c0392b"/>`).join('')}`); },
    burger(){ const sesame = [[70,76],[92,66],[114,70],[132,80],[82,88],[108,86],[124,64]].map(p=>`<ellipse cx="${p[0]}" cy="${p[1]}" rx="4.5" ry="2.4" fill="#f7e5b8" transform="rotate(${p[0]%40-20} ${p[0]} ${p[1]})"/>`).join('');
      return svg(`<ellipse cx="100" cy="196" rx="74" ry="8" fill="#000" opacity=".1"/>
      <path d="M38 104 Q38 46 100 46 Q162 46 162 104 Z" fill="#d6923c" stroke="#b36f26" stroke-width="2"/>
      <path d="M52 90 Q60 60 100 56" fill="none" stroke="#efbb6b" stroke-width="6" stroke-linecap="round" opacity=".6"/>${sesame}
      <path d="M32 106 Q42 122 52 106 T72 106 T92 106 T112 106 T132 106 T152 106 T168 106 V114 H32 Z" fill="#7fb04a"/>
      <circle cx="62" cy="118" r="9" fill="#d94a3a" opacity=".95"/><circle cx="104" cy="119" r="9" fill="#d94a3a" opacity=".95"/><circle cx="142" cy="118" r="9" fill="#d94a3a" opacity=".95"/>
      <path d="M40 116 H160 L150 134 L132 122 L116 136 L100 122 L84 136 L68 122 L50 134 Z" fill="#f4c230"/>
      <rect x="36" y="130" width="128" height="28" rx="14" fill="#6b3b22"/>
      <path d="M44 160 H156 Q156 184 100 184 Q44 184 44 160 Z" fill="#d6923c" stroke="#b36f26" stroke-width="2"/>`); },
    salad(){ const r = rng(7); let leaves = '', bits = '';
      for (let i = 0; i < 26; i++){ const a = r()*6.28, d = r()*52; const x = 100 + Math.cos(a)*d, y = 120 + Math.sin(a)*d;
        leaves += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${16+r()*8|0}" ry="${8+r()*5|0}" transform="rotate(${(r()*180)|0} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${['#7fb04a','#97c45e','#68a03c'][i%3]}" opacity=".95"/>`; }
      for (let i = 0; i < 8; i++){ const a = r()*6.28, d = 10 + r()*44; const x = 100 + Math.cos(a)*d, y = 120 + Math.sin(a)*d;
        bits += i%2 ? `<rect x="${(x-6).toFixed(1)}" y="${(y-6).toFixed(1)}" width="12" height="12" rx="2" transform="rotate(${(r()*90)|0} ${x.toFixed(1)} ${y.toFixed(1)})" fill="#e3bd78"/>` : `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8" fill="#dc4a3b"/>`; }
      return svg(`<circle cx="100" cy="120" r="90" fill="#f1eee8" stroke="#ddd6ca" stroke-width="2"/><circle cx="100" cy="120" r="76" fill="#fbfaf7" stroke="#e8e2d6" stroke-width="2"/>${leaves}${bits}
      <path d="M70 100 q8 -8 16 0 M118 138 q8 -8 16 0 M96 78 q8 -6 14 2" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`); },
    pizza(){ const pep = [[78,92],[122,90],[100,120],[70,138],[130,134],[100,160],[100,84]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="11" fill="#b8352b"/><circle cx="${p[0]-3}" cy="${p[1]-3}" r="3" fill="#d4584a"/>`).join('');
      const basil = [[88,108],[116,106],[84,148],[118,150],[104,98]].map(p=>`<ellipse cx="${p[0]}" cy="${p[1]}" rx="9" ry="5" transform="rotate(${p[0]%90} ${p[0]} ${p[1]})" fill="#4f9a3e"/>`).join('');
      const cuts = [0,1,2,3,4,5].map(i=>`<line x1="100" y1="120" x2="${(100+82*Math.cos(i*Math.PI/3)).toFixed(1)}" y2="${(120+82*Math.sin(i*Math.PI/3)).toFixed(1)}" stroke="#a63a24" stroke-width="1.5" opacity=".5"/>`).join('');
      return svg(`<circle cx="100" cy="120" r="90" fill="#e1a357" stroke="#c78638" stroke-width="2"/><circle cx="100" cy="120" r="76" fill="#c8462e"/><circle cx="100" cy="120" r="72" fill="#f5d27c"/>
      <circle cx="84" cy="102" r="26" fill="#fbe29a" opacity=".8"/><circle cx="124" cy="140" r="30" fill="#fbe29a" opacity=".7"/>${pep}${basil}${cuts}`); },
    cheesecake(){ return svg(`<ellipse cx="100" cy="196" rx="76" ry="8" fill="#000" opacity=".1"/>
      <path d="M30 110 L100 88 L170 110 V176 L100 196 L30 176 Z" fill="#f6e6c6" stroke="#d9c49a" stroke-width="2" stroke-linejoin="round"/>
      <path d="M30 110 L100 88 L170 110 L100 132 Z" fill="#c43d5a" opacity=".95"/>
      <path d="M30 110 L100 132 V196 L30 176 Z" fill="#f2dcb2"/><path d="M30 164 L100 186 L170 164 V176 L100 196 L30 176 Z" fill="#b88a50"/>
      <path d="M62 112 Q76 134 84 122 Q92 140 104 128" fill="none" stroke="#f6a8b8" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="100" cy="108" rx="13" ry="15" fill="#d6283c"/><path d="M92 96 Q100 88 108 96 Q100 100 92 96 Z" fill="#4f9a3e"/>
      ${[[94,104],[104,108],[98,114],[106,102]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="1.3" fill="#f7c7a0"/>`).join('')}`); },
    lemonade(){ return svg(`<ellipse cx="100" cy="220" rx="46" ry="6" fill="#000" opacity=".1"/>
      <path d="M104 18 L118 120" stroke="#e04b6a" stroke-width="6" stroke-linecap="round"/>
      <path d="M62 56 H138 L130 206 Q130 216 120 216 H80 Q70 216 70 206 Z" fill="#fff" fill-opacity=".45" stroke="#cdd6da" stroke-width="2.5"/>
      <path d="M66 90 H134 L130 206 Q130 216 120 216 H80 Q70 216 70 206 Z" fill="#f6e06a"/>
      <rect x="76" y="104" width="26" height="26" rx="5" transform="rotate(-12 89 117)" fill="#fff" opacity=".55"/><rect x="104" y="136" width="26" height="26" rx="5" transform="rotate(14 117 149)" fill="#fff" opacity=".5"/><rect x="82" y="156" width="24" height="24" rx="5" transform="rotate(8 94 168)" fill="#fff" opacity=".45"/>
      <circle cx="138" cy="62" r="24" fill="#f4d23c" stroke="#e1b81e" stroke-width="2"/><circle cx="138" cy="62" r="18" fill="#fbe97c"/>
      <path d="M138 44 V80 M120 62 H156 M125 49 L151 75 M151 49 L125 75" stroke="#f4d23c" stroke-width="1.8"/>
      <ellipse cx="78" cy="58" rx="12" ry="6" transform="rotate(-24 78 58)" fill="#4f9a3e"/><ellipse cx="92" cy="52" rx="11" ry="5" transform="rotate(14 92 52)" fill="#68a03c"/>`); }
  };

  return { product: (kind, color, accent) => (clothes[kind] || food[kind])(color, accent), clothes, food };
})();
