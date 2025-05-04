var posts=["2024/10/02/Linux系统配置安装MySQL/","2024/02/16/各项事宜/","2025/03/04/Untitled/","2025/05/04/我也曾彻夜难眠/","2024/08/15/联邦学习/","2025/01/09/这场寒冬/","2025/03/10/面经/","2024/08/01/JAVA/Java学习笔记/","2024/08/01/JAVA/Java核心技术卷Ⅰ/","2024/03/18/NER/O说明文档/","2025/01/09/anzhiyu/关于主题的潜在bug/","2024/06/10/guancha/观察录前言/","2024/03/18/NER/Learing_o/","2024/02/07/NER/pytorch安装环境问题/","2025/01/09/jike/26实习避雷/","2024/09/24/NER/论文初稿/","2024/05/24/shuju/DP/","2024/05/24/shuju/HashMap/","2024/05/24/shuju/c++STL/","2024/08/16/shuju/图论/","2024/09/12/shumo/24国赛/","2024/08/01/JAVA/青训营/实战/Go基础语法实战/","2024/07/14/shumo/《MATLAB从入门到精通》笔记/","2024/08/01/JAVA/青训营/笔记/Go基础语法/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"Hexo","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"},{"name":"anzhiyu主题","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg"},{"name":"J","link":"https://siljing.github.io/","avatar":"https://pic.imgdb.cn/item/66a08595d9c307b7e9ee31f0.jpg","descr":"闪闪发光的技术博主","siteshot":"https://pic.imgdb.cn/item/66a086d1d9c307b7e9ef4471.png","color":"vip","tag":"技术"},{"name":"我有&&症","link":"https://mrchenyk.github.io","avatar":"https://files.superbed.cc/store/images/d4/e6/677ffbc4d0e0a243d4f2d4e6.jpg","descr":"热爱coding的软件攻城狮","siteshot":"https://pic1.imgdb.cn/item/677ffbc4d0e0a243d4f2d4e6.jpg","color":"vip","tag":"Java后端"},{"name":"kites","link":"https://kites.cc/","avatar":"https://kites.cc/img/kites-150x150.png","descr":"深度学习 YOLO CV","siteshot":"https://pic.imgdb.cn/item/6713e5ded29ded1a8c3475b0.jpg","color":"vip","tag":"算法"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg","color":"vip","tag":"前端"},{"name":"J","link":"https://siljing.github.io/","avatar":"https://pic.imgdb.cn/item/66a08595d9c307b7e9ee31f0.jpg","descr":"闪闪发光的技术博主","recommend":true},{"name":"kites","link":"https://kites.cc/","avatar":"https://kites.cc/img/kites-150x150.png","descr":"深度学习 YOLO CV","recommend":true},{"name":"我有&&症","link":"https://mrchenyk.github.io","avatar":"https://files.superbed.cc/store/images/d4/e6/677ffbc4d0e0a243d4f2d4e6.jpg","descr":"热爱coding的软件攻城狮","recommend":true},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","recommend":true}];
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