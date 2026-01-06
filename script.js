async function loadNews() {
    const container = document.getElementById('news-container');
    try {
        // v=Date.now تضمن جلب أحدث نسخة من الملف المرفوع على السيرفر
        const response = await fetch('./news.json?v=' + Date.now());
        if (!response.ok) throw new Error("File not found");
        
        const data = await response.json();
        
        if (!data.articles || data.articles.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center col-span-full py-10 italic font-bold tracking-widest uppercase">جاري البحث عن أخبار تقنية عالمية جديدة...</p>';
            return;
        }

        container.innerHTML = ''; 
        data.articles.forEach(article => {
            if(article.title && article.title !== "[Removed]") {
                const card = `
                <div class="news-card bg-[#0f172a]/60 p-8 rounded-[2rem] border border-gray-800 hover:border-green-500/30 flex flex-col h-full shadow-2xl transition-all duration-500 group">
                    <div class="flex justify-between items-center mb-6">
                        <span class="bg-blue-600/10 text-blue-400 text-[9px] font-black px-3 py-1.5 rounded-full border border-blue-400/20 uppercase tracking-widest">تطور عالمي</span>
                        <span class="text-[10px] font-bold text-gray-600 tracking-tighter">${new Date(article.publishedAt).toLocaleDateString('ar-DZ')}</span>
                    </div>
                    <h4 class="font-black text-xl mb-5 leading-snug text-right text-gray-100 group-hover:text-green-400 transition">${article.title}</h4>
                    <p class="text-gray-500 text-xs font-bold line-clamp-3 mb-8 leading-relaxed text-right">${article.description || 'تطور تقني عالمي جديد، اضغط للمزيد من التفاصيل.'}</p>
                    <div class="mt-auto flex items-center justify-between pt-6 border-t border-gray-800/40">
                        <a href="${article.url}" target="_blank" class="text-white text-[10px] font-black bg-gray-800 px-6 py-2.5 rounded-xl hover:bg-green-600 transition shadow-lg shadow-green-900/10">إقرأ المزيد</a>
                        <button onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${article.url}', '_blank')" class="text-gray-600 hover:text-blue-500 transition-colors">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </button>
                    </div>
                </div>
                `;
                container.innerHTML += card;
            }
        });
    } catch (error) {
        container.innerHTML = '<div class="col-span-full p-20 text-gray-700 text-center font-black italic uppercase tracking-widest">جاري الاتصال بقاعدة البيانات العالمية..</div>';
    }
}
loadNews();
