const marked = require('marked')
const fs = require('fs')
const hljs = require('highlight.js')

if (fs.existsSync("html")) fs.rmSync("html", {
    recursive: true
})

fs.mkdirSync("html")

const $$ = label => s => '<' + label + '>\n' + s + '</' + label + '>\n'

const charset = '<meta charset="utf-8"/>\n'
const viewpoint = '<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0">\n'
const title = $$('title')('十分钟魔法练习')

const hljscss = '<link href="https://cdn.bootcdn.net/ajax/libs/highlight.js/10.3.2/styles/a11y-light.min.css" rel="stylesheet">'
const materialize = '<link href="https://cdn.bootcdn.net/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css" rel="stylesheet">'

const sbody = 'body { max-width: 650px; margin: auto; width: 90%; margin-top: 10%; margin-bottom: 10%; color: #0B0E26; background: #FAFAFC; line-height: 2em; }\n'
const sfont = 'body { font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif; }\n'
const sh1 = 'h1 { font-size: 2.5em; color: #EF96AB; line-height: 1.5em; }\n'
const sh2 = 'h2 { margin-top: 2em; line-height: 1.5em; }\n'
const scenter = 'h1, h2, h3 { text-align: center; }\n'
const squote = 'blockquote { color: gray; margin: 0; padding: 1 1 1 20; border-left: 5px solid #EF96AB; }\n'
const scode = 'code, pre { font-family: "JetBrains Mono","等距更纱黑体 SC","Fira Code",Menlo,Monaco,source-code-pro,Courier New,Consolas,monospace; background: #FCF6FC; border-radius: 3px; padding-inline: 0.3rem; }\n'
const spre = 'pre { overflow-x: auto; padding: 1rem; }\n'
const sprecode = 'pre>code { padding-inline: 0; }\n'
const sscorll = '::-webkit-scrollbar, .element::-webkit-scrollbar, .element { opacity: 0.5; }\n'
const sa = 'a { color: #02AEF1; text-decoration: none; }\n'

const sdarkbody = '@media (prefers-color-scheme: dark) { body { color: #D8D8D6; background: #0E0E10; } }\n'
const sdarkpre = '@media (prefers-color-scheme: dark) { pre, code { color: #D8D8D6; background: #0E0F1F; } }\n'

const hlkeyword = '.hljs-keyword { color: #F288AF; }\n'
const hlconmment = '.hljs-comment { color: #929CA6; }\n'
const hlstring = '.hljs-string { color: #0594A6; }\n'
const hltitle = '.hljs-title { color: #4581D9; }\n'
const hltype = '.hljs-type, .hljs-built_in { color: #fca311; }\n'

const hlcss = hlkeyword + hlconmment + hlstring + hltitle + hltype
const style = $$('style')(sbody + sfont + sh1 + sh2 + squote + scode + spre + sprecode + sa + sdarkbody + sdarkpre + hlcss)

const head = $$('head')(charset + viewpoint + title + style)

const star = '<a href="https://github.com/niltok/magic-in-ten-mins">⭐Star me on GitHub⭐</a>'
const home = '<a href="https://magic.huohuo.moe">🏠Homepage🏠</a>'

const gen = s => {
    return $$('html')(head + $$('body')($$('p')(home + ' | ' + star) +
        marked(s, {
            highlight: (code, lang) => {
                if (typeof lang == 'undefined' || lang == '')
                    return hljs.highlightAuto(code).value
                else if (lang == 'nohighlight')
                    return code
                else return hljs.highlight(code, { language: lang }).value
            }
        })))
}

fs.readdirSync("doc").forEach(f => {
    if (f.endsWith(".md")) {
        const content = fs.readFileSync("doc/" + f).toString()
        fs.writeFileSync("html/" + f.slice(0, f.length - 3) + ".html", gen(content))
    }
})

const index = fs.readFileSync('readme.md').toString()
fs.writeFileSync('index.html', gen(index))