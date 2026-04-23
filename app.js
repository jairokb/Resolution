function updateResolution() {
    // Screen Dimensions
    const screenW = window.screen.width;
    const screenH = window.screen.height;
    
    // Device Pixel Ratio
    const dpr = window.devicePixelRatio || 1;
    
    // Physical Resolution (Real pixels)
    const physicalW = Math.round(screenW * dpr);
    const physicalH = Math.round(screenH * dpr);
    
    // Inner Resolution (Available space minus taskbars)
    const innerW = window.screen.availWidth;
    const innerH = window.screen.availHeight;
    
    // Viewport
    const viewW = window.innerWidth;
    const viewH = window.innerHeight;
    
    // Aspect Ratio calculation
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const commonDivisor = gcd(screenW, screenH);
    const aspectW = screenW / commonDivisor;
    const aspectH = screenH / commonDivisor;

    // Update Dom
    const swEl = document.getElementById('screenWidth');
    const shEl = document.getElementById('screenHeight');
    if (swEl) swEl.textContent = screenW;
    if (shEl) shEl.textContent = screenH;

    const deviceResEl = document.getElementById('deviceRes');
    if (deviceResEl) deviceResEl.textContent = `${physicalW} x ${physicalH}`;

    const innerResEl = document.getElementById('innerRes');
    if (innerResEl) innerResEl.textContent = `${innerW} x ${innerH}`;

    const dprEl = document.getElementById('dpr');
    if (dprEl) dprEl.textContent = dpr.toFixed(2);

    const colorDepthEl = document.getElementById('colorDepth');
    if (colorDepthEl) colorDepthEl.textContent = window.screen.colorDepth + ' bits';

    const viewWEl = document.getElementById('viewW');
    if (viewWEl) viewWEl.textContent = viewW + ' px';

    const viewHEl = document.getElementById('viewH');
    if (viewHEl) viewHEl.textContent = viewH + ' px';

    const aspectRatioEl = document.getElementById('aspectRatio');
    if (aspectRatioEl) aspectRatioEl.textContent = `${aspectW}:${aspectH}`;

    const finalResEl = document.getElementById('finalRes');
    if (finalResEl) finalResEl.textContent = `${screenW} x ${screenH}`;
}

function copyToClipboard() {
    const screenW = window.screen.width;
    const screenH = window.screen.height;
    const text = `Minha resolução de tela é: ${screenW} x ${screenH}`;
    
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.className = "copy-toast show";
            setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
        }
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
    });
}

// Update on load (using DOMContentLoaded for faster response)
document.addEventListener('DOMContentLoaded', () => {
    updateResolution();
    
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyToClipboard);
    }
});

// Update on resize
window.addEventListener('resize', updateResolution);

// Initial call (safety)
updateResolution();

