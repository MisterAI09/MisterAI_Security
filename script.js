async function loadNews() {
    const container = document.getElementById('news-container');
    try {
        const response = await fetch('news.json');
        const data = await response.json();
        
        container.innerHTML = ''; // مسح الحالة التجريبية

        data.articles.forEach(article => {
            if(article.title && article.title !== "[Removed]") {
                const card = `
                <div class="bg-gray-800 p-5 rounded-xl border border-gray-700 hover:border-green-500 transition duration-300 shadow-lg group">
                    <h4 class="font-bold text-lg mb-3 group-hover:text-green-400">${article.title}</h4>
                    <p class="text-gray-400 text-sm line-clamp-3 mb-4">${article.description || 'لا يوجد وصف متاح لهذا الخبر.'}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xs text-gray-500">${new Date(article.publishedAt).toLocaleDateString('ar-DZ')}</span>
                        <a href="${article.url}" target="_blank" class="text-green-500 text-sm font-bold hover:underline">إقرأ المزيد ←</a>
                    </div>
                </div>
                `;
                container.innerHTML += card;
            }
        });
    } catch (error) {
        container.innerHTML = '<p class="text-red-400">عذراً، فشل تحميل الأخبار حالياً. يرجى المحاولة لاحقاً.</p>';
        console.error("News Load Error:", error);
    }
}

loadNews();
