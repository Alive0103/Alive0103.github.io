if(!self.define){let e,i={};const a=(a,r)=>(a=new URL(a+".js",r).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(r,c)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let b={};const f=e=>a(e,d),g={module:{uri:d},exports:b,require:f};i[d]=Promise.all(r.map((e=>g[e]||f(e)))).then((e=>(c(...e),b)))}}define(["./workbox-b41f8fb8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"2023/11/23/jike/写给新生/index.html",revision:"ad520f86dfc8e0b245fef326364bfb08"},{url:"2023/11/23/jike/大创项目合集/index.html",revision:"c7439c8563986c5e3248e1ebecd7f0ea"},{url:"2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/00 预训练语言模型的前世今生（全文 24854 个词）/index.html",revision:"79e21109f3ca1965b90dacab146d01a9"},{url:"2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/03 什么是预训练（Transformer 前奏）/index.html",revision:"9de33477600842bdc149ded686104aaa"},{url:"2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/04 统计语言模型（n元语言模型）/index.html",revision:"8065f9e184a0be58b77c7df8de94fb68"},{url:"2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/05 神经网络语言模型（独热编码+词向量的起源）/index.html",revision:"8a6022ccdd9429618d8ec705ce9a4a5d"},{url:"2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/06 Word2Vec模型（第一个专门做词向量的模型，CBOW和Skip-gram）/index.html",revision:"acd673b9274078fc628832b30e27a8a2"},{url:"2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/07 预训练语言模型的下游任务改造简介（如何使用词向量）/index.html",revision:"32e737e4782c38eb292b0eb88a19683a"},{url:"2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/08 ELMo模型（双向LSTM模型解决词向量多义问题）/index.html",revision:"14dce3b53ee93bafcc55687f73ac29bd"},{url:"2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/Transformer/index.html",revision:"7d1e094f9ecf027780a66293a1582963"},{url:"2024/02/07/NER/Pre-training-language-model-main/第一篇 Transformer、GPT、BERT，预训练语言模型的前世今生（理论）/注意力机制（Attention ）/index.html",revision:"3e1587d399052def549e86c6705ae75b"},{url:"2024/02/07/NER/pytorch安装环境问题/index.html",revision:"192f2d8a929c2a8aef379d5230379a40"},{url:"2024/02/07/NER/文本预处理/index.html",revision:"03acb093e161195dae7f793191744b1d"},{url:"2024/02/15/NER/BERT&Transformer/index.html",revision:"e9d03878f2d2c57c662c5d7c0f1e9e1f"},{url:"2024/02/15/NER/RNN模型/index.html",revision:"91441b305fb8ac903d686fdbd78932e4"},{url:"2024/02/16/各项事宜/index.html",revision:"ccfb6ebb21ac273f1c16bb08b30d76d9"},{url:"2024/03/18/NER/Learing_o/index.html",revision:"c7c0572f2e2d326d878f272a1a17570c"},{url:"2024/03/18/NER/O说明文档/index.html",revision:"28db44d8281791e62d139b02bd79f137"},{url:"2024/04/24/NER/Few-Shot代码/index.html",revision:"758ffac4f855ec011e1d1cf23576fadf"},{url:"2024/04/24/NER/Few-shot代码梳理/index.html",revision:"794a621f792eb6aa105f8179aeca9c37"},{url:"2024/05/24/shuju/c++STL/index.html",revision:"95e9fc80cde4d3c630775e4b5c84e048"},{url:"2024/06/10/guancha/观察录前言/index.html",revision:"797d956535fc2dba15466787d4f5ae5d"},{url:"2024/07/24/shuju/数据结构/index.html",revision:"537eaa971427cf9ce0c66931af427cec"},{url:"2024/07/29/anzhiyu/关于主题的潜在bug/index.html",revision:"9601508f1530eaea241afa8aa09869f1"},{url:"2024/08/01/JAVA/Java学习笔记/index.html",revision:"ea9294501071703f1ec10fb8ebcb5dbb"},{url:"404.html",revision:"abd01ce5d81691bf2572bb56a7bc0ebb"},{url:"about/index.html",revision:"56f44406c095cc3325999bd1e76e3470"},{url:"air-conditioner/index.html",revision:"e9f318ead53c26895decc4174708714b"},{url:"anzhiyu/random.js",revision:"1773e1e231771f4570c4d81b867e2a9f"},{url:"archives/2023/11/index.html",revision:"f34f32ff252d010c9dfe9e5b09313e9d"},{url:"archives/2023/index.html",revision:"9751aeaadd9af8107b9c34b00cbee88a"},{url:"archives/2024/02/index.html",revision:"3bcd0072ed26738ea8ac44368a412442"},{url:"archives/2024/02/page/2/index.html",revision:"6e0b4525a98e89acbee2e0ff7fe3be4f"},{url:"archives/2024/03/index.html",revision:"e26c75cd84022cd97a46d5ee3b6855d2"},{url:"archives/2024/04/index.html",revision:"37485b229b7dee8f4892909a3e72b3e0"},{url:"archives/2024/05/index.html",revision:"33b70ae7ebfaae9d3792a9ec91b2127b"},{url:"archives/2024/06/index.html",revision:"b9e0a39037ca38fa597c5c24391340b2"},{url:"archives/2024/07/index.html",revision:"a8e0a59587c7b8188947422e9691a2be"},{url:"archives/2024/08/index.html",revision:"1905bf8b0c5a2e643bcc7f9636c20b22"},{url:"archives/2024/index.html",revision:"00cfbaac6172ce7a953c37d7451429ec"},{url:"archives/2024/page/2/index.html",revision:"9200000a44f74c8fc214cdffc10e7ec7"},{url:"archives/2024/page/3/index.html",revision:"f9ff52bdbd5d502fbb3e53fcc72c61f6"},{url:"archives/index.html",revision:"957dcfb2e778e0e53de7c4da340ffff1"},{url:"archives/page/2/index.html",revision:"bd4e9279b32c6a5342a7461c41a67bfe"},{url:"archives/page/3/index.html",revision:"9110cced851c9af70f5556491b8dd272"},{url:"categories/anzhiyu/index.html",revision:"8c6571f804af55589d6293eb4bfad1c9"},{url:"categories/guancha/index.html",revision:"7336c88d193f451a5d7879a8f62b44e2"},{url:"categories/index.html",revision:"c5712a2fe70bd46f03f287c7a18e1a14"},{url:"categories/JAVA/index.html",revision:"8c4dabee064acbd859f31d97edf6a9af"},{url:"categories/jike/index.html",revision:"8983b6e65fa970a0ec839825140c0971"},{url:"categories/NER/index.html",revision:"0b5f35b922d60451cbc2a358c0a777a1"},{url:"categories/NER/page/2/index.html",revision:"9f60dd26c221ec7a8614f6ede245f01c"},{url:"categories/shuju/index.html",revision:"4276fc9bec3270ca99aa4d6d3a090258"},{url:"categories/大学生涯.html",revision:"b66091c2028c4e94daeba99379243535"},{url:"categories/技能点.html",revision:"f909f2fa189b71f2bbbff7e18e08815b"},{url:"categories/生活日常/index.html",revision:"6518ac95fa3b20a63414e37b6b4ac42b"},{url:"comments/index.html",revision:"55bd24641554478b565b371aceb72163"},{url:"css/index.css",revision:"88bbca9fe7b009b30cf25747e070dde6"},{url:"css/var.css",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"equipment/index.html",revision:"356a89ce331a9078c5d541755d603762"},{url:"essay/index.html",revision:"e157ff8fef4d6a7019fd9bd67373f066"},{url:"img/404.jpg",revision:"8190796a570d269ef04b777d93d44e6d"},{url:"img/512.png",revision:"701819a72025df4d8e2a111c1c8f2c72"},{url:"img/algolia.svg",revision:"88450dd56ea1a00ba772424b30b7d34d"},{url:"img/avatar.png",revision:"9fa96b8ff51493bd271dea1ce843e75d"},{url:"img/comment_bg.png",revision:"fe6bbe142eb7dc7b4f876ae4f5af97d0"},{url:"img/default_cover.jpg",revision:"8b35831759dc5f66710c2839422109d5"},{url:"img/friend_404.gif",revision:"d09ab53cb5bb15079ce8e3d90b157353"},{url:"img/loading.gif",revision:"9beba1aa0e43b4bdd9c71979ed5e096b"},{url:"img/siteicon/16.png",revision:"3de470acb5237bf16318d827443dd5f1"},{url:"img/siteicon/32.png",revision:"802aa4685b3652d5a1b6e5a6323cf3c0"},{url:"img/siteicon/apple-icon-180.png",revision:"ac045b7b6012d72ccbcffb07727c7b11"},{url:"img/siteicon/manifest-icon-192.maskable.png",revision:"87c1b5883834c2164e20e737bd5c2517"},{url:"img/siteicon/manifest-icon-512.maskable.png",revision:"85b846b5722c684339c8bb3e520bcc6a"},{url:"img/tu/img(1).png",revision:"19eea4c08a4b390faeacd72dc685c2d6"},{url:"img/tu/img(10).jpg",revision:"b1d8ef7c1cea939ab88747581c0666a3"},{url:"img/tu/img(11).jpg",revision:"3478a38d64b49b8c117e1d637b77daf5"},{url:"img/tu/img(12).jpg",revision:"4652d1af6994ddebf4b45c756485ff2a"},{url:"img/tu/img(13).jpg",revision:"348dc4416b1e802ddfd39c66c16a4ec7"},{url:"img/tu/img(14).jpg",revision:"8e9632757067e00c73df96fc1b44f4b7"},{url:"img/tu/img(15).jpg",revision:"1ba1439e517210f2c2779a541c7f615d"},{url:"img/tu/img(16).jpg",revision:"6481019761a4a3e0437de60f9e5b6217"},{url:"img/tu/img(17).jpg",revision:"f475cdc733c0bb2027a27c9f912a1e16"},{url:"img/tu/img(18).jpg",revision:"d3ac6719492477a2b872e0ad0aab57ec"},{url:"img/tu/img(19).jpg",revision:"360141c1a5585d7f3ef87b7bc73c85b9"},{url:"img/tu/img(2).jpg",revision:"4e4efabd10a10c02664d0be01d4bd82f"},{url:"img/tu/img(20).jpg",revision:"33401c9d43a01ff3a0468f91a75273ef"},{url:"img/tu/img(21).jpg",revision:"1e1d84b84632df87893a07e44fcca31e"},{url:"img/tu/img(22).jpg",revision:"ddb0db509ea2ca1595708bbf06fcfdfc"},{url:"img/tu/img(23).jpg",revision:"03c676e4ba9853d29939f89de3e50f5b"},{url:"img/tu/img(24).jpg",revision:"3599ad38592a93dfc645490b74823635"},{url:"img/tu/img(25).jpg",revision:"094db3ff6ddbac07abbb27ba7119a9ff"},{url:"img/tu/img(26).jpg",revision:"141e6e889f1b1c124560ad255718a3b1"},{url:"img/tu/img(27).jpg",revision:"94f75a29a718c5216727443b8dc67394"},{url:"img/tu/img(28).jpg",revision:"234bbb59ff4e306276e75b9bb6fb7181"},{url:"img/tu/img(29).jpg",revision:"3f2b5de0fbc142cd709f964de05b5fa7"},{url:"img/tu/img(3).jpg",revision:"0b17b3434e8c31980cde030ac7ef4ac2"},{url:"img/tu/img(30).jpg",revision:"d697cd857a4d97a38312bb8601f0c91e"},{url:"img/tu/img(31).jpg",revision:"411878f5b92333250b41fbb341372cc5"},{url:"img/tu/img(32).jpg",revision:"e22623c573752d09534d62b480d36e7e"},{url:"img/tu/img(33).jpg",revision:"ec926135df5518da1b800fa96cfc66e6"},{url:"img/tu/img(34).jpg",revision:"2f973c95229adad26fe84cf9fd3d6d1c"},{url:"img/tu/img(35).jpg",revision:"106e9857db8d0ef0f9b5419488e90835"},{url:"img/tu/img(36).jpg",revision:"5b2d9bbddce5892b76182a233c9bd30a"},{url:"img/tu/img(37).jpg",revision:"c5988b57ddcef508b417ca4940ca0eb1"},{url:"img/tu/img(38).jpg",revision:"b4278a7acf3eac4fa3c323afee607cd4"},{url:"img/tu/img(39).jpg",revision:"c69958282cc13e14dfc07383109a90df"},{url:"img/tu/img(4).jpg",revision:"5bb0866c7f0866ffa3842bc4366aa446"},{url:"img/tu/img(40).jpg",revision:"6d5c1b1a537f3a596245c0895e5cb160"},{url:"img/tu/img(41).jpg",revision:"b3f30ca759519e5cfd53df897425f6ea"},{url:"img/tu/img(42).jpg",revision:"ab058c192b0155b0ed1df1554a5efbe1"},{url:"img/tu/img(43).jpg",revision:"d9661a1f22d8222295256193851d7edf"},{url:"img/tu/img(44).jpg",revision:"1c75dddfaf580dacdbef44fa9e423264"},{url:"img/tu/img(45).jpg",revision:"5af28b78d256677c3ddf04d36d52c3eb"},{url:"img/tu/img(46).jpg",revision:"eedd214bdc8d3e359a50ef08379591a9"},{url:"img/tu/img(47).jpg",revision:"c8f446b0991f7ee0463834b8a26c2158"},{url:"img/tu/img(48).jpg",revision:"35557dd7cb95dc7d40e2979de170816c"},{url:"img/tu/img(49).jpg",revision:"f27a82f2c98c4bab28da17ae9f6f1e12"},{url:"img/tu/img(5).jpg",revision:"ba979de1e7635dcb419b24bc51718748"},{url:"img/tu/img(50).jpg",revision:"feb0b1f04e57a143b9d42ce13be6c3c7"},{url:"img/tu/img(51).jpg",revision:"c000131b60c209e05ad93e41acde6fda"},{url:"img/tu/img(52).jpg",revision:"33634c4c0fe95f9e281f3e823089538d"},{url:"img/tu/img(53).jpg",revision:"384da492a95a7b826495b86e034ecf5b"},{url:"img/tu/img(54).jpg",revision:"7e5ca2a1b7d0b2daff9434e9d85a09b2"},{url:"img/tu/img(55).jpg",revision:"4f53bc827671b9c6c7010d926dec8ccc"},{url:"img/tu/img(56).jpg",revision:"3eac38a7e8fc694ecceca80fcd08ec02"},{url:"img/tu/img(57).jpg",revision:"3de600163af60e4d756c2f8e6c3ac130"},{url:"img/tu/img(58).jpg",revision:"3eb3911772c8ec661f85cdff4b5c9a14"},{url:"img/tu/img(59).jpg",revision:"7b11ab313a872642e8e18a5b99010804"},{url:"img/tu/img(6).jpg",revision:"98956cf029305417783cfd1dac99a848"},{url:"img/tu/img(60).jpg",revision:"53c3e2a30df2fbefe5aece9285cdac63"},{url:"img/tu/img(61).jpg",revision:"5b08ecbcb7d3108f37d3beac98ace367"},{url:"img/tu/img(62).jpg",revision:"f5d4e89d05c91f5c0038c6dc5ff8c08f"},{url:"img/tu/img(63).jpg",revision:"ac35b7491af8ea966f1703dcdd085a3d"},{url:"img/tu/img(64).jpg",revision:"bababde3819e6c81743fe75be777b732"},{url:"img/tu/img(65).jpg",revision:"8cb6493bb1fb62b378b6e2c82b6af70e"},{url:"img/tu/img(66).jpg",revision:"269d4fb5d87d69d8a71f37fc56631496"},{url:"img/tu/img(67).jpg",revision:"e6fa4f1ef5ec2b01803b64c559e6583f"},{url:"img/tu/img(68).jpg",revision:"85da43e3223275bfaf4f0a393b57cb62"},{url:"img/tu/img(69).jpg",revision:"6cf29c87ce443f3bbb763ac77e607e75"},{url:"img/tu/img(7).jpg",revision:"370fb7814aad5795289071ec62c8d013"},{url:"img/tu/img(70).jpg",revision:"2bc9cab4de59e549fc217c45e064ef32"},{url:"img/tu/img(71).jpg",revision:"d0d2825b1d0fe4d34e7bed2d5a38e010"},{url:"img/tu/img(72).jpg",revision:"cb50e9cc9bdaf5806f74ca1c90c99c27"},{url:"img/tu/img(73).jpg",revision:"55fcb5d63566819279dfca04d5ca7e96"},{url:"img/tu/img(74).jpg",revision:"32c55223b12fc12859d9cd09d564162e"},{url:"img/tu/img(75).jpg",revision:"d5081c7996f49baeb827bf33e6fe08e8"},{url:"img/tu/img(76).jpg",revision:"d6bcc3406bc7fc7006d5a963fc3eeac2"},{url:"img/tu/img(77).jpg",revision:"ab15eab36eb8624b68d09a735a48f873"},{url:"img/tu/img(78).jpg",revision:"dd37bdea678f2e9482d9e0bd0e2c470e"},{url:"img/tu/img(79).jpg",revision:"3ea14a1d142b57ed28ae9f3a21fccab4"},{url:"img/tu/img(8).jpg",revision:"ce5d77094824bb09ce4398f58ea008d1"},{url:"img/tu/img(80).jpg",revision:"0e14d6ff3a4a52cdfbe68c432025fb18"},{url:"img/tu/img(81).jpg",revision:"4a82113ed289970627cd50fe39971322"},{url:"img/tu/img(82).jpg",revision:"c4984c7ff4ce983409502b37a14f1b9e"},{url:"img/tu/img(83).jpg",revision:"7a8fd82701dc27df65690dc5a8134786"},{url:"img/tu/img(84).jpg",revision:"d03ee2b0863b8fdfecbb7f2def1e9ee2"},{url:"img/tu/img(85).jpg",revision:"c60f5cb735de63a0cd30580eea3461ac"},{url:"img/tu/img(86).jpg",revision:"96e97cb70c25d1194b12686701b80184"},{url:"img/tu/img(88).jpg",revision:"51423cec08d245dd085b51d89aaa4b39"},{url:"img/tu/img(89).jpg",revision:"582e96b2f55eef25925122ef33602586"},{url:"img/tu/img(9).jpg",revision:"4d1993d4b34d7a9ece2bc539b38004f9"},{url:"img/tu/img(90).jpg",revision:"61806d90cf82d8c5c6618055883d71a1"},{url:"img/tu/img(91).jpg",revision:"dfb4ba6c29e617d0eb4af2ab9179f29a"},{url:"img/tu/img(92).jpg",revision:"6ca6cb086bbe64683768fdc4b67a5c6c"},{url:"img/tu/img(93).jpg",revision:"dc242d3636e986263a7b16d3d7d3f695"},{url:"img/tu/img(94).jpg",revision:"5b68b286e5c6c30125ded2b2faea0519"},{url:"img/tu/img(95).jpg",revision:"1f27acf2774eeb0cadef277c48eb6a20"},{url:"img/tu/img(96).jpg",revision:"bd8e40548023550f47681bd336bc5d6d"},{url:"img/tu/img(97).jpg",revision:"6db4c00a0b04d6b46a59bdbe751f3679"},{url:"img/tu/img(98).jpg",revision:"4eba9bee0d2743150b5c328d7fec71fa"},{url:"index.html",revision:"fc7aa795a88c4315f2f2f723f97e6688"},{url:"js/anzhiyu/ai_abstract.js",revision:"e4baa11685a6c14d4130b5b74d9222dc"},{url:"js/anzhiyu/comment_barrage.js",revision:"c5ca32eab1b5db6744df49cffaefa3a6"},{url:"js/anzhiyu/people.js",revision:"b946db8294a26b0b91e93dca5abda935"},{url:"js/anzhiyu/random_friends_post.js",revision:"30e5b8070503360d29e26e1b6db29efd"},{url:"js/anzhiyu/right_click_menu.js",revision:"586c1eecf6617180a50d419def5fd4c0"},{url:"js/main.js",revision:"0ca6e958debf5d18e10ead8c0c00191c"},{url:"js/search/algolia.js",revision:"3ce06f0458bccd45a20ae797cccb6561"},{url:"js/search/local-search.js",revision:"0f5dddc0c88389610bae38a044ee7a8a"},{url:"js/tw_cn.js",revision:"80822f672b15a8105128e305e9acbed4"},{url:"js/utils.js",revision:"b2bbde9d96fc4ded6c7a163038818ae5"},{url:"link/index.html",revision:"4e263056717ef9cd597f126451a8e279"},{url:"music/index.html",revision:"f92009f2e7b521b8f441c073a87f20a6"},{url:"page/2/index.html",revision:"9c4bf7c80abba50a7ac5b499765e91ca"},{url:"page/3/index.html",revision:"c9a805c630808b9695e74476c5411bdd"},{url:"source/imgs/${fiilename}/算法通关数组.png",revision:"7afcc6a54bccc77ff1982dfd17356314"},{url:"tags/anzhiyu/index.html",revision:"0cdf0129701c3f2785909dfefe5e6bd0"},{url:"tags/index.html",revision:"e3b28672148dffba2de783c3f61400ac"},{url:"tags/Javaee/index.html",revision:"8d76503ea5ca58bd1c4d1ab93d07e6bd"},{url:"tags/NER/index.html",revision:"5ee7e289e9f04e3ddbfc396d526bc534"},{url:"tags/NER/page/2/index.html",revision:"df6d1f5439e31f408bb4870e0fef19ab"},{url:"tags/pytorch/index.html",revision:"b4d1da4ca17f47c44b6d295963aa8fe1"},{url:"tags/STL/index.html",revision:"2b7a7256a81636c663d87d0851febea7"},{url:"tags/数组/index.html",revision:"736af22e289b24c7f4242fdc39860436"},{url:"tags/观猹/index.html",revision:"b7c6768ad52f36bff9ac2d5dca9f9ecc"},{url:"tags/计科/index.html",revision:"ae9160cc82160adde917d86b00fcce82"}],{})}));
//# sourceMappingURL=service-worker.js.map
