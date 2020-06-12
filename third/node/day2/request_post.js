
    const url = 'https://h5.qzone.qq.com/proxy/domain/m.qzone.qq.com/cgi-bin/new/add_msgb?qzonetoken=cabea670bdce4dd02990842c8e36fa7e3852a5441c19aa29095aa91e8265aa92fd3febdb6089000197&g_tk=1859332125';
    const https = require('https');
    const querystring = require("querystring");


    const postData = querystring.stringify({
        content: '救命',
        hostUin: 1521716711,
        uin: 398842794,
        format: 'fs',
        inCharset: 'utf-8',
        outCharset:' utf-8',
        iNotice: 1,
        ref: 'qzone',
        json: 1,
        g_tk: 1859332125,
        qzreferrer:' https://user.qzone.qq.com/proxy/domain/qzs.qq.com/qzone/msgboard/msgbcanvas.html#page=1',
    })


    const options = {
        hostname:'h5.qzone.qq.com',
        port:443,
        path: '/proxy/domain/m.qzone.qq.com/cgi-bin/new/add_msgb?qzonetoken=cabea670bdce4dd02990842c8e36fa7e3852a5441c19aa29095aa91e8265aa92fd3febdb6089000197&g_tk=1859332125',
        method:'POST',
        headers:{
            'authority': 'h5.qzone.qq.com',
            'method': 'POST',
            'path':' /proxy/domain/m.qzone.qq.com/cgi-bin/new/add_msgb?qzonetoken=cabea670bdce4dd02990842c8e36fa7e3852a5441c19aa29095aa91e8265aa92fd3febdb6089000197&g_tk=1859332125',
            'scheme': 'https',
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'zh-CN,zh;q=0.9',
            'content-length': 266,
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'cookie': 'pgv_pvi=6541583360; RK=jWzFDpT3eP; ptcz=535e0fedfd721ed4585524d2ec775b314d2e33095eecc8e0aba12028dd3940c9; pgv_pvid=4638139410; _qpsvr_localtk=0.15940127733191645; pgv_si=s5152117760; pgv_info=ssid=s5418185804; __Q_w_s_hat_seed=1; __Q_w_s__QZN_TodoMsgCnt=1; Loading=Yes; QZ_FE_WEBP_SUPPORT=1; uin=o0398842794; skey=@wDRclSajv; p_uin=o0398842794; cpu_performance_v8=5; pt4_token=cJBUr0SUSBfA1oY0tyLq9nPRF3Cg8EgWUVU6kmcQmk0_; p_skey=gTuD4LVy-UKEMPeo9KnvOOPXQj*EbmCld36panThlQ8_; rv2=80F282D8FA3397588433EED6FA12FD98D7F37B7447A24AB17F; property20=380F1153253346A2D720A9B3EE4B7AEAFFD406E49A7A6DEDC8804B19807822A4858A043D6C21D7BD',
            'origin': 'https://user.qzone.qq.com',
            'referer':' https://user.qzone.qq.com/1521716711?source=aiostar',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
        }
    };


    const req = https.request(options, res => {
        console.log('状态码:', res.statusCode);
        console.log('请求头:', querystring.stringify(res.headers));

        res.setEncoding("utf8");  // 解析中文乱码

        // 监听数据传输
        res.on("data", d => {
            console.log("响应内容为 : " + d);
        })
        // 监听传输结束
        res.on("end", () => {
            console.log("响应完毕...")
        })
    });

    req.on("error", err => {
        console.log("请求失败 --- " + err);
    })

    // 将数据写入请求主体。
    req.write(postData)  // 非常重要
    req.end();  // 请求结束
