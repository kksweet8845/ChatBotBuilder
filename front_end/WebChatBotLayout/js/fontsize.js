var size;
size = 16;
$(function() {
    var postBody = ".text", // 文章區塊
        minSize = 16, // 最小文字 px 值
        maxSize = 60, // 最大文字 px 值
        addSize = 4; // 每次點擊按鈕增加的尺寸 px 值
    $(postBody).css("font-size", (localStorage.postFontSize || minSize) + "px");
    $("#enlarge_font_size").click(function() {
        size += addSize;
        size = size > maxSize ? minSize : size;
        localStorage.postFontSize = size;
        $(postBody).css("font-size", size + "px");
    });
});

$(function() {
    var postBody = ".text", // 文章區塊
        minSize = 16, // 最小文字 px 值
        maxSize = 60, // 最大文字 px 值
        minusSize = 4; // 每次點擊按鈕減少的尺寸 px 值
    $(postBody).css("font-size", (localStorage.postFontSize || minSize) + "px");
    $("#decrease_font_size").click(function() {
        size -= minusSize;
        size = size < minSize ? maxSize : size;
        localStorage.postFontSize = size;
        $(postBody).css("font-size", size + "px");
    });
});
    
