/**
 * MisterAI NETWORK - Final Production Engine
 * المطور: مصطفى (MisterAI)
 */

// الكلمات المحجوزة للحقن عبر GitHub Secrets
const GEMINI_API_KEY = "AIzaSyA5qHJc8biq7cHu8TT6qN9PX7Ebo8x6d8M";
const NEWS_API_KEY = "0344c21aec74406f8e16b820a638acfc";

/**
 * 1. استحضار المقال الساخر (تخريفة المستر)
 */
async function generateMisterAISatire() {
    const responseArea = document.getElementById('ai-response-area');
    if (!responseArea) return;

    responseArea.innerHTML = `
        <div class="p-16 border border-cyan-500/10 rounded-[3rem] bg-black/40 text-center animate-pulse">
            <div class="inline-block h-8 w-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p class="text-gray-500 font-bold text-[10px] tracking-[0.4em] uppercase">جاري استحضار الفكرة...</p>
        </div>`;

    let eventsContext = "هدوء المساء، فلسفة الوقت، والبحث عن الجوهر في عالم رقمي متسارع";

    try {
        try {
            const newsRes = await fetch(`https://newsapi.org/v2/top-headlines?country=dz&pageSize=5&apiKey=${NEWS_API_KEY}`);
            if (newsRes.ok) {
                const newsData = await newsRes.json();
                if (newsData.articles && newsData.articles.length > 0) {
                    eventsContext = newsData.articles.map(n => n.title).join(" | ");
                }
            }
        } catch (e) { console.log("Status: Background context utilized."); }

        const aiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        const aiResponse = await fetch(aiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `أنت MisterAI، فيلسوف جزائري ساخر. اكتب مقالاً ساخراً وعميقاً بالدارجة الجزائرية عن: ${eventsContext}. ابدأ مباشرة بأسلوبك الخاص.`
                    }]
                }]
            })
        });

        const aiData = await aiResponse.json();
        const articleContent = aiData.candidates[0].content.parts[0].text;

        responseArea.innerHTML = `
            <div class="cyber-card p-10 md:p-16 rounded-[4rem] bg-gradient-to-b from-[#0f172a] to-black border-t border-white/5 shadow-2xl animate-in fade-in duration-1000">
                <div class="flex justify-between items-center mb-10 opacity-30">
                    <i class="fas fa-feather-alt text-2xl"></i>
                    <span class="text-[8px] font-black uppercase tracking-[0.5em]">MisterAI_Thought</span>
                </div>
                <div class="text-gray-200 text-xl md:text-2xl leading-[2.2] text-right font-medium italic">
                    ${articleContent.replace(/\n/g, '<br>')}
                </div>
                <div class="mt-12 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-700">
                    <button onclick="generateMisterAISatire()" class="hover:text-cyan-500 transition-all font-black uppercase">تأمل آخر ↻</button>
                    <p class="uppercase tracking-widest">Verified_Intelligence</p>
                </div>
            </div>`;

    } catch (err) {
        console.error("Internal Log:", err);
        responseArea.innerHTML = `
            <div class="p-16 border border-white/5 rounded-[3rem] text-center bg-black/10">
                <p class="text-gray-600 text-lg italic italic">"يبدو أن المستر في لحظة صمت فلسفية عميقة.. السحابة الرقمية تمر بهدوء."</p>
                <button onclick="generateMisterAISatire()" class="mt-8 text-[9px] text-gray-700 hover:text-cyan-600 transition-all uppercase tracking-[0.3em]">إعادة المحاولة</button>
            </div>`;
    }
}

async function fetchLabKnowledge() {
    const labContainer = document.getElementById('lab-items');
    if (!labContainer) return;
    try {
        const res = await fetch('https://dev.to/api/articles?tag=programming&per_page=4');
        const data = await res.json();
        labContainer.innerHTML = data.map(art => `
            <div class="bg-black/30 border border-white/5 p-6 rounded-2xl hover:border-cyan-900 transition-all">
                <h5 class="text-gray-300 font-bold text-sm mb-2">${art.title}</h5>
                <a href="${art.url}" target="_blank" class="text-[9px] text-gray-600 uppercase hover:text-cyan-500">Read_Doc →</a>
            </div>`).join('');
    } catch (e) { console.log("Lab: Offline"); }
}

async function updateAlgeriaPulse() {
    const container = document.getElementById('algeria-trending');
    if (!container) return;
    try {
        const res = await fetch(`https://newsapi.org/v2/top-headlines?country=dz&pageSize=6&apiKey=${NEWS_API_KEY}`);
        const data = await res.json();
        if (data.articles) {
            container.innerHTML = data.articles.map(a => `
                <div class="border-b border-white/5 pb-3 mb-3">
                    <a href="${a.url}" target="_blank" class="text-gray-500 text-[11px] hover:text-white transition-all block leading-relaxed line-clamp-2">${a.title}</a>
                </div>`).join('');
        }
    } catch (e) { console.log("Pulse: Low"); }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchLabKnowledge();
    updateAlgeriaPulse();
});
