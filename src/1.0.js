(function(window, document, navigator){

  if (document.getElementById('sawpf')) return;

  // ---------------------------------------------------------------------------------------------------

  // based on jquery's browser detection
  var userAgent = navigator.userAgent.toLowerCase();
  var BrowserDetect = {
    version: parseFloat((userAgent.match(/.+(?:firefox|ie)[\/: ]([\d.]+)/) || [0, 0])[1]),
    msie: (/msie/).test(userAgent) && !(/opera/).test(userAgent),
    firefox: (/firefox/).test(userAgent)||((/mozilla/).test(userAgent) && !(/(compatible|webkit)/).test(userAgent))
  };
  var isFirefox = (BrowserDetect.firefox);
  var isIE = (BrowserDetect.msie);

  // http://blog.orite.com.au/web_development/2009-06-30/jquery-ie-detection-issue-workaround/
  if (isIE && BrowserDetect.version == 6 && (/msie 8/.test(userAgent))) BrowserDetect.version = 8;

  // http://stackoverflow.com/questions/1328963/detect-ie8-compatibility-mode
  // http://social.msdn.microsoft.com/Forums/en-US/netfxjscript/thread/ae715fd2-1ddd-46f7-8c26-9aed6b2103f1/
  if (isIE && BrowserDetect.version < 9 && document.documentMode < 9) {
      var trident = parseInt((userAgent.match(/.+trident\/(\d+)\..*/) || [0,0])[1], 10);
      BrowserDetect.version = trident < 5 ? 8 : 9;
  }
  
  // ---------------------------------------------------------------------------------------------------

  if (!(isFirefox || isIE)) return;
  if (isFirefox && BrowserDetect.version >= 17) return;
  if (isIE && BrowserDetect.version >= 9) return;

  // ---------------------------------------------------------------------------------------------------
  
  // ---------------------------------------------------------------------------------------------------

  // emile.js (c) 2009 Thomas Fuchs
  // Licensed under the terms of the MIT license.
  (function(emile, container){
    var parseEl = document.createElement('div'),
        props = ['height']; // removidas as outras propriedades do script original

    function interpolate(source,target,pos){
      return (source+(target-source)*pos).toFixed(3);
    };

    function parse(prop){
      return { v: parseFloat(prop), f: interpolate, u: prop.replace(/^[\-\d\.]+/,'') };
    };

    function normalize(style){
      var css, rules = {}, i = props.length, v;
      parseEl.innerHTML = '<div style="'+style+'"></div>';
      css = parseEl.childNodes[0].style;
      while(i--) {
        v = css[props[i]];
        if(v) rules[props[i]] = parse(v);
      };
      return rules;
    };

    container[emile] = function(el, style, opts, after){
      el = typeof el == 'string' ? document.getElementById(el) : el;
      opts = opts || {};
      var target = normalize(style), comp = el.currentStyle ? el.currentStyle : getComputedStyle(el, null),
        prop, current = {}, start = +new Date, dur = opts.duration||200, finish = start+dur, interval,
        easing = opts.easing || function(pos){ return (-Math.cos(pos*Math.PI)/2) + 0.5; };
      for(prop in target) current[prop] = parse(comp[prop]);
      interval = setInterval(function(){
        var time = +new Date, pos = time>finish ? 1 : (time-start)/dur;
        for(prop in target)
          el.style[prop] = target[prop].f(current[prop].v,target[prop].v,easing(pos)) + target[prop].u;
        if(time>finish) { clearInterval(interval); opts.after && opts.after(); after && setTimeout(after,1); }
      },10);
    };
  })('emile', this);

  // ---------------------------------------------------------------------------------------------------

  var SPRITE_URL = (window['base_url'] || 'http://sawpf.com') + '/imgs/1.0.gif';
  var LOGOS_URL = (window['base_url'] || 'http://sawpf.com') + '/imgs/';

  var css = 
  // '#sawpf * {margin: 0; padding: 0}' +
  //   '#sawpf {text-align: center; height: 0; overflow: hidden; background: #ffffd6; border-width: 1px 0; border-color: #f0e4c3; border-style: solid; font-family: arial; position: relative; width: 100%}' +
  //   '#sawpf div {margin: 0 auto; width: 940px; padding: 9px 0}' +
  //   '#sawpf strong {color: #333; font-size: 14px}' +
  //   '#sawpf p {color: #666; float: left; font-size: 12px; line-height: 18px; margin: 2px 20px 0 0; text-align: left}' +
  //   '#sawpf ul {list-style: none}' +
  //   '#sawpf li {display: block; float: left; margin-right: 5px}' +
  //   '#sawpf a, #sawpf a span {background-image: url(' + SPRITE_URL + '); text-indent: -99em; display: block; cursor: pointer}' +
  //   '#sawpf a {outline: none; overflow: hidden}' +
  //   '#sawpf ul a, #sawpf ul a span {height: 40px; width: 150px}' +
  //   '#sawpf ul a:hover {background-position: 0 -40px}' +
  //   '#sawpf ul a:active {background-position:0 -80px}' +
  //   '#sawpf ul a:active span {margin-top: 1px}' +
  //   '#sawpf .sawpf-ie span {background-position: 0 -198px}' +
  //   '#sawpf .sawpf-ff span {background-position: 0 -120px}' +
  //   '#sawpf .sawpf-gc span {background-position: 0 -158px}' +
  //   '#sawpf #sawpf-close {background-position: 0 -240px; width: 15px; height: 15px; position: absolute; right:5px; top: 5px}' +
  //   '#sawpf #sawpf-close:hover {background-position: 0 -255px}' +
  //   '#sawpf #sawpf-close:active {background-position: 0 -270px}'

'body { background: #ffffd6; padding: 10px;}' +
'#sawpf {color: #111111; text-align: center; height: 0; font-family: "Lucida Grande", Tahoma, Verdana, Arial; position: relative; width: 100%}' +
'#sawpf strong {color: #333; font-weight: bold}' +

'.container {' +
  'width: 690px;' +
  'position: relative;' +
  'margin: 0 auto;' +
'}' +

'h1 {' +
  'font-size: 23px;' +
  'font-weight: normal;' +
'}' +

'h2 {' +
  'font-size: 15px;' +
  'font-weight: normal;' +
'}' +
 
 'h1, h2 { margin: 0; }' +
 '.sawpf-browser { padding: 56px 0 43px;}' +
 '.sawpf-browser h2 {margin-top: 5px;}' +
 '.sawpf-browser.ie { background-image: url(' + LOGOS_URL + 'ie.png)}' +
 '.sawpf-browser.ff { background-image: url(' + LOGOS_URL + 'ff.png)}' +
 '.sawpf-browser.ie, .sawpf-browser.ff { background-position: center; background-repeat: no-repeat; }' +

 '.download-chrome {' +
  'background-color: #fff;' +
  'border: 1px solid #000;' +
  'border-radius: 5px;' +
  '-webkit-border-radius: 5px;' +
  '-moz-border-radius: 5px;' +
  'background-image: url(' + LOGOS_URL + 'chrome.png);' +
  'background-position: 98% 14px;' +
  'background-repeat: no-repeat;' +
  'text-align: left;' +
  'padding: 15px;' +
  'margin: 36px 0;' +
 '}' +

 '.download-chrome a, .download-chrome-frame a {' +
    'color: #007FFF;' + 
    'margin-left: 12px;' +
    'font-weight: normal;' +
    'font-size: 15px;' +
    'text-decoration: none;' +
  '}' +

  '.download-chrome ul {' +
    'line-height: 23px;' +
    'font-size: 13px;' +
  '}' +

  '.download-chrome-frame {' +
  'background-color: #fff;' +
  'border: 1px solid #000;' +
  'border-radius: 5px;' +
  '-webkit-border-radius: 5px;' +
  '-moz-border-radius: 5px;' +
  'background-image: url(' + LOGOS_URL + 'chrome-frame.png);' +
  'background-position: 98% 37px;' +
  'background-repeat: no-repeat;' +
  'text-align: left;' +
  'padding: 15px;' +
  'margin: 20px 0;' +
 '}' +

 '.container > h1 {' +
  'font-size: 20px;' +
 '}' +

 'p { width: 421px; text-align: justify; font-size: 13px;}'

  ;

  var styleTag = document.createElement('style');
  styleTag.type = 'text/css';
  if(!window['ActiveXObject']) {
    styleTag.innerHTML = css;
  } else {
    styleTag.styleSheet.cssText = css;
  }
  document.getElementsByTagName('head')[0].appendChild(styleTag);

  var IE_BUTTON = '<a href="http://www.baixatudo.com.br/internet-explorer?utm_source=sawpf&utm_medium=banner&utm_campaign=Explorer" class="sawpf-ie" title="Internet Explorer"><span>Internet Explorer</span></a>';
  var FIREFOX_BUTTON = '<a href="http://www.baixatudo.com.br/mozilla-firefox?utm_source=sawpf&utm_medium=banner&utm_campaign=Firefox" class="sawpf-ff" title="Firefox"><span>Firefox</span></a>';
  var CHROME_BUTTON = '<a href="http://www.baixatudo.com.br/google-chrome?utm_source=sawpf&utm_medium=banner&utm_campaign=Chrome" class="sawpf-gc" title="Google Chrome"><span>Google Chrome</span></a>';

//  var html = '<div><p><strong>Seu ' +
//    ((isIE) ? "Internet Explorer" : "Firefox") +
//    ' está desatualizado.</strong><br/>Para utilizar o site, atualize-o, ou escolha outro navegador.</p>' +
//    '<ul><li>' +
//    CHROME_BUTTON + '</li><li>' + FIREFOX_BUTTON + '</li><li>' + IE_BUTTON +
//    '</li></ul>' +
//    // '<a href="#" id="sawpf-close" title="Fechar">fechar</a>' +
//    '</div>';
var browser_name = isIE ? "Internet Explorer" : "Firefox";
var aux_class = isIE ? "ie" : "ff";
var html = 
'<div class="container">' +
'  <div class="sawpf-browser '+ aux_class+'">' +
'    <h1>O Seu <strong>' + browser_name + '</strong> está desatualizado</h1>' +
'    <h2>Para utilizar o QMágico, atualize-o, ou escolha outro navegador</h2>' +
'  </div>' +

'  <div class="download-chrome">' +
'    <h1>O QMágico recomenda: <strong>Google Chrome</strong></h1>' +
'    <a href="https://www.google.com/intl/pt-BR/chrome/browser/">https://www.google.com/intl/pt-BR/chrome/browser/</a>' +
'    <ul>' +
'      <li>Fácil instalação;</li>' +
'      <li>Maior compatibilidade com sistemas operacionais;</li>' +
'      <li>Atualizações automáticas;</li>' +
'      <li>Maior segurança contra vírus e ataques;</li>' +
'      <li>Carregamento de páginas muito rápido;</li>' +
'      <li>Maior área de visualização de página.</li>' +
'    </ul>' +
'  </div>' +
'  <h1>Se você não quer (<strong>ou não pode</strong>) instalar um navegador diferente no seu computador...</h1>' +

'  <div class="download-chrome-frame">' +
'    <h1>Considere instalar o <strong>Chrome Frame</strong></h1>' +
'    <a href="http://www.google.com/chromeframe?prefersystemlevel=true">http://www.google.com/chromeframe?prefersystemlevel=true</a>' +
'     <p>O Chrome Frame é uma extensão do Internet Explorer que habilita novas tecnologias como HTML5 e CSS3 nas versões 6, 7, 8 e 9 do IE. Instalar o Chrome Frame é rápido, fácil, gratuito, e não necessita de privilégios de Administrador.</p>' +
'     <p>O Chrome Frame é completamente “invisível” e não muda em nada a maneira como você usa o Internet Explorer. Mas ele vai proporcionar a mesma velocidade e experiência de visualização disponível no Google Chrome, sem a necessidade de trocar de navegador.</p>' +
'  </div>' +

'</div>'

if (false){
  html += ' voce está no IE'
}

  var container = document.createElement('div');
  container.id = 'sawpf';
  container.innerHTML = html;

  document.body.innerHTML = ''
  document.body.insertBefore(container, document.body.firstChild);

  emile(container, 'height: 100%', {duration: 500});
  
})(this, document, navigator);

