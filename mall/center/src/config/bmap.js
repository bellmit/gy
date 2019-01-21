export default {
    init: function () {
        const ak = 'BHB2NGRNNsQhnKoHciLgBU14PNygoaMZ';
        const url = 'http://api.map.baidu.com/getscript?v=2.0' + '&ak=' + ak;
        return new Promise((resolve, reject) => {
            window.onload = function () {
                resolve(window.BMap);
            };
            let scriptNode = document.createElement('script');
            scriptNode.setAttribute('src', url);
            scriptNode.onerror = reject;
            document.body.appendChild(scriptNode);
        });
    }
};
