var loadingDialog
var loadingStack = []

setTimeout(hideLoading, 1000)

$('#formFileMultiple').change(function () {
    showLoading()
    $("#ImageSelected").empty()

    let input = document.getElementById("formFileMultiple");
    let files = input.files;

    if (files.length > 0) {
        $('#input-section').show()
        $('#drag-section').hide()
        $('#image-section').show()

    }

    for (var i = 0; i != files.length; i++) {
        var x = (window.URL || window.webkitURL).createObjectURL(files[i]);
        $(".carousel-slide").append('<img src="' + x + '" name="' + files[i].name.split('.')[0] + '"/>');
        $(".carousel-dots").append('<li></li>');

        $("#ImageSelected").append('<img src="' + x + '" name="' + files[i].name.split('.')[0] + '" class="image-selected"/>');
    }

    const carouselFrames = Array.from(document.querySelectorAll('.carousel-frame'));
    carouselFrames.forEach(frame => makeCarousel(frame));

    setTimeout(hideLoading, 1000)
})

$('#btn-download').click(function () {

    setTimeout(showLoading, 0)
    let width = parseInt($('#width').val())
    let height = parseInt($('#heigth').val())
    let background = $('#color').val()
    let name = $('#name').val()
    let tail = parseInt($('input[type=radio][name=file-type-option]:checked').val())
    let typeName = parseInt($('input[type=radio][name=name-save-option]:checked').val())
    let img = document.querySelectorAll('.image-selected');

    let errors = []

    if (!width) {
        errors.push('<strong>Width</strong> not be empty')
    }

    if (!height) {
        errors.push('<strong>Height</strong> not be empty')
    }

    if (typeName == 2 && !name.length) {
        errors.push('<strong>File Name</strong> not be empty')
    }

    if (errors.length) {
        errors.forEach(function (item) {
            var notify = $.notify(item, {
                type: 'danger',
                allow_dismiss: true,
            });
        });
        setTimeout(hideLoading, 500)
        return
    }

    $(".carousel-slide").empty()
    $(".carousel-dots").empty()

    var arr = resizeImage(img, width, height, background, tail)
    for (var i = 0; i < arr.length; i++) {

        $(".carousel-slide").append('<img src="' + arr[i] + '" name="' + img[i].name +'"/>');
        $(".carousel-dots").append('<li></li>');

        if (typeName == 1) {
            saveBase64AsFile(arr[i].split(';base64,')[1], img[i].name + (tail == 1 ? '.jpg' : '.png'))
        }
        else saveBase64AsFile(arr[i].split(';base64,')[1], name + (arr.length > 1 ? '_' + (i + 1) : '') + (tail == 1 ? '.jpg' : '.png'))
    }

    const carouselFrames = Array.from(document.querySelectorAll('.carousel-frame'));
    carouselFrames.forEach(frame => makeCarousel(frame));

    setTimeout(hideLoading, 1000)
})

function saveBase64AsFile(base64, fileName) {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.setAttribute("type", "hidden");
    link.href = "data:text/plain;base64," + base64;
    link.download = fileName;
    link.click();
    document.body.removeChild(link);
}

function resizeImage(images, width, height, backgroundColor, tail) {
    let base64Array = []
    for (var i = 0; i < images.length; i++) {
        var c = document.createElement("canvas");
        var ctx = c.getContext("2d");
        ctx.canvas.width = width
        ctx.canvas.height = height
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);

        if (images[i].naturalWidth > images[i].naturalHeight) {
            let ratio = images[i].naturalHeight / images[i].naturalWidth
            ctx.drawImage(images[i], width * 0.025, height * (1 - ratio * 0.95) / 2, width * 0.95, height * ratio * 0.95);
        }
        else {
            let ratio = images[i].naturalWidth / images[i].naturalHeight
            ctx.drawImage(images[i], width * (1 - ratio * 0.95) / 2, height * 0.025, width * ratio * 0.95, height * 0.95);
        }
        var base64 = c.toDataURL(tail == 1 ? "image/jpeg" : "image/png");
        base64Array.push(base64)
    }
    return base64Array
}

$(document).on('change', '.file-input', function () {
    var filesCount = $(this)[0].files.length;

    var textbox = $(this).prev();

    if (filesCount === 1) {
        var fileName = $(this).val().split('\\').pop();
        textbox.text(fileName);
    } else {
        textbox.text(filesCount + ' files selected');
    }
});

function showLoading() {
    $('#loader-body').removeClass("hide-loader");
}

function hideLoading() {
    $('#loader-body').addClass("hide-loader");
}

$('#color').change(function () {
    var input = document.getElementById('text-color')
    input.style.color = this.value
    input.innerText = this.value
})

$('input[type=radio][name=name-save-option]').on('change', function () {
    var input = document.getElementById('input-custom-name')
    if (parseInt(this.value) == 2) {
        input.style.visibility = "inherit"
    }
    else input.style.visibility = "hidden"
});

