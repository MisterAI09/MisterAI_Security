/**
 * MisterAI NETWORK - Final Production Engine
 * المطور: مصطفى (MisterAI)
 */

const GEMINI_API_KEY = "AIzaSyA5qHJc8biq7cHu8TT6qN9PX7Ebo8x6d8M";
const NEWS_API_KEY = "0344c21aec74406f8e16b820a638acfc";

/**
 * 1. وظيفة جلب الأخبار وتحديث الواجهة (تعديلك الأخير)
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
                        <a href="${article.url}" target="_blank" class="text-gray-400 hover:text-orange-400 block">${article.title}</a>
                    </div>`;
            } else {
                container.innerHTML += `
                    <div class="bg-black/40 border border-cyan-500/10 p-6 rounded-xl flex flex-col h-full group">
                        <h4 class="font-bold text-sm mb-4 text-right group-hover:text-cyan-400 transition-colors">${article.title}</h4>
                        <a href="${article.url}" target="_blank" class="mt-auto text-center text-[10px] font-black text-black bg-cyan-400 py-2 rounded uppercase hover:bg-white transition-all shadow-lg shadow-cyan-500/20">Open_Source</a>
                    </div>`;
            }
        });
    } catch (e) { 
        console.error("Link Broken: " + file); 
    }
}

/**
 * 2. وظيفة المقالات الساخرة (محرك المستر)
 */
async function generateMisterAISatire() {
    const responseArea = document.getElementById('ai-response-area');
    if (!responseArea) return;

    responseArea.innerHTML = `<p class="text-cyan-400 animate-pulse text-center py-20 font-black uppercase tracking-widest text-[10px]">Inhaling_Reality...</p>`;

    try {
        const aiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        const aiResponse = await fetch(aiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "تحدث كفيلسوف جزائري ساخر بلهجة دارجة عميقة عن حال التكنولوجيا اليوم. لا تستخدم مقدمات." }] }]
            })
        });

        const aiData = await aiResponse.json();
        const articleContent = aiData.candidates[0].content.parts[0].text;

        responseArea.innerHTML = `
            <div class="cyber-card p-10 md:p-16 rounded-[4rem] bg-gradient-to-b from-[#0f172a] to-black border-t border-white/5 shadow-2xl animate-in fade-in duration-1000">
                <div class="text-gray-200 text-xl md:text-2xl leading-[2.2] text-right font-medium italic">${articleContent.replace(/\n/g, '<br>')}</div>
            </div>`;
    } catch (err) {
        responseArea.innerHTML = `<p class="text-gray-600 text-center py-10 italic">"المستر في لحظة تأمل.. حاول لاحقاً."</p>`;
    }
}

/**
 * تشغيل المحرك
 */
document.addEventListener('DOMContentLoaded', () => {
    fetchFeed('news.json', 'news-container', false);
    fetchFeed('algeria_news.json', 'algeria-trending', true);
});
