if(!self.define){let e,i={};const a=(a,r)=>(a=new URL(a+".js",r).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(r,d)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let b={};const f=e=>a(e,c),n={module:{uri:c},exports:b,require:f};i[c]=Promise.all(r.map((e=>n[e]||f(e)))).then((e=>(d(...e),b)))}}define(["./workbox-b41f8fb8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"2023/11/23/jike/写给新生/index.html",revision:"5612808fe107f90d12961fe155b57130"},{url:"2023/11/23/jike/大创项目合集/index.html",revision:"cf69f700c6611756796ec0161ce084d5"},{url:"2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/00 预训练语言模型的前世今生（全文 24854 个词）/index.html",revision:"bf74bfa30d48a9e60a72852cf3a5c2c1"},{url:"2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/03 什么是预训练（Transformer 前奏）/index.html",revision:"c7c455905d1f0392d37b45ec1b66883c"},{url:"2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/04 统计语言模型（n元语言模型）/index.html",revision:"b7658c3129cba112fd53b166c293751d"},{url:"2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/05 神经网络语言模型（独热编码+词向量的起源）/index.html",revision:"59c8659e1473eb8557be81ea5b7c176d"},{url:"2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/06 Word2Vec模型（第一个专门做词向量的模型，CBOW和Skip-gram）/index.html",revision:"fae687275c536b905420b006639b02ad"},{url:"2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/07 预训练语言模型的下游任务改造简介（如何使用词向量）/index.html",revision:"337fe4754bb42d6faf0c92133a2567c2"},{url:"2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/08 ELMo模型（双向LSTM模型解决词向量多义问题）/index.html",revision:"a182747eb26fb2ea4839e47631bd0eac"},{url:"2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/Transformer/index.html",revision:"2f7176ec11fa1577c704bf5aa9d19964"},{url:"2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/注意力机制（Attention ）/index.html",revision:"d1a879f6034864b63f72ae5c143e6201"},{url:"2024/02/07/NER/pytorch安装环境问题/index.html",revision:"ee620cc23d9bcf480b96cfb1f8678154"},{url:"2024/02/07/NER/文本预处理/index.html",revision:"d23da2ed8d68222aa55a560a372feb9e"},{url:"2024/02/15/NER/BERT&Transformer/index.html",revision:"d3e98b85a7ab5d5036e8dce26c39bbe0"},{url:"2024/02/15/NER/RNN模型/index.html",revision:"bf45e671727daa8443af9a704caa81c1"},{url:"2024/02/16/各项事宜/index.html",revision:"c6024c74da4019a1d04e668ed738b5ec"},{url:"2024/03/18/NER/Learing_o/index.html",revision:"897cdba21e8f95a724457ea2f2e4c4c8"},{url:"2024/03/18/NER/O说明文档/index.html",revision:"4edeb7bbe6f0fabaeabbfe6b01d45901"},{url:"2024/04/24/NER/Few-Shot代码/index.html",revision:"b7ae52c50053a509e19479c459793446"},{url:"2024/04/24/NER/Few-shot代码梳理/index.html",revision:"62d560b8b49de9fcf6a7497d2b593a1f"},{url:"2024/05/24/shuju/c++STL/index.html",revision:"3c961431e3110c063bed5fd47d12abbb"},{url:"2024/06/10/guancha/观察录前言/index.html",revision:"a4df8b0564285cf698fdc15c8647f9d4"},{url:"2024/07/14/shumo/《MATLAB从入门到精通》笔记/index.html",revision:"2864e86950516a31e40145c47c6e3b58"},{url:"2024/07/29/anzhiyu/关于主题的潜在bug/index.html",revision:"a5abad382ae001e60c1870a14f6bd245"},{url:"2024/08/01/JAVA/Java学习笔记/index.html",revision:"a1732a4a884db738ede756189723e2de"},{url:"2024/08/01/JAVA/Java核心技术卷Ⅰ/index.html",revision:"4a41a1203760538b320d6dbf1349fd4f"},{url:"2024/08/15/guancha/寻人菲菲/index.html",revision:"7334b986c57db18887c36bcb81296425"},{url:"2024/08/15/联邦学习/index.html",revision:"1f09dab4119a2abab7f308d869138d4f"},{url:"2024/08/16/shuju/图论/index.html",revision:"75613a25af5ea0f41b6519827e613ae3"},{url:"404.html",revision:"513d3273af714e6b55f4d8628b1acca8"},{url:"about/index.html",revision:"567251caa9c2aa7b90fb84b9fecdd8ae"},{url:"air-conditioner/index.html",revision:"16310c1764be5d30cebd75c806afc26a"},{url:"anzhiyu/random.js",revision:"e20f20cd8bc508a0e22feaf6561f4537"},{url:"archives/2023/11/index.html",revision:"3218beef0a1c2ae9d8ff63701d1ab7b0"},{url:"archives/2023/index.html",revision:"2626e7ae2e0476a6247ce4b0ed2a8a8d"},{url:"archives/2024/02/index.html",revision:"b8f83ccc155a9f97e2e26a3b51d80501"},{url:"archives/2024/02/page/2/index.html",revision:"13e10a172717c839beb77228fa9daabf"},{url:"archives/2024/03/index.html",revision:"21b2538b7a448c8ba7ef05f4b6781465"},{url:"archives/2024/04/index.html",revision:"cdc8e27abfbe21d9f5aafc345863bb62"},{url:"archives/2024/05/index.html",revision:"1a0c2638e7c4c24decdf19507dc1139d"},{url:"archives/2024/06/index.html",revision:"88a48be9fc266e33133eab66097665a2"},{url:"archives/2024/07/index.html",revision:"0f2af13ca483be82581ea6e706184081"},{url:"archives/2024/08/index.html",revision:"5ce039b488c7beb3e3d0c81312dfe9a2"},{url:"archives/2024/index.html",revision:"5f2de2b5a4405d8563dee681de794012"},{url:"archives/2024/page/2/index.html",revision:"b15c4f0dd79d3a37d8d3083294217a1d"},{url:"archives/2024/page/3/index.html",revision:"da02c9f302f3cc9b34ab9d2f47cac320"},{url:"archives/index.html",revision:"42d9bb4e947845afa109120931784034"},{url:"archives/page/2/index.html",revision:"d9a0548d0f13b2dd72cc1836a341e953"},{url:"archives/page/3/index.html",revision:"369f8e9140f07333880c0ad0a2ee4c87"},{url:"categories/anzhiyu/index.html",revision:"569b317972597029ccadf07720fc4919"},{url:"categories/guancha/index.html",revision:"713e70ce023c12b9f026e25189b56f0f"},{url:"categories/index.html",revision:"b369497265bc582d5d73a28cb24339bc"},{url:"categories/JAVA/index.html",revision:"d5aa952f77a9786242ec59f5fa937587"},{url:"categories/jike/index.html",revision:"cb9b4c973194e1d9791816d7ddef74cc"},{url:"categories/NER/index.html",revision:"a9b4ba5d220f905c4c6c61b26c1ff6a5"},{url:"categories/NER/page/2/index.html",revision:"49ce72bb5466b9e3ca2097ff9f1b8118"},{url:"categories/shuju/index.html",revision:"5d115775f5b0d9a5140234b6ea1e342e"},{url:"categories/shumo/index.html",revision:"a54c2302e2dd904cd147a5f68d05c35a"},{url:"categories/大学生涯.html",revision:"25c55ff5240cc9429af8f07f0f9fdf58"},{url:"categories/技能点.html",revision:"af0fcf0fe4480bacd59192458603c123"},{url:"categories/生活日常/index.html",revision:"86cbea32b81acb1de1dd16e4e7dacc2a"},{url:"comments/index.html",revision:"cd0b6429f1bc6ffb037c1e85aa95c838"},{url:"css/index.css",revision:"88bbca9fe7b009b30cf25747e070dde6"},{url:"css/var.css",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"equipment/index.html",revision:"f42ad6183371d5c3bc50da1168e69bed"},{url:"essay/index.html",revision:"168e1b678b2ad4ac4528a4f7cbca0132"},{url:"img/404.jpg",revision:"8190796a570d269ef04b777d93d44e6d"},{url:"img/512.png",revision:"701819a72025df4d8e2a111c1c8f2c72"},{url:"img/algolia.svg",revision:"88450dd56ea1a00ba772424b30b7d34d"},{url:"img/avatar.png",revision:"9fa96b8ff51493bd271dea1ce843e75d"},{url:"img/comment_bg.png",revision:"fe6bbe142eb7dc7b4f876ae4f5af97d0"},{url:"img/default_cover.jpg",revision:"8b35831759dc5f66710c2839422109d5"},{url:"img/friend_404.gif",revision:"d09ab53cb5bb15079ce8e3d90b157353"},{url:"img/loading.gif",revision:"9beba1aa0e43b4bdd9c71979ed5e096b"},{url:"img/siteicon/16.png",revision:"3de470acb5237bf16318d827443dd5f1"},{url:"img/siteicon/32.png",revision:"802aa4685b3652d5a1b6e5a6323cf3c0"},{url:"img/siteicon/apple-icon-180.png",revision:"ac045b7b6012d72ccbcffb07727c7b11"},{url:"img/siteicon/manifest-icon-192.maskable.png",revision:"87c1b5883834c2164e20e737bd5c2517"},{url:"img/siteicon/manifest-icon-512.maskable.png",revision:"85b846b5722c684339c8bb3e520bcc6a"},{url:"img/tu/img(1).png",revision:"19eea4c08a4b390faeacd72dc685c2d6"},{url:"img/tu/img(10).jpg",revision:"b1d8ef7c1cea939ab88747581c0666a3"},{url:"img/tu/img(11).jpg",revision:"3478a38d64b49b8c117e1d637b77daf5"},{url:"img/tu/img(12).jpg",revision:"4652d1af6994ddebf4b45c756485ff2a"},{url:"img/tu/img(13).jpg",revision:"348dc4416b1e802ddfd39c66c16a4ec7"},{url:"img/tu/img(14).jpg",revision:"8e9632757067e00c73df96fc1b44f4b7"},{url:"img/tu/img(15).jpg",revision:"1ba1439e517210f2c2779a541c7f615d"},{url:"img/tu/img(16).jpg",revision:"6481019761a4a3e0437de60f9e5b6217"},{url:"img/tu/img(17).jpg",revision:"f475cdc733c0bb2027a27c9f912a1e16"},{url:"img/tu/img(18).jpg",revision:"d3ac6719492477a2b872e0ad0aab57ec"},{url:"img/tu/img(19).jpg",revision:"360141c1a5585d7f3ef87b7bc73c85b9"},{url:"img/tu/img(2).jpg",revision:"4e4efabd10a10c02664d0be01d4bd82f"},{url:"img/tu/img(20).jpg",revision:"33401c9d43a01ff3a0468f91a75273ef"},{url:"img/tu/img(21).jpg",revision:"1e1d84b84632df87893a07e44fcca31e"},{url:"img/tu/img(22).jpg",revision:"ddb0db509ea2ca1595708bbf06fcfdfc"},{url:"img/tu/img(23).jpg",revision:"03c676e4ba9853d29939f89de3e50f5b"},{url:"img/tu/img(24).jpg",revision:"3599ad38592a93dfc645490b74823635"},{url:"img/tu/img(25).jpg",revision:"094db3ff6ddbac07abbb27ba7119a9ff"},{url:"img/tu/img(26).jpg",revision:"141e6e889f1b1c124560ad255718a3b1"},{url:"img/tu/img(27).jpg",revision:"94f75a29a718c5216727443b8dc67394"},{url:"img/tu/img(28).jpg",revision:"234bbb59ff4e306276e75b9bb6fb7181"},{url:"img/tu/img(29).jpg",revision:"3f2b5de0fbc142cd709f964de05b5fa7"},{url:"img/tu/img(3).jpg",revision:"0b17b3434e8c31980cde030ac7ef4ac2"},{url:"img/tu/img(30).jpg",revision:"d697cd857a4d97a38312bb8601f0c91e"},{url:"img/tu/img(31).jpg",revision:"411878f5b92333250b41fbb341372cc5"},{url:"img/tu/img(32).jpg",revision:"e22623c573752d09534d62b480d36e7e"},{url:"img/tu/img(33).jpg",revision:"ec926135df5518da1b800fa96cfc66e6"},{url:"img/tu/img(34).jpg",revision:"2f973c95229adad26fe84cf9fd3d6d1c"},{url:"img/tu/img(35).jpg",revision:"106e9857db8d0ef0f9b5419488e90835"},{url:"img/tu/img(36).jpg",revision:"5b2d9bbddce5892b76182a233c9bd30a"},{url:"img/tu/img(37).jpg",revision:"c5988b57ddcef508b417ca4940ca0eb1"},{url:"img/tu/img(38).jpg",revision:"b4278a7acf3eac4fa3c323afee607cd4"},{url:"img/tu/img(39).jpg",revision:"c69958282cc13e14dfc07383109a90df"},{url:"img/tu/img(4).jpg",revision:"5bb0866c7f0866ffa3842bc4366aa446"},{url:"img/tu/img(40).jpg",revision:"6d5c1b1a537f3a596245c0895e5cb160"},{url:"img/tu/img(41).jpg",revision:"b3f30ca759519e5cfd53df897425f6ea"},{url:"img/tu/img(42).jpg",revision:"ab058c192b0155b0ed1df1554a5efbe1"},{url:"img/tu/img(43).jpg",revision:"d9661a1f22d8222295256193851d7edf"},{url:"img/tu/img(44).jpg",revision:"1c75dddfaf580dacdbef44fa9e423264"},{url:"img/tu/img(45).jpg",revision:"5af28b78d256677c3ddf04d36d52c3eb"},{url:"img/tu/img(46).jpg",revision:"eedd214bdc8d3e359a50ef08379591a9"},{url:"img/tu/img(47).jpg",revision:"c8f446b0991f7ee0463834b8a26c2158"},{url:"img/tu/img(48).jpg",revision:"35557dd7cb95dc7d40e2979de170816c"},{url:"img/tu/img(49).jpg",revision:"f27a82f2c98c4bab28da17ae9f6f1e12"},{url:"img/tu/img(5).jpg",revision:"ba979de1e7635dcb419b24bc51718748"},{url:"img/tu/img(50).jpg",revision:"feb0b1f04e57a143b9d42ce13be6c3c7"},{url:"img/tu/img(51).jpg",revision:"c000131b60c209e05ad93e41acde6fda"},{url:"img/tu/img(52).jpg",revision:"33634c4c0fe95f9e281f3e823089538d"},{url:"img/tu/img(53).jpg",revision:"384da492a95a7b826495b86e034ecf5b"},{url:"img/tu/img(54).jpg",revision:"7e5ca2a1b7d0b2daff9434e9d85a09b2"},{url:"img/tu/img(55).jpg",revision:"4f53bc827671b9c6c7010d926dec8ccc"},{url:"img/tu/img(56).jpg",revision:"3eac38a7e8fc694ecceca80fcd08ec02"},{url:"img/tu/img(57).jpg",revision:"3de600163af60e4d756c2f8e6c3ac130"},{url:"img/tu/img(58).jpg",revision:"3eb3911772c8ec661f85cdff4b5c9a14"},{url:"img/tu/img(59).jpg",revision:"7b11ab313a872642e8e18a5b99010804"},{url:"img/tu/img(6).jpg",revision:"98956cf029305417783cfd1dac99a848"},{url:"img/tu/img(60).jpg",revision:"53c3e2a30df2fbefe5aece9285cdac63"},{url:"img/tu/img(61).jpg",revision:"5b08ecbcb7d3108f37d3beac98ace367"},{url:"img/tu/img(62).jpg",revision:"f5d4e89d05c91f5c0038c6dc5ff8c08f"},{url:"img/tu/img(63).jpg",revision:"ac35b7491af8ea966f1703dcdd085a3d"},{url:"img/tu/img(64).jpg",revision:"bababde3819e6c81743fe75be777b732"},{url:"img/tu/img(65).jpg",revision:"8cb6493bb1fb62b378b6e2c82b6af70e"},{url:"img/tu/img(66).jpg",revision:"269d4fb5d87d69d8a71f37fc56631496"},{url:"img/tu/img(67).jpg",revision:"e6fa4f1ef5ec2b01803b64c559e6583f"},{url:"img/tu/img(68).jpg",revision:"85da43e3223275bfaf4f0a393b57cb62"},{url:"img/tu/img(69).jpg",revision:"6cf29c87ce443f3bbb763ac77e607e75"},{url:"img/tu/img(7).jpg",revision:"370fb7814aad5795289071ec62c8d013"},{url:"img/tu/img(70).jpg",revision:"2bc9cab4de59e549fc217c45e064ef32"},{url:"img/tu/img(71).jpg",revision:"d0d2825b1d0fe4d34e7bed2d5a38e010"},{url:"img/tu/img(72).jpg",revision:"cb50e9cc9bdaf5806f74ca1c90c99c27"},{url:"img/tu/img(73).jpg",revision:"55fcb5d63566819279dfca04d5ca7e96"},{url:"img/tu/img(74).jpg",revision:"32c55223b12fc12859d9cd09d564162e"},{url:"img/tu/img(75).jpg",revision:"d5081c7996f49baeb827bf33e6fe08e8"},{url:"img/tu/img(76).jpg",revision:"d6bcc3406bc7fc7006d5a963fc3eeac2"},{url:"img/tu/img(77).jpg",revision:"ab15eab36eb8624b68d09a735a48f873"},{url:"img/tu/img(78).jpg",revision:"dd37bdea678f2e9482d9e0bd0e2c470e"},{url:"img/tu/img(79).jpg",revision:"3ea14a1d142b57ed28ae9f3a21fccab4"},{url:"img/tu/img(8).jpg",revision:"ce5d77094824bb09ce4398f58ea008d1"},{url:"img/tu/img(80).jpg",revision:"0e14d6ff3a4a52cdfbe68c432025fb18"},{url:"img/tu/img(81).jpg",revision:"4a82113ed289970627cd50fe39971322"},{url:"img/tu/img(82).jpg",revision:"c4984c7ff4ce983409502b37a14f1b9e"},{url:"img/tu/img(83).jpg",revision:"7a8fd82701dc27df65690dc5a8134786"},{url:"img/tu/img(84).jpg",revision:"d03ee2b0863b8fdfecbb7f2def1e9ee2"},{url:"img/tu/img(85).jpg",revision:"c60f5cb735de63a0cd30580eea3461ac"},{url:"img/tu/img(86).jpg",revision:"96e97cb70c25d1194b12686701b80184"},{url:"img/tu/img(88).jpg",revision:"51423cec08d245dd085b51d89aaa4b39"},{url:"img/tu/img(89).jpg",revision:"582e96b2f55eef25925122ef33602586"},{url:"img/tu/img(9).jpg",revision:"4d1993d4b34d7a9ece2bc539b38004f9"},{url:"img/tu/img(90).jpg",revision:"61806d90cf82d8c5c6618055883d71a1"},{url:"img/tu/img(91).jpg",revision:"dfb4ba6c29e617d0eb4af2ab9179f29a"},{url:"img/tu/img(92).jpg",revision:"6ca6cb086bbe64683768fdc4b67a5c6c"},{url:"img/tu/img(93).jpg",revision:"dc242d3636e986263a7b16d3d7d3f695"},{url:"img/tu/img(94).jpg",revision:"5b68b286e5c6c30125ded2b2faea0519"},{url:"img/tu/img(95).jpg",revision:"1f27acf2774eeb0cadef277c48eb6a20"},{url:"img/tu/img(96).jpg",revision:"bd8e40548023550f47681bd336bc5d6d"},{url:"img/tu/img(97).jpg",revision:"6db4c00a0b04d6b46a59bdbe751f3679"},{url:"img/tu/img(98).jpg",revision:"4eba9bee0d2743150b5c328d7fec71fa"},{url:"index.html",revision:"800d4d7fc0e570ba87928e97d30502ea"},{url:"js/anzhiyu/ai_abstract.js",revision:"e4baa11685a6c14d4130b5b74d9222dc"},{url:"js/anzhiyu/comment_barrage.js",revision:"c5ca32eab1b5db6744df49cffaefa3a6"},{url:"js/anzhiyu/people.js",revision:"b946db8294a26b0b91e93dca5abda935"},{url:"js/anzhiyu/random_friends_post.js",revision:"30e5b8070503360d29e26e1b6db29efd"},{url:"js/anzhiyu/right_click_menu.js",revision:"586c1eecf6617180a50d419def5fd4c0"},{url:"js/main.js",revision:"0ca6e958debf5d18e10ead8c0c00191c"},{url:"js/search/algolia.js",revision:"3ce06f0458bccd45a20ae797cccb6561"},{url:"js/search/local-search.js",revision:"0f5dddc0c88389610bae38a044ee7a8a"},{url:"js/tw_cn.js",revision:"80822f672b15a8105128e305e9acbed4"},{url:"js/utils.js",revision:"b2bbde9d96fc4ded6c7a163038818ae5"},{url:"link/index.html",revision:"a60f103ad947e8c7a9c7e08afb583c69"},{url:"music/index.html",revision:"e1f27eadb160806a6b0a310e70e125fd"},{url:"page/2/index.html",revision:"1093abc7928585b56222b08201ff055f"},{url:"page/3/index.html",revision:"5e696bdca54fae476a895079663712f7"},{url:"source/imgs/${fiilename}/算法通关数组.png",revision:"7afcc6a54bccc77ff1982dfd17356314"},{url:"tags/anzhiyu/index.html",revision:"b04c6a12662319c5b0c463fe0b3f7990"},{url:"tags/index.html",revision:"7f6a187bbc7d3da9034958c0e75ff754"},{url:"tags/Javaee/index.html",revision:"642e5477060ba3947b484afb25db854e"},{url:"tags/MATLAB/index.html",revision:"51d7b591f75b1e96c72a068b422eec0e"},{url:"tags/NER/index.html",revision:"09793ccf8134da5f2dca28e4e9ff47f6"},{url:"tags/NER/page/2/index.html",revision:"c197b84fab89493d51d06691350488e0"},{url:"tags/pytorch/index.html",revision:"6842d9e7e646cbc7e9e95f4702473960"},{url:"tags/STL/index.html",revision:"dd68d2aca50d7a7ed2279d7758be211b"},{url:"tags/寻人启事/index.html",revision:"48dcd873898e3ffd7674730f94a0f2e3"},{url:"tags/观猹/index.html",revision:"ccb2dcff518d249bad4e2bfcdfa6857e"},{url:"tags/计科/index.html",revision:"c87984fe6edbdd9576a1b22ee0a11712"}],{})}));
//# sourceMappingURL=service-worker.js.map
