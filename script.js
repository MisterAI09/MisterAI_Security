/**
 * MisterAI NETWORK - Unified Intelligence System
 * المطور: مصطفى (MisterAI)
 */

// الكلمات المحجوزة للحقن عبر GitHub Secrets أو Vercel
const GEMINI_API_KEY = "AIzaSyA5qHJc8biq7cHu8TT6qN9PX7Ebo8x6d8M";
const NEWS_API_KEY = "0344c21aec74406f8e16b820a638acfc";

/**
 * 1. محرك جلب الأخبار (تعديل مصطفى الأخير)
 */
async function fetchFeed(file, containerId, isTrend) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
        const response = await fetch(`./${file}?v=` + Date.now());
        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            if(!isTrend) container.innerHTML = '<p class="text-center col-span-full py-20 text-gray-600 font-black tracking-widest uppercase">Global_Feed_Empty</p>';
            return;
        }

        container.innerHTML = '';
        data.articles.forEach(article => {
            if(isTrend) {
                container.innerHTML += `
                    <div class="border-b border-white/5 pb-2 hover:bg-orange-500/5 p-2 transition-all">
                        <a href="${article.url}" target="_blank" class="text-gray-400 hover:text-orange-400 block text-[11px] leading-relaxed">${article.title}</a>
                    </div>`;
            } else {
                container.innerHTML += `
                    <div class="bg-black/40 border border-cyan-500/10 p-6 rounded-xl flex flex-col h-full group transition-all hover:border-cyan-500/40">
                        <h4 class="font-bold text-sm mb-4 text-right group-hover:text-cyan-400 transition-colors leading-relaxed">${article.title}</h4>
                        <a href="${article.url}" target="_blank" class="mt-auto text-center text-[10px] font-black text-black bg-cyan-400 py-2 rounded uppercase hover:bg-white transition-all shadow-lg shadow-cyan-500/20">Open_Source</a>
                    </div>`;
            }
        });
    } catch (e) { 
        console.error("Link Broken: " + file); 
    }
}

/**
 * 2. محرك المقالات الساخرة (MisterAI Satire Engine)
 */
async function generateMisterAISatire() {
    const responseArea = document.getElementById('ai-response-area');
    if (!responseArea) return;

    // تأثير الانتظار الفلسفي
    responseArea.innerHTML = `
        <div class="p-16 border border-cyan-500/10 rounded-[3rem] bg-black/40 text-center animate-pulse">
            <div class="inline-block h-8 w-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p class="text-gray-500 font-bold text-[10px] tracking-[0.4em] uppercase">Inhaling_Reality...</p>
        </div>`;

    try {
        const aiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        const aiResponse = await fetch(aiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: "أنت فيلسوف جزائري ساخر. اكتب مقالاً قصيراً وعميقاً بالدارجة الجزائرية عن صراع الإنسان مع التكنولوجيا والبحث عن راحة البال. ابدأ بعبارة قوية."
                    }]
                }]
            })
        });

        const aiData = await aiResponse.json();
        const articleContent = aiData.candidates[0].content.parts[0].text;

        responseArea.innerHTML = `
            <div class="cyber-card p-10 md:p-16 rounded-[4rem] bg-gradient-to-b from-[#0f172a] to-black border-t border-white/5 shadow-2xl animate-in fade-in zoom-in duration-700">
                <div class="flex justify-between items-center mb-10 opacity-30">
                    <i class="fas fa-feather-alt text-2xl text-cyan-500"></i>
                    <span class="text-[8px] font-black uppercase tracking-[0.5em]">MisterAI_Thought</span>
                </div>
                <div class="text-gray-200 text-xl md:text-2xl leading-[2.2] text-right font-medium italic">
                    ${articleContent.replace(/\n/g, '<br>')}
                </div>
                <div class="mt-12 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-700">
                    <button onclick="generateMisterAISatire()" class="hover:text-cyan-500 transition-all font-black uppercase">تأمل آخر ↻</button>
                    <p class="uppercase tracking-widest">Logic_Verified</p>
                </div>
            </div>`;

    } catch (err) {
        responseArea.innerHTML = `
            <div class="p-16 border border-white/5 rounded-[3rem] text-center bg-black/10">
                <p class="text-gray-600 text-lg italic italic">"يبدو أن المستر في لحظة صمت فلسفية عميقة.. السحابة الرقمية تمر بهدوء."</p>
                <button onclick="generateMisterAISatire()" class="mt-8 text-[9px] text-gray-700 hover:text-cyan-600 transition-all uppercase tracking-[0.3em]">إعادة المحاولة</button>
            </div>`;
    }
}

/**
 * 3. تشغيل النظام عند التحميل
 */
document.addEventListener('DOMContentLoaded', () => {
    // جلب الأخبار كما طلبت في تعديلك
    fetchFeed('news.json', 'news-container', false);
    fetchFeed('algeria_news.json', 'algeria-trending', true);
});
