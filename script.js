/**
 * MisterAI Intelligence Engine - Hybrid Search
 * بحث محلي + بحث خارجي مع روابط تحقق
 */
async function askMisterAI() {
    const input = document.getElementById('ai-search-input');
    const responseArea = document.getElementById('ai-response-area');
    const query = input.value.trim().toLowerCase();

    if (!query) return;

    // حالة البحث والتحليل
    responseArea.innerHTML = `
        <div class="flex flex-col items-center gap-3 py-6">
            <div class="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <p class="text-cyan-400 text-[10px] font-black uppercase tracking-widest">Global_Search_In_Progress...</p>
        </div>`;

    try {
        // 1. محاولة البحث المحلي أولاً (أخبار الجزائر)
        const localRes = await fetch('./algeria_news.json?v=' + Date.now());
        const localData = await localRes.json();
        const localMatch = localData.articles.find(a => a.title.toLowerCase().includes(query));

        if (localMatch) {
            renderResult(localMatch, "ذاكرة MisterAI المحلية", responseArea);
        } else {
            // 2. إذا لم يجد محلياً، يخرج للبحث العالمي (خارجي)
            // سنستخدم API مجاني لجلب شروحات أو أخبار خارجية
            const externalUrl = `https://dev.to/api/articles?tag=${query}&per_page=1`;
            const extResponse = await fetch(externalUrl);
            const extData = await extResponse.json();

            if (extData.length > 0) {
                const globalMatch = {
                    title: extData[0].title,
                    url: extData[0].url,
                    description: "تم جلب هذا الشرح من المصادر العالمية لتعزيز معرفتك الرقمية."
                };
                renderResult(globalMatch, "مختبر المعرفة العالمي (External)", responseArea);
            } else {
                responseArea.innerHTML = `
                    <div class="text-center p-6 border border-white/5 rounded-2xl">
                        <p class="text-gray-500 text-xs">لا توجد نتائج مطابقة في الشبكة حالياً. جرب كلمات مثل (JS, Python, الجزائر).</p>
                    </div>`;
            }
        }
    } catch (e) {
        responseArea.innerHTML = '<p class="text-red-500 text-[10px]">Connection_Error: سحابة البيانات غير مستقرة</p>';
    }
}

// دالة لعرض النتيجة بأسلوب موحد وراقي
function renderResult(data, sourceName, container) {
    container.innerHTML = `
        <div class="bg-gradient-to-br from-cyan-900/20 to-black border border-cyan-500/30 p-6 rounded-[2rem] animate-in zoom-in duration-500">
            <div class="flex items-center justify-between mb-4">
                <span class="text-[9px] bg-cyan-500 text-black font-black px-3 py-1 rounded-full uppercase">${sourceName}</span>
                <i class="fas fa-external-link-alt text-cyan-500 text-xs"></i>
            </div>
            <h4 class="text-white font-bold text-lg mb-3 leading-tight">${data.title}</h4>
            <p class="text-gray-400 text-xs mb-5 italic">"تم العثور على هذا الرابط. نرجو منك زيارة المصدر الخارجي للتحقق من صحة المعلومات بأنظمة حمايتك الخاصة."</p>
            
            <div class="flex flex-col gap-3">
                <a href="${data.url}" target="_blank" 
                   class="bg-white text-black text-center font-black py-3 rounded-xl hover:bg-cyan-400 transition-all text-xs uppercase tracking-tighter">
                   Open_Source_Link | فتح الرابط الخارجي
                </a>
                <p class="text-[9px] text-gray-600 text-center uppercase tracking-widest">Security Check Required @ Mustafa_Network</p>
            </div>
        </div>
    `;
}
