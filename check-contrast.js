import contrast from 'wcag-contrast';

const textColors = ['#f8fafc', '#cbd5e1', '#94a3b8', '#64748b', '#ffffff'];
const bgColors = ['#1e293b', '#334155', '#475569'];

console.log('Vérification du contraste (niveau AA, texte normal) :');
textColors.forEach(text => {
  bgColors.forEach(bg => {
    const ratio = contrast.hex(text, bg).toFixed(2);
    const isAA = ratio >= 4.5;
    console.log(`Texte ${text} sur fond ${bg} : ratio ${ratio} - AA : ${isAA ? 'OK' : 'NOK'}`);
  });
});
