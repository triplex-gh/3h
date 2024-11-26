// 博客文章展开/收起功能
function togglePost(button) {
    const post = button.closest('.blog-post');
    const content = post.querySelector('.post-content');
    const isExpanded = content.classList.contains('expanded');
    
    if (isExpanded) {
        content.classList.remove('expanded');
        button.classList.remove('expanded');
        button.innerHTML = '展开阅读 <i class="fas fa-chevron-down"></i>';
    } else {
        content.classList.add('expanded');
        button.classList.add('expanded');
        button.innerHTML = '收起 <i class="fas fa-chevron-down"></i>';
    }
} 