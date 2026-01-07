/**
 * MisterAI NETWORK - Smart Logic Engine
 * وظائف البحث، جلب الشروحات، وفهم الآلة
 */

// 1. محرك البحث والتحقق الاستنتاجي
async function askMisterAI() {
    const query = document.getElementById('ai-search-input').value.toLowerCase();
    const responseArea = document.getElementById('ai-response-area');
    
    if (!query) return;

    responseArea.innerHTML = '<div class="text-cyan-400 animate-pulse text-sm">جاري تحليل البيانات في قارة الهدوء...</div>';

    try {
        // فحص الملفات المحلية أولاً للسرعة والأمان
        const response = await fetch('./algeria_news.json?v=' + Date.now());
        const data = await response.json();
        const article = data.articles.find(a => a.title.toLowerCase().includes(query));

        if (article) {
            responseArea.innerHTML = `
                <div class="bg-green-500/10 border border-green-500/30 p-6 rounded-2xl animate-in slide-in-from-bottom duration-500">
                    <span class="text-[9px] bg-green-500 text-black font-black px-2 py-0.5 rounded">مصدر مؤكد</span>
                    <h4 class="text-white font-bold my-2 text-lg">${article.title}</h4>
                    <p class="text-gray-400 text-xs mb-4 italic">"عزيزي الزائر، قمت بجلب هذا الخبر من أجلك. يرجى زيارة المصدر للتأكد."</p>
                    <a href="${article.url}" target="_blank" class="inline-block bg-white text-black text-[10px] font-black px-6 py-2 rounded-lg hover:bg-cyan-400">تحقق من المصدر بنفسك</a>
                </div>`;
        } else {
            responseArea.innerHTML = '<p class="text-gray-500 text-xs">لم أجد نتائج مطابقة تماماً في ذاكرتي المحلية. جرب كلمات أخرى.</p>';
        }
    } catch (e) {
        responseArea.innerHTML = '<p class="text-red-500 text-xs">خطأ في الاتصال بالقاعدة.</p>';
    }
}

// 2. جلب شروحات البرمجة (مختبر فهم الآلة) آلياً
async function fetchLearningContent() {
    const labContainer = document.getElementById('lab-items');
    if (!labContainer) return;

    try {
        // جلب مقالات حقيقية من منصة DEV العالمية
        const res = await fetch('https://dev.to/api/articles?tag=programming&per_page=4');
        const articles = await res.json();

        labContainer.innerHTML = '';
        articles.forEach(art => {
            labContainer.innerHTML += `
                <div class="bg-black/40 border border-white/5 p-6 rounded-3xl hover:border-cyan-500/40 transition-all">
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-[9px] text-cyan-400 font-bold tracking-tighter uppercase">Machine_DNA</span>
                        <i class="fas fa-code text-xs text-gray-600"></i>
                    </div>
                    <h5 class="text-white font-bold text-sm mb-3">${art.title}</h5>
                    <p class="text-gray-500 text-[10px] mb-4 leading-relaxed">البرمجة ليست مجرد كتابة كود، هي لغتك لبناء وطنك الرقمي المستقل.</p>
                    <a href="${art.url}" target="_blank" class="text-cyan-500 text-[10px] font-black hover:underline uppercase">Decode_Logic →</a>
                </div>`;
        });
    } catch (e) {
        console.log("Learning Content Fetch Failed");
    }
}

// 3. جلب الأخبار المحلية (الترند)
async function fetchAlgeriaNews() {
    const container = document.getElementById('algeria-trending');
    try {
        const res = await fetch('./algeria_news.json?v=' + Date.now());
        const data = await res.json();
        container.innerHTML = '';
        data.articles.forEach(art => {
            container.innerHTML += `
                <a href="${art.url}" target="_blank" class="block p-3 bg-white/5 rounded-xl border border-white/5 hover:border-orange-500/30 transition-all">
                    <p class="text-gray-400 text-[11px] font-bold">${art.title}</p>
                </a>`;
        });
    } catch (e) { console.log("News Error"); }
}

// تشغيل الوظائف
document.addEventListener('DOMContentLoaded', () => {
    fetchAlgeriaNews();
    fetchLearningContent();
});
