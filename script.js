const textEl = document.querySelector("#data");
const sizeEl = document.querySelector("#size");
const logoEl = document.querySelector("#logo"); 
const clearEl = document.querySelector("#clear");
const marginEl = document.querySelector("#margin");
const dotModeEl = document.querySelector("#dot");
const dotColorEl1 = document.querySelector("#dot-color-1");
const dotColorEl2 = document.querySelector("#dot-color-2");
const bgEl = document.querySelector("#bg-col");
const dlEl = document.querySelector("#btn-dl");
const fileNameEl = document.querySelector("#file-name");

let qrOpt = {
    width: 100,
    height: 100,
    data: "https://www.google.it/",
    image: "https://kolumbus-media.s3.eu-west-1.amazonaws.com/next-conti/common/img/auto-small.png",
    dotsOptions: {
        color: "#4267b2",
        type: "rounded",
        gradient: {
            type: "linear",
            colorStops: [
                {
                    offset: 0,
                    color: "#000"
                },
                {
                    offset: 1,
                    color: "#000"
                }
            ]
        }
    },
    backgroundOptions: {
        color: "#fff",
    }
}

render();

sizeEl.addEventListener('input', e => {
    qrOpt.width = e.target.value * 10;
    qrOpt.height = e.target.value * 10;
    render();
});
textEl.addEventListener('keyup', e => {
    console.log(e.target.value);
    qrOpt.data = e.target.value;
    render();
});
marginEl.addEventListener('input', e => {
    qrOpt.imageOptions = { margin: e.target.value }
    render();
});

dotModeEl.addEventListener('change', e => {
    qrOpt.dotsOptions.type = e.target.value;
    render();
});

dotColorEl1.addEventListener('input', e => {
    qrOpt.dotsOptions.gradient.colorStops[0].color = e.target.value;
    render();
});

dotColorEl2.addEventListener('input', e => {
    qrOpt.dotsOptions.gradient.colorStops[1].color = e.target.value;
    render();
});

bgEl.addEventListener('input', e => {
    qrOpt.backgroundOptions.color = e.target.value;
    render()
})

fileNameEl.addEventListener('keyup', e => {
    const val = e.target.value;
    if(val && val.length === 0){
        dlEl.style.opacity = .4
        dlEl.disabled = true
    }else{
        dlEl.style.opacity = 1;
        dlEl.disabled = false
    }
})

var qrCode;

function render(){
    qrCode = new QRCodeStyling(qrOpt);
    let canvasEl = document.querySelector("#canvas");
    canvas.innerHTML = "";
    qrCode.append(canvasEl);
    canvasEl.nextElementSibling.innerHTML = `${qrOpt.width}px x ${qrOpt.height}px`;
}

function browse(){
    logoEl.click()
}

logoEl.addEventListener('change', e => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
        qrOpt.image = reader.result;
        render()
    }
    reader.readAsDataURL(file);
});

clearEl.addEventListener('click', e => {
    delete qrOpt.image;
    render();
})

dlEl.addEventListener('click', e => {
    const message = document.querySelector("#message");
    message.innerHTML = '';
    if(!fileNameEl || !fileNameEl.value || fileNameEl.value.length === 0){
        message.innerHTML = 'Inserisci il filename';
        return;
    }
    qrCode.download({name: fileNameEl.value, extension: 'svg'});
})