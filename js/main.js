const container = document.querySelector('.container')
const sizeEl = document.querySelector('.size')
let size = sizeEl.value
const color = document.querySelector('.color')
const resetBtn = document.querySelector('.btn')

let draw = false

function populate(size) {
  container.style.setProperty('--size', size)
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement('div')
    div.classList.add('pixel')

    div.addEventListener('mouseover', function(){
        if(!draw) return
        div.style.backgroundColor = color.value
    })
    div.addEventListener('mousedown', function(){
        div.style.backgroundColor = color.value
    })

    container.appendChild(div)
  }
}

window.addEventListener("mousedown", function(){
    draw = true
})
window.addEventListener("mouseup", function(){
    draw = false
})

function reset(){
    container.innerHTML = ''
    populate(size)
}

resetBtn.addEventListener('click', reset)

sizeEl.addEventListener('keyup', function(){
    size = sizeEl.value
    reset()
})

populate(size)


document.querySelector(".dwld-btn").addEventListener("mousedown",savendownloadimg);

function savendownloadimg(){
    html2canvas(document.querySelector('.container')).then(function(canvas) {
        // Generate the base64 representation of the canvas
        var base64image = canvas.toDataURL("image/png");
    
        // Split the base64 string in data and contentType
        var block = base64image.split(";");
        // Get the content type
        var mimeType = block[0].split(":")[1];// In this case "image/png"
        // get the real base64 content of the file
        var realData = block[1].split(",")[1];// For example:  iVBORw0KGgouqw23....
    
        // Convert b64 to blob and store it into a variable (with real base64 as value)
        var canvasBlob = b64toBlob(realData, mimeType);
    
        // Generate file download
        window.saveAs(canvasBlob, "NFT_screenshot.png");
    });
}