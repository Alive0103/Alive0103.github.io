var posts=["2024/10/02/Linux系统配置安装MySQL/","2024/02/16/各项事宜/","2024/08/15/联邦学习/","2024/08/01/JAVA/Java学习笔记/","2024/09/14/JAVA/JavaWeb学习笔记/","2024/07/29/anzhiyu/关于主题的潜在bug/","2024/08/01/JAVA/Java核心技术卷Ⅰ/","2024/02/15/NER/BERT&Transformer/","2024/04/24/NER/Few-Shot代码/","2024/04/24/NER/Few-shot代码梳理/","2024/03/18/NER/Learing_o/","2024/03/18/NER/O说明文档/","2024/02/15/NER/RNN模型/","2024/02/07/NER/文本预处理/","2024/06/10/guancha/观察录前言/","2024/09/24/NER/理论部分/","2024/09/24/NER/论文初稿/","2024/05/24/shuju/DP/","2024/05/24/shuju/HashMap/","2024/05/24/shuju/c++STL/","2023/11/23/jike/大创项目合集/","2024/08/16/shuju/图论/","2024/09/12/shumo/24国赛/","2024/07/14/shumo/《MATLAB从入门到精通》笔记/","2024/09/24/JAVA/JavaWeb/01_第一章 概述/","2024/09/24/JAVA/JavaWeb/02_第二章 HTML&CSS/","2024/09/24/JAVA/JavaWeb/03_第三章 JavaScript/","2024/09/24/JAVA/JavaWeb/04_第四章 XML_Tomcat_HTTP/","2024/09/24/JAVA/JavaWeb/05_第五章 Servlet/","2024/09/24/JAVA/JavaWeb/06_第六章 会话_过滤器_监听器/","2024/09/24/JAVA/JavaWeb/07_第七章 前端工程化/","2024/08/01/JAVA/青训营/实战/Go基础语法实战/","2024/09/24/JAVA/JavaWeb/08_第八章 微头条项目开发/","2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/03 什么是预训练（Transformer 前奏）/","2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/05 神经网络语言模型（独热编码+词向量的起源）/","2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/04 统计语言模型（n元语言模型）/","2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/06 Word2Vec模型（第一个专门做词向量的模型，CBOW和Skip-gram）/","2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/08 ELMo模型（双向LSTM模型解决词向量多义问题）/","2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/00 预训练语言模型的前世今生（全文 24854 个词）/","2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/07 预训练语言模型的下游任务改造简介（如何使用词向量）/","2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/Transformer/","2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/注意力机制（Attention ）/","2024/08/01/JAVA/青训营/笔记/Go基础语法/","2024/02/07/NER/pytorch安装环境问题/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"Hexo","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"},{"name":"anzhiyu主题","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg"},{"name":"J","link":"https://siljing.github.io/","avatar":"https://pic.imgdb.cn/item/66a08595d9c307b7e9ee31f0.jpg","descr":"闪闪发光的技术博主","siteshot":"https://pic.imgdb.cn/item/66a086d1d9c307b7e9ef4471.png","color":"vip","tag":"技术"},{"name":"kites","link":"https://kites.cc/","avatar":"https://kites.cc/img/kites-150x150.png","descr":"深度学习 YOLO CV","siteshot":"https://pic.imgdb.cn/item/6713e5ded29ded1a8c3475b0.jpg","color":"vip","tag":"技术"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg","color":"vip","tag":"前端"},{"name":"J","link":"https://siljing.github.io/","avatar":"https://pic.imgdb.cn/item/66a08595d9c307b7e9ee31f0.jpg","descr":"闪闪发光的技术博主","recommend":true},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","recommend":true}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };