/**
 * MisterAI NETWORK - News Fetching System
 * دالة جلب البيانات وعرضها في الواجهة
 */
async function fetchFeed(file, containerId, isTrend) {
    const container = document.getElementById(containerId);
    
    // التأكد من وجود الحاوية في الصفحة قبل البدء
    if (!container) return; 

    try {
        // إضافة timestamp لمنع المتصفح من عرض بيانات قديمة مخزنة (Cache)
        const response = await fetch(`./${file}?v=` + Date.now());
        
        // التحقق من أن الاستجابة ناجحة
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        // التعامل مع حالة الملف الفارغ أو عدم وجود مقالات
        if (!data.articles || data.articles.length === 0) {
            if(!isTrend) {
                container.innerHTML = '<p class="text-center col-span-full py-20 text-gray-600 font-black tracking-widest uppercase animate-pulse">Global_Feed_Empty</p>';
            }
            return;
        }
        
        // مسح محتوى الحاوية قبل إضافة الأخبار الجديدة
        container.innerHTML = '';
        
        data.articles.forEach(article => {
            if(isTrend) {
                // تصميم قسم الترند الجزائري (الجانبي)
                container.innerHTML += `
                <div class="border-b border-white/5 pb-2 hover:bg-orange-500/5 p-2 transition-all group">
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="text-gray-400 group-hover:text-orange-400 block transition-colors duration-300">
                        ${article.title}
                    </a>
                </div>`;
            } else {
                // تصميم قسم الأخبار العالمية (الرئيسي) مع تأثير اللمعان
                container.innerHTML += `
                <div class="bg-black/40 border border-cyan-500/10 p-6 rounded-xl flex flex-col h-full group shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/20 transition-all duration-500">
                    <h4 class="font-bold text-sm mb-4 text-right group-hover:text-cyan-400 transition-colors leading-relaxed">
                        ${article.title}
                    </h4>
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="mt-auto text-center text-[10px] font-black text-black bg-cyan-400 py-2 rounded uppercase hover:bg-white transition-all shadow-md">
                        Open_Source
                    </a>
                </div>`;
            }
        });
    } catch (e) { 
        console.error("Error fetching " + file + ":", e);
        // في حال حدوث خطأ في الرابط أو الملف
        if(!isTrend) {
            container.innerHTML = '<p class="text-center col-span-full py-20 text-red-500/50 font-black">SYSTEM_LINK_BROKEN</p>';
        }
    }
}

// 1. استدعاء الأخبار العالمية (تأكد أن الملف news.json يتم تحديثه في GitHub)
fetchFeed('news.json', 'news-container', false);

// 2. استدعاء أخبار الترند الجزائري
fetchFeed('algeria_news.json', 'algeria-trending', true);
