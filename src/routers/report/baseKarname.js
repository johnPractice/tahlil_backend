const rout = require("express").Router();
const nodeHtmlToImage = require('node-html-to-image');
const auth = require('../../middelware/auth');
rout.get('/image-karname', auth, async(req, res) => {
    const { user, token } = req;
    console.log(token);
    const { examId } = req.query;
    if (!examId) return res.status(400).json({ "error": 'مقادیر الزامی را پر کنید' });
    nodeHtmlToImage({
            output: './public/karname/image.png',
            html: `
            <!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <style>
        * {
            border: 0;
            padding: 0;
            margin: 0;
            text-decoration: 0;
        }
        
        .container {
            width: 210mm;
            height: 297mm;
            border: 1px solid black;
            margin: 20px auto;
            border-radius: 10px;
            padding: 40px;
            direction: rtl;
            position: relative;
            overflow: hidden;
        }
        /* header */
        
        .header {
            width: 80%;
            margin: 5px auto;
            display: black;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: stretch;
            width: 80%;
            margin-bottom: 30px;
            border-bottom: 1px solid black;
            /* border: 1px solid black; */
        }
        
        .header .left {
            padding: 5px;
            width: 60%;
            /* background-color: green; */
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: space-between;
            font-size: 18px;
        }
        
        .header .left .items {
            margin: 2px 0;
        }
        
        .header .right {
            width: 15%;
            background-color: red;
        }
        
        .header .right img {
            height: 100%;
            width: 100%;
        }
        /* table */
        
        .table {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: stretch;
            width: 80%;
            margin: 0 auto;
        }
        
        .tr {
            display: flex;
            flex-direction: row;
            border: 1px solid black;
            border-right: 0;
            width: 100%;
            justify-content: space-between;
            align-items: stretch;
            margin: 0 auto;
        }
        
        .tr:nth-child(odd) {
            background-color: rgba(185, 185, 185, 0.471);
        }
        
        .tr.title {
            font-size: 20px;
            font-weight: bold;
        }
        
        .tr .tc {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid black;
            padding: 10px;
            text-align: center;
            flex: 23%;
            cursor: pointer;
        }
        
        .tc .question {
            display: none;
            position: absolute;
            top: -20px;
            left: -100%;
            /* right: -100px; */
            /* height: 80%; */
            background-color: rgba(92, 90, 90, 0.853);
            transition: .3s ease-in;
            color: white;
            border-radius: 10px;
            padding: 7px;
        }
        
        .tc:hover .question {
            display: block;
        }
        /* bottom */
        
        .bottom {
            direction: ltr;
            position: absolute;
            bottom: 0;
            height: 120px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            /* border-top: 1px solid black; */
            width: 100%;
            margin: 0 auto;
            left: 0;
            padding: 10px;
        }
        
        .bottom .sign,
        .bottom .logo {
            width: 30%;
            height: 60%;
        }
        
        .bottom .sign img,
        .bottom .logo img {
            width: 100%;
            height: 100%;
        }
    </style>

</head>

<body>
    <div class="container">
        <div class="header">
            <div class="right">
                <img src="https://www.eaclinic.co.uk/wp-content/uploads/2019/01/woman-face-eyes-1000x1000.jpg" alt="avatar">
            </div>
            <div class="left">
                <div class="items">
                    <span>name:</span>
                    <span> ${user.firstname+' '+user.lastname} </span>
                </div>
                <div class="items">
                    <span>class:</span>
                    <span>frontEnd</span>
                </div>
                <div class="items">
                    <span>exam:</span>
                    <span>css</span>
                </div>
                <div class="items">
                    <span>teacher:</span>
                    <span>AliSedaghi</span>
                </div>
                <div class="items">
                    <span>date:</span>
                    <span>1398/02/01</span>
                </div>
            </div>
        </div>
        <div class="table">
            <div class="tr title">
                <div class="tc">سوال</div>
                <div class="tc">نمره</div>
                <div class="tc">نمره اخذ شده</div>
                <div class="tc">توضیحات</div>
            </div>
            <div class="tr">
                <div class="tc">
                    سوال یک
                    <div class="question">
                        <i class="fa fa-info-circle"></i> کدام یک از گزینه های زیر صحیح است کدام یک از گزینه های زیر صحیح است کدام یک از گزینه های زیر صحیح است کدام یک از گزینه های زیر صحیح است
                    </div>
                </div>
                <div class="tc">3</div>
                <div class="tc">2</div>
                <div class="tc"> </div>
            </div>
            <div class="tr">
                <div class="tc">سوال یک
                    <div class="question">
                        <i class="fa fa-info-circle"></i> کدام یک از گزینه های زیر صحیح است کدام یک از گزینه های زیر صحیح است کدام یک از گزینه های زیر صحیح است کدام یک از گزینه های زیر صحیح است
                    </div>
                </div>
                <div class="tc">3</div>
                <div class="tc">2</div>
                <div class="tc"> </div>
            </div>
            <div class="tr">
                <div class="tc">سوال یک</div>
                <div class="tc">3</div>
                <div class="tc">2</div>
                <div class="tc"> </div>
            </div>
            <div class="tr">
                <div class="tc">
                    سوال یک

                    <div class="question">
                        <i class="fa fa-info-circle"></i> کدام یک از گزینه های زیر صحیح است کدام یک از گزینه های زیر صحیح است کدام یک از گزینه های زیر صحیح است کدام یک از گزینه های زیر صحیح است
                    </div>
                </div>
                <div class="tc">3</div>
                <div class="tc">2</div>
                <div class="tc"> asffsdf sdkflsda fhskdah sdhg sdsdgh sdhgsdmsdg hsdgsbdjg sdng sdjlkdshgkdf gksfd </div>
            </div>
        </div>

        <div class="bottom">
            <div class="sign">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Lily_Collins%27_Signature.png" alt="sign">
            </div>
            <div class="logo">
                <img src="https://www.traveller.com.au/content/dam/images/g/u/n/q/h/0/image.related.socialLead.620x349.gunpvd.png/1488330286332.png" alt="logo">
            </div>
        </div>
    </div>

</body>

</html>`
        })
        .then(() => {
            console.log('The image was created successfully!');
            return res.status(200).json({
                imgaUrl: '/public/karname/image.png',
                url: '/generateReport/?examId=' + examId + '&userId=' + user._id
            });
        })
        .catch(e => {
            return res.status(400).json(e);
        });
});

module.exports = rout;