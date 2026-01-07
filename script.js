/**
 * MisterAI NETWORK - Final Production Engine
 * المطور: مصطفى (MisterAI)
 * وظائف: مقالات ساخرة + مختبر المعرفة + جلب أخبار تلقائي
 */

// هذه القيم سيتم حقنها عبر GitHub Secrets
const GEMINI_API_KEY = "YOUR_GEMINI_KEY";
const NEWS_API_KEY = "YOUR_NEWS_KEY";

/**
 * 1. محرك استحضار المقال الساخر (تخريفة المستر)
 * مصمم لتفادي الأخطاء البرمجية وضمان استمرارية العرض
 */
async function generateMisterAISatire() {
    const responseArea = document.getElementById('ai-response-area');
    if (!responseArea) return;

    // واجهة التحميل الذكية
    responseArea.innerHTML = `
        <div class="p-16 border border-cyan-500/20 rounded-[3rem] bg-black/40 text-center animate-pulse">
            <div class="inline-block h-10 w-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p class="text-cyan-400 font-black text-[10px] tracking-[0.4em] uppercase">جاري استنطاق الواقع وتوليد الحكمة...</p>
        </div>`;

    // مواضيع احتياطية في حال فشل جلب الأخبار العالمية
    let eventsContext = "فلسفة الهدوء الرقمي، حال الشباب مع التكنولوجيا، عبق القهوة المرة في شوارع الجزائر العاصمة";

    try {
        // محاولة جلب الأخبار - نستخدم محول (Try/Catch) داخلي لضمان عدم توقف السكريبت
        try {
            const newsRes = await fetch(`https://newsapi.org/v2/top-headlines?country=dz&pageSize=5&apiKey=${NEWS_API_KEY}`);
            if (newsRes.ok) {
                const newsData = await newsRes.json();
                if (newsData.articles && newsData.articles.length > 0) {
                    eventsContext = newsData.articles.map(n => n.title).join(" | ");
                }
            }
        } catch (newsErr) {
            console.log("NewsAPI restricted - Switching to AI imagination mode.");
        }

        // استدعاء Gemini AI لتوليد المقال (المحرك الرئيسي)
        const aiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        const aiResponse = await fetch(aiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `أنت MisterAI، مواطن جزائري فيلسوف ساخر. اكتب مقالاً عميقاً ساخراً (بدون عناوين) بالدارجة الجزائرية الممزوجة بالعربية عن هذه الأحداث أو المواضيع: ${eventsContext}. ابدأ بعبارة قوية تعكس حالتك النفسية كفيلسوف يراقب العالم.`
                    }]
                }]
            })
        });

        const aiData = await aiResponse.json();
        const articleContent = aiData.candidates[0].content.parts[0].text;

        // عرض المقال في الواجهة
        responseArea.innerHTML = `
            <div class="cyber-card p-10 md:p-16 rounded-[4rem] bg-gradient-to-b from-[#0f172a] to-black border-t-2 border-cyan-500/30 shadow-2xl animate-in fade-in zoom-in duration-700">
                <div class="flex justify-between items-center mb-10 opacity-40">
                    <i class="fas fa-quote-right text-4xl text-cyan-500"></i>
                    <span class="text-[9px] font-black text-gray-500 uppercase tracking-[0.5em]">MisterAI_Satire_Engine</span>
                </div>
                <div class="text-gray-100 text-xl md:text-2xl leading-[2.2] text-right font-medium italic" style="font-family: 'Cairo', sans-serif;">
                    ${articleContent.replace(/\n/g, '<br>')}
                </div>
                <div class="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p class="text-[10px] text-gray-600 uppercase tracking-widest">تحليل لحظي عبر سحابة Gemini</p>
                    <button onclick="generateMisterAISatire()" class="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 px-6 py-2 rounded-full text-[10px] font-black transition-all border border-cyan-500/30">
                        استحضار مقال آخر ↻
                    </button>
                </div>
            </div>`;

    } catch (globalErr) {
        console.error(globalErr);
        responseArea.innerHTML = `
            <div class="p-12 border border-red-500/20 rounded-[3rem] text-center bg-red-500/5">
                <i class="fas fa-bolt text-red-500 mb-4 text-2xl"></i>
                <p class="text-gray-400 text-sm italic">"يا مصطفى، كاين خلل في الرادارات.. تأكد من مفتاح الـ API في الـ Secrets وعاود جرب."</p>
                <button onclick="generateMisterAISatire()" class="mt-6 text-cyan-400 underline text-xs font-bold">إعادة المحاولة الآن</button>
            </div>`;
    }
}

/**
 * 2. جلب محتوى مختبر البرمجة (Dev.to API)
 */
async function fetchLabKnowledge() {
    const labContainer = document.getElementById('lab-items');
    if (!labContainer) return;

    try {
        const res = await fetch('https://dev.to/api/articles?tag=coding&per_page=4');
        const data = await res.json();
        labContainer.innerHTML = data.map(art => `
            <div class="bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-cyan-500/40 transition-all group cursor-pointer">
                <div class="flex justify-between items-start mb-2">
                    <h5 class="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors leading-tight">${art.title}</h5>
                    <i class="fas fa-terminal text-[10px] text-gray-700"></i>
                </div>
                <a href="${art.url}" target="_blank" class="text-[9px] text-gray-600 uppercase font-black hover:text-white transition-all">Explore_Source →</a>
            </div>
        `).join('');
    } catch (e) {
        console.log("Lab Fetch Error");
    }
}

/**
 * 3. تحديث نبض الجزائر (أخبار جانبية)
 */
async function updateAlgeriaPulse() {
    const container = document.getElementById('algeria-trending');
    if (!container) return;

    try {
        const res = await fetch(`https://newsapi.org/v2/top-headlines?country=dz&pageSize=6&apiKey=${NEWS_API_KEY}`);
        const data = await res.json();
        if (data.articles) {
            container.innerHTML = data.articles.map(a => `
                <div class="group border-b border-white/5 pb-3 mb-3">
                    <a href="${a.url}" target="_blank" class="text-gray-400 text-[11px] hover:text-orange-400 transition-all block leading-relaxed line-clamp-2">
                        ${a.title}
                    </a>
                </div>
            `).join('');
        }
    } catch (e) {
        container.innerHTML = '<p class="text-[10px] text-gray-700">النبض متوقف مؤقتاً..</p>';
    }
}

/**
 * تشغيل المحركات عند فتح الصفحة
 */
document.addEventListener('DOMContentLoaded', () => {
    fetchLabKnowledge();
    updateAlgeriaPulse();
    // اختياري: تشغيل المقال الساخر تلقائياً عند الدخول
    // generateMisterAISatire(); 
});
