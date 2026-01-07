/**
 * MisterAI NETWORK - Unified Intelligence System
 * المطور: مصطفى (MisterAI)
 * الأهداف: جلب الأخبار + مختبر البرمجة + المقال الساخر + البحث الذكي
 */

// هذه الكلمات سيتم استبدالها تلقائياً عبر GitHub Actions
const GEMINI_API_KEY = "YOUR_GEMINI_KEY";
const NEWS_API_KEY = "YOUR_NEWS_KEY";

/**
 * 1. محرك المقال الساخر (تخريفة المستر)
 */
async function generateMisterAISatire() {
    const responseArea = document.getElementById('ai-response-area');
    if (!responseArea) return;

    responseArea.innerHTML = `
        <div class="p-8 border border-cyan-500/20 rounded-[2rem] bg-black/40 text-center animate-pulse">
            <div class="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-cyan-400 font-black text-[10px] tracking-widest uppercase">جاري عصر الأخبار واستحضار السخرية...</p>
        </div>`;

    try {
        // جلب آخر الأخبار لتقديمها لـ Gemini
        const newsRes = await fetch(`https://newsapi.org/v2/top-headlines?language=ar&pageSize=5&apiKey=${NEWS_API_KEY}`);
        const newsData = await newsRes.json();
        const events = newsData.articles.map(a => a.title).join(" | ");

        // استدعاء Gemini AI
        const aiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        const aiRes = await fetch(aiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `أنت MisterAI، مواطن جزائري حكيم وساخر. اكتب مقالاً فلسفياً ساخراً (بدون عناوين) بالدارجة الجزائرية الممزوجة بالعربية عن هذه الأحداث: ${events}. ركز على فلسفة الصبر والهدوء الرقمي.`
                    }]
                }]
            })
        });

        const aiData = await aiRes.json();
        const articleText = aiData.candidates[0].content.parts[0].text;

        // عرض النتيجة
        responseArea.innerHTML = `
            <div class="cyber-card p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-[#0f172a] to-black border-r-8 border-green-500 shadow-2xl animate-in zoom-in duration-700">
                <div class="flex items-center justify-between mb-6 opacity-50">
                    <span class="text-[9px] font-black text-cyan-500 uppercase tracking-[0.4em]">MisterAI_Intelligence_Satire</span>
                    <i class="fas fa-quote-left text-2xl text-green-500"></i>
                </div>
                <div class="text-gray-100 text-lg md:text-xl leading-[1.8] text-right italic font-medium">
                    ${articleText.replace(/\n/g, '<br>')}
                </div>
                <div class="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                    <button onclick="generateMisterAISatire()" class="text-[10px] font-black text-cyan-400 hover:text-white transition-all uppercase">تحديث التحليل ↻</button>
                    <p class="text-[8px] text-gray-600 uppercase tracking-widest">Secure_Engine_Verified</p>
                </div>
            </div>`;
    } catch (e) {
        responseArea.innerHTML = `<p class="text-red-500 text-xs text-center py-10">المستر راهو 'ديبريمي' حالياً، عاود جرب شوية ثانية...</p>`;
    }
}

/**
 * 2. محرك البحث الذكي (محلي + خارجي)
 */
async function askMisterAI() {
    const query = document.getElementById('ai-search-input').value.trim().toLowerCase();
    const responseArea = document.getElementById('ai-response-area');
    if (!query) return;

    responseArea.innerHTML = '<p class="text-cyan-400 animate-pulse text-center py-4">جاري البحث في الرادارات الرقمية...</p>';

    try {
        const searchPromises = [
            fetch(`./algeria_news.json?v=${Date.now()}`).then(r => r.json()).catch(() => ({articles: []})),
            fetch(`https://dev.to/api/articles?tag=${query}&per_page=3`).then(r => r.json()).catch(() => [])
        ];

        const [localData, globalData] = await Promise.all(searchPromises);
        let results = [];

        // دمج النتائج
        if (localData.articles) {
            results.push(...localData.articles.filter(a => a.title.toLowerCase().includes(query)).map(a => ({...a, source: "INTERNAL"})));
        }
        if (Array.isArray(globalData)) {
            results.push(...globalData.map(a => ({title: a.title, url: a.url, source: "GLOBAL_LAB"})));
        }

        if (results.length > 0) {
            responseArea.innerHTML = '<div class="grid gap-4 mt-4"></div>';
            const grid = responseArea.querySelector('div');
            results.slice(0, 3).forEach(res => {
                grid.innerHTML += `
                    <div class="bg-black/60 border-l-4 border-cyan-500 p-4 rounded-r-xl">
                        <span class="text-[8px] text-cyan-500 font-black uppercase">${res.source}</span>
                        <h4 class="text-white font-bold text-sm my-1">${res.title}</h4>
                        <a href="${res.url}" target="_blank" class="text-gray-400 text-[10px] hover:text-cyan-400 tracking-tighter">VERIFY_SOURCE_LINK →</a>
                    </div>`;
            });
        } else {
            responseArea.innerHTML = '<p class="text-gray-500 text-xs text-center">لا توجد نتائج، جرب كلمة "برمجة" أو "الجزائر".</p>';
        }
    } catch (e) { console.error(e); }
}

/**
 * 3. تشغيل النظام
 */
document.addEventListener('DOMContentLoaded', () => {
    // جلب أخبار الجزائر في القسم الجانبي (إذا وجد)
    if(document.getElementById('algeria-trending')) {
        fetch(`./algeria_news.json?v=${Date.now()}`)
            .then(r => r.json())
            .then(data => {
                const container = document.getElementById('algeria-trending');
                container.innerHTML = data.articles.map(a => `
                    <a href="${a.url}" target="_blank" class="block p-2 border-b border-white/5 text-[11px] text-gray-400 hover:text-orange-400 transition-colors">${a.title}</a>
                `).join('');
            }).catch(e => console.log("Local news not found"));
    }
});
