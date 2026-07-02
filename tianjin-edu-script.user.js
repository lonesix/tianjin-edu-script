// ==UserScript==
// @name         天津市专业技术人员继续教育网公需课考试题目提取工具
// @namespace    http://tampermonkey.net/
// @homepage	 https://github.com/lonesix/tianjin-edu-script
// @version      0.0.1
// @description  一键提取天津专技继续教育公需课考试题号、题干、单选/多选选项、判断题，一键复制到剪贴板
// @author       Lonesix
// @match        https://gp.chinahrt.com/*
// @license      MIT
// @grant        GM_setClipboard
// ==/UserScript==


(function() {
    'use strict';
    // 悬浮按钮
    const btn = document.createElement('button');
    btn.innerText = '提取全部题目复制';
    btn.style = `
        position:fixed;top:15px;right:15px;z-index:999999;
        padding:7px 14px;background:#0052cc;color:#fff;border:none;
        border-radius:4px;font-size:14px;cursor:pointer;
    `;
    document.body.appendChild(btn);

    btn.onclick = function() {
        let output = "";
        let count = 0;
        const questionBoxList = document.querySelectorAll(".option-div");
        questionBoxList.forEach(item => {
            count++;
            // 题号
            const numDom = item.querySelector("i.fl.mr10.active");
            const qNum = numDom.innerText.trim();
            // 题干
            const titleDom = item.querySelector("h2.f14.fl");
            const title = titleDom.innerText.trim();
            // 选项（单选+多选统一匹配）
            let optsText = "";
            const allOpts = item.querySelectorAll(".el-radio__label, .el-checkbox__label");
            allOpts.forEach(opt => {
                optsText += opt.innerText.trim() + "\n";
            });
            // 拼接文本
            output += `题目序号：${qNum}
题目内容：${title}
${optsText}
————————————————————
`;
        });
        output+=`以上所有题目均只给出答案`;
        GM_setClipboard(output);
        alert(`成功提取${count}道题目，已复制到剪贴板，直接粘贴记事本！`);
        console.log(output);
    }
})();
