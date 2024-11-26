// 视频预览相关函数
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有视频预览元素
    const videoPreviews = document.querySelectorAll('.video-preview');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = videoModal.querySelector('video');
    
    videoPreviews.forEach(videoPreview => {
        const previewVideo = videoPreview.querySelector('video');
        const overlay = videoPreview.querySelector('.video-overlay');

        // 点击预览打开模态框
        videoPreview.addEventListener('click', function() {
            // 更新模态框中的视频源
            modalVideo.querySelector('source').src = previewVideo.querySelector('source').src;
            modalVideo.load(); // 重新加载视频
            
            videoModal.style.display = 'flex';
            setTimeout(() => {
                videoModal.classList.add('active');
                modalVideo.play()
                    .catch(error => console.error("视频播放失败:", error));
            }, 10);
        });

        // 鼠标悬停时自动播放预览
        videoPreview.addEventListener('mouseenter', function() {
            previewVideo.play()
                .catch(error => console.error("预览播放失败:", error));
            videoPreview.classList.add('playing');
            overlay.style.opacity = '0';
        });

        // 鼠标离开时暂停
        videoPreview.addEventListener('mouseleave', function() {
            previewVideo.pause();
            previewVideo.currentTime = 0;
            videoPreview.classList.remove('playing');
            overlay.style.opacity = '1';
        });
    });

    // 关闭模态框时暂停视频
    window.closeVideoModal = function() {
        videoModal.classList.remove('active');
        setTimeout(() => {
            videoModal.style.display = 'none';
            modalVideo.pause();
            modalVideo.currentTime = 0;
        }, 300);
    };

    // 点击模态框背景关闭
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });

    // ESC 键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
}); 

// 添加展开/收起功能
function toggleAbout() {
    const aboutFull = document.querySelector('.about-full');
    const readMoreBtn = document.querySelector('.read-more');
    const isExpanded = aboutFull.classList.contains('expanded');
    
    if (!isExpanded) {
        aboutFull.classList.add('expanded');
        readMoreBtn.textContent = document.documentElement.getAttribute('data-lang') === 'en' ? 'Show Less' : '收起';
        
        // 添加剩余的段落
        const remainingParagraphs = `
            <p data-en="Outside of academics, I'm actively involved in the university's Electronics Club, where I work with fellow enthusiasts on various projects. This experience has not only enhanced my technical skills but also helped me develop valuable teamwork and communication abilities. I've already made close friends who share my passion for technology, and together we often discuss emerging trends in electronics and brainstorm innovative project ideas.">
                在学术之外，我积极参与大学的电子俱乐部，与志同道合的爱好者一起进行各种项目。这种经历不仅提升了我的技术能力，还帮助我培养了宝贵的团队合作和沟通能力。我已经结识了一些志同道合的好朋友，我们经常一起讨论电子领域的新趋势，并集思广益创新项目的想法。
            </p>
            <p data-en="Looking ahead, I aspire to contribute to the field of electronic information engineering, particularly in areas like embedded systems or telecommunications. The rapid advancement of technology in China and globally presents exciting opportunities, and I'm eager to be part of this evolution.">
                展望未来，我希望能在电子信息工程领域做出贡献，特别是在嵌入式系统或电信等领域。中国和全球技术的快速发展带来了令人兴奋的机遇，我渴望成为这一发展进程的一部分。
            </p>
            <p data-en="Through my education at CUC, I'm building a strong foundation for my future career while embracing the challenges and opportunities that come with being a university student in this dynamic field.">
                通过在中传的学习，我正在为未来的职业生涯打下坚实的基础，同时拥抱作为这个充满活力领域的大学生所面临的挑战和机遇。
            </p>
        `;
        
        // 检查是否已经添加了这些段落
        if (!aboutFull.querySelector('p:nth-child(3)')) {
            aboutFull.insertAdjacentHTML('beforeend', remainingParagraphs);
        }
    } else {
        aboutFull.classList.remove('expanded');
        readMoreBtn.textContent = document.documentElement.getAttribute('data-lang') === 'en' ? 'Read More' : '展开阅读';
    }
} 