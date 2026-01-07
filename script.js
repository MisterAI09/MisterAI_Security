/**
 * MisterAI NETWORK - Advanced Knowledge System
 * نظام جلب الأخبار + مختبر البرمجة وفهم الآلة
 */

// 1. الدالة الأساسية لجلب الأخبار (كودك الأصلي مع تحسينات طفيفة)
async function fetchFeed(file, containerId, isTrend) {
    const container = document.getElementById(containerId);
    if (!container) return; 

    try {
        const response = await fetch(`./${file}?v=` + Date.now());
        if (!response.ok) throw new Error('Network error');
        
        const data = await response.json();
        
        if (!data.articles || data.articles.length === 0) {
            if(!isTrend) container.innerHTML = '<p class="text-center py-10 opacity-50">Global_Feed_Empty</p>';
            return;
        }
        
        container.innerHTML = '';
        
        data.articles.forEach(article => {
            if(isTrend) {
                container.innerHTML += `
                <div class="border-b border-white/5 pb-2 hover:bg-orange-500/5 p-2 transition-all group">
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="text-gray-400 group-hover:text-orange-400 block transition-colors duration-300">
                        ${article.title}
                    </a>
                </div>`;
            } else {
                container.innerHTML += `
                <div class="bg-black/40 border border-cyan-500/10 p-6 rounded-xl flex flex-col h-full group hover:border-cyan-500/50 transition-all duration-500">
                    <h4 class="font-bold text-sm mb-4 text-right group-hover:text-cyan-400 transition-colors">
                        ${article.title}
                    </h4>
                    <a href="${article.url}" target="_blank" class="mt-auto text-center text-[10px] font-black text-black bg-cyan-400 py-2 rounded uppercase hover:bg-white transition-all">
                        Open_Source
                    </a>
                </div>`;
            }
        });
    } catch (e) { 
        console.error("Error:", e);
    }
}

// 2. الدالة الجديدة: "مختبر الحكمة الرقمية" (لجلب شروحات البرمجة تلقائياً)
async function fetchLearningLab() {
    // جلب مقالات من DEV.to متخصصة في البرمجة والذكاء الاصطناعي
    const apiUrl = "https://dev.to/api/articles?tag=programming&per_page=3";
    
    // سنقوم بإنشاء الحاوية برمجياً لكي لا نعدل في ملف HTML الخاص بك
    let labSection = document.getElementById('learning-lab');
    if (!labSection) {
        const main = document.querySelector('main');
        labSection = document.createElement('div');
        labSection.id = 'learning-lab';
        labSection.className = "lg:col-span-4 mt-12 border-t border-cyan-500/10 pt-10";
        labSection.innerHTML = `
            <h2 class="text-cyan-500 font-black mb-8 flex items-center gap-3 uppercase tracking-widest text-sm">
                <span class="w-10 h-[1px] bg-cyan-500"></span> 
                MisterAI Knowledge Lab | مختبر فهم الآلة
            </h2>
            <div id="lab-items" class="grid grid-cols-1 md:grid-cols-3 gap-6 text-right"></div>
        `;
        main.appendChild(labSection);
    }

    try {
        const response = await fetch(apiUrl);
        const articles = await response.json();
        const itemsContainer = document.getElementById('lab-items');

        articles.forEach(article => {
            itemsContainer.innerHTML += `
                <div class="bg-[#0f172a]/50 border-r-2 border-green-500 p-6 rounded-l-2xl hover:bg-green-500/5 transition-all">
                    <span class="text-[9px] text-green-400 font-bold uppercase tracking-tighter">Machine_Learning_Logic</span>
                    <h5 class="text-white font-bold text-md my-2">${article.title}</h5>
                    <p class="text-gray-500 text-[11px] mb-4 leading-relaxed">البرمجة ليست مجرد كود، هي أداة بناء "السيادة الرقمية" والحرية الشخصية.</p>
                    <a href="${article.url}" target="_blank" class="text-cyan-400 text-[10px] font-black hover:underline">إبدأ التعلم الآن ←</a>
                </div>
            `;
        });
    } catch (e) {
        console.log("Lab Error:", e);
    }
}

// --- تنفيذ المهام عند تحميل الصفحة ---
document.addEventListener('DOMContentLoaded', () => {
    // جلب أخبار الجزائر
    fetchFeed('algeria_news.json', 'algeria-trending', true);
    
    // جلب الأخبار العالمية (إذا كان لديك حاوية لها)
    fetchFeed('news.json', 'news-container', false);
    
    // تشغيل مختبر المعرفة أوتوماتيكياً
    fetchLearningLab();
});
