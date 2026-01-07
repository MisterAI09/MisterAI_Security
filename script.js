/**
 * MisterAI NETWORK - Final Logic Engine
 * المطور: مصطفى (MisterAI)
 */

// هذه الكلمات سيتم استبدالها تلقائياً عبر GitHub Secrets
const GEMINI_API_KEY = "AIzaSyA5qHJc8biq7cHu8TT6qN9PX7Ebo8x6d8M";
const NEWS_API_KEY = "0344c21aec74406f8e16b820a638acfc";

/**
 * 1. استحضار المقال الساخر (تخريفة المستر)
 */
async function generateMisterAISatire() {
    const responseArea = document.getElementById('ai-response-area');
    if (!responseArea) return;

    // تأثير الانتظار الاحترافي
    responseArea.innerHTML = `
        <div class="p-16 border border-cyan-500/20 rounded-[3rem] bg-black/40 text-center">
            <div class="inline-block animate-spin h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full mb-4"></div>
            <p class="text-cyan-400 font-black text-xs uppercase tracking-[0.4em] animate-pulse">جاري استنطاق الواقع وتحويله لسخرية...</p>
        </div>`;

    try {
        // جلب الأخبار (عالمية + جزائرية)
        const newsRes = await fetch(`https://newsapi.org/v2/top-headlines?language=ar&country=dz&pageSize=5&apiKey=${NEWS_API_KEY}`);
        const newsData = await newsRes.json();
        
        // إذا فشل جلب الأخبار، نستخدم مواضيع افتراضية لكي لا يتوقف "المستر" عن الكلام
        const events = (newsData.articles && newsData.articles.length > 0) 
            ? newsData.articles.map(n => n.title).join(" | ")
            : "ارتفاع درجات الحرارة، ضجيج السوشيال ميديا، وفلسفة القهوة المرة";

        // استدعاء Gemini AI لتحويل الخبر إلى مقال ساخر
        const aiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        const aiRes = await fetch(aiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `أنت MisterAI، مواطن جزائري فيلسوف ساخر. اكتب مقالاً عميقاً ساخراً (بدون عناوين) بالدارجة الجزائرية الممزوجة بالعربية عن هذه الأحداث: ${events}. اجعل الكلام يلمس القلب ويضحك في نفس الوقت. ابدأ بعبارة تعكس حالتك الآن.`
                    }]
                }]
            })
        });

        const aiData = await aiRes.json();
        const articleText = aiData.candidates[0].content.parts[0].text;

        // عرض المقال بتنسيق فني
        responseArea.innerHTML = `
            <div class="cyber-card p-10 md:p-16 rounded-[4rem] bg-gradient-to-b from-[#0f172a] to-black border-t-2 border-cyan-500/30 shadow-2xl animate-in slide-in-from-bottom duration-1000">
                <div class="flex justify-between items-center mb-8 opacity-40">
                    <i class="fas fa-quote-right text-3xl text-cyan-500"></i>
                    <span class="text-[9px] font-black text-gray-500 uppercase tracking-widest">MisterAI_Satirical_Vault</span>
                </div>
                <div class="text-gray-100 text-xl md:text-2xl leading-[2] text-right font-medium italic" style="font-family: 'Cairo', sans-serif;">
                    ${articleText.replace(/\n/g, '<br>')}
                </div>
                <div class="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-[10px] text-gray-600 uppercase">تم التحليل بواسطة ذكاء المستر الخاص</p>
                    <div class="flex gap-4">
                         <button onclick="generateMisterAISatire()" class="text-cyan-400 text-xs font-black uppercase hover:text-white transition-all">مقال آخر ↻</button>
                    </div>
                </div>
            </div>`;

    } catch (e) {
        console.error(e);
        responseArea.innerHTML = `
            <div class="p-12 border border-red-500/20 rounded-[3rem] text-center bg-red-500/5">
                <i class="fas fa-exclamation-triangle text-red-500 mb-4"></i>
                <p class="text-gray-400 text-sm italic">"المستر راهو ديبريمي وصابو الذهول، عاود جرب شوية ثانية يا مصطفى.."</p>
                <button onclick="generateMisterAISatire()" class="mt-4 text-cyan-500 underline text-xs">إعادة المحاولة</button>
            </div>`;
    }
}

/**
 * 2. جلب مختبر المعرفة (دروس البرمجة)
 */
async function fetchLabContent() {
    const labContainer = document.getElementById('lab-items');
    if (!labContainer) return;

    try {
        const res = await fetch('https://dev.to/api/articles?tag=programming&per_page=4');
        const data = await res.json();
        labContainer.innerHTML = data.map(art => `
            <div class="bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-cyan-500/30 transition-all group">
                <h5 class="text-white font-bold text-sm mb-2 group-hover:text-cyan-400 transition-colors">${art.title}</h5>
                <a href="${art.url}" target="_blank" class="text-[10px] text-gray-500 uppercase hover:text-white transition-all">Decode_Logic →</a>
            </div>
        `).join('');
    } catch (e) { console.log("Lab Error"); }
}

/**
 * 3. تشغيل النظام عند التحميل
 */
document.addEventListener('DOMContentLoaded', () => {
    fetchLabContent();
    // جلب أخبار الجزائر الجانبية
    fetch(`https://newsapi.org/v2/top-headlines?country=dz&pageSize=8&apiKey=${NEWS_API_KEY}`)
        .then(r => r.json())
        .then(data => {
            const container = document.getElementById('algeria-trending');
            if(container) {
                container.innerHTML = data.articles.map(a => `
                    <div class="border-b border-white/5 pb-2">
                        <a href="${a.url}" target="_blank" class="text-gray-400 hover:text-orange-400 transition-colors block leading-snug">${a.title}</a>
                    </div>
                `).join('');
            }
        }).catch(e => console.log("News Error"));
});
